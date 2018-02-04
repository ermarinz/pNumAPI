const expect = require('chai').expect;
const request = require('request');
const fs = require('fs')

describe("pNumAPI extract phone numbers from base64 text", () => {
    describe("Using ./sample_file_encoded.txt", () => {
        let options = {
            url: 'http://localhost:8080/api/phonenumbers/parse/sample_file_encoded.txt',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: fs.createReadStream(__dirname + '/sample_file_encoded.txt')
        };
        it("returns status 200", (done) => {
            request(options, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        let options2 = {
            url: 'http://localhost:8080/api/phonenumbers/parse/sample_file_encoded.txt',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: fs.createReadStream(__dirname + '/sample_file_encoded.txt')
        };        
        it("returns JSON array containing 7 phone numbers", (done) => {
            request(options2, (err, res, body) => {
                expect(body).to.equal('["(416) 555-5550","(416) 555-5551","(416) 555-5552","(416) 555-5553","(416) 555-5554","(416) 555-5555","(416) 555-5556"]');
                done();
            });
        });
    });
});