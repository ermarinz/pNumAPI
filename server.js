const express = require("express");
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const bodyParser = require('body-parser');
const app = express();
const textParser = bodyParser.text();

const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Used to avoid processing duplicate phone numbers.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// Used to find valid phone numbers within inputText.
function findNumbers(inputText) {
    let foundNumbers = [];
    let possibleNumbers = inputText.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g);
    if (possibleNumbers) {
        for (let i = 0; i < possibleNumbers.length; i++) 
            possibleNumbers[i] = possibleNumbers[i].replace(/\D/g, ""); // Removes formatting from possible numbers
        possibleNumbers = possibleNumbers.filter( onlyUnique );         // Removes duplicates
        for (let i = 0; i < possibleNumbers.length; i++) {
            const number = phoneUtil.parseAndKeepRawInput(possibleNumbers[i], 'US');    // Parse to libphonenumber
            if (phoneUtil.isValidNumber(number))
                foundNumbers.push(phoneUtil.formatInOriginalFormat(number, 'US'));      // Possible number is a valid phone number
        }
    }
    return foundNumbers;
}

// GET route handler for parsing text by URL.
app.get("/api/phonenumbers/parse/text/:phoneString", (req, res) => {
    res.json(findNumbers(req.params.phoneString));
});

// POST route handler for parsing input by text file.
app.post("/api/phonenumbers/parse/:file", textParser, (req, res) => {
    if (!req.body) 
        return res.sendStatus(400).send("Error reading text file")
    const decodedText = Buffer.from(req.body, 'base64').toString("ascii");    //decode base64 text
    res.json(findNumbers(decodedText));
});

// Send 404 response code for undefined routes.
app.use ((req, res) => {
    res.status(404).send("Page Not Found");
});

// Start server.
app.listen(HTTP_PORT, onHttpStart);