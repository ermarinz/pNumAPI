const express = require("express");
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Helper function used to avoid processing duplicate phone numbers.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// GET route handler for parsing text by URL.
app.get("/api/phonenumbers/parse/text/:phoneString", (req, res) => {
    const input = req.params.phoneString;
    let possibleNumbers = input.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g);
    let foundNumbers = [];
    if (possibleNumbers) {
        for (let i = 0; i < possibleNumbers.length; i++) 
            possibleNumbers[i] = possibleNumbers[i].replace(/\D/g, ""); // Removes formatting from possible numbers
        possibleNumbers = possibleNumbers.filter( onlyUnique );         // Removes duplicates
        for (let i = 0; i < possibleNumbers.length; i++) {
            const number = phoneUtil.parseAndKeepRawInput(possibleNumbers[i], 'US');
            if (phoneUtil.isValidNumber(number))
                foundNumbers.push(phoneUtil.formatInOriginalFormat(number, 'US'));    // Possible number is a valid phone number
        }
    }
    res.json(foundNumbers);
});

// TODO: POST route handler for parsing input by text file.

// Send 404 response code for undefined routes.
app.use ((req, res) => {
    res.status(404).send("Page Not Found");
});

// Start server.
app.listen(HTTP_PORT, onHttpStart);