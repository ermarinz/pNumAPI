const expect = require('chai').expect;
const request = require('request');

describe("pNumAPI extract phone numbers by URL", () => {
    describe("Single phone number. Format: 5555555555. With other text", () => {
        let url = "http://localhost:8080/api/phonenumbers/parse/text/Cell%20Phone:%204165554567%20Primary:%20NA";
        it("returns status 200", (done) => {
            request(url, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("returns JSON array containing single phone number", (done) => {
            request(url, (err, res, body) => {
                expect(body).to.equal('["(416) 555-4567"]')
                done();
            });
        });
    });
    describe("Three phone numbers. Format: 5555555555, 555-555-5555, 555 555 5555. With other text", () => {
        let url = "http://localhost:8080/api/phonenumbers/parse/text/Cell%20Phone:9058554555Home:905-855-3555Work:416-455-4555";
        it("returns status 200", (done) => {
            request(url, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
        it("returns JSON array containing three phone numbers", (done) => {
            request(url, (err, res, body) => {
                expect(body).to.equal('["(905) 855-4555","(905) 855-3555","(416) 455-4555"]')
                done();
            });
        });
    });    
    describe("Duplicate phone numbers. Format: 5555555555. With other text", () => {
        let url = "http://localhost:8080/api/phonenumbers/parse/text/Cell%20Phone:%204165554567%20Primary:%204165554567";
        it("returns status 200", (done) => {
            request(url, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });        
        it("returns JSON array containing single phone number", (done) => {
            request(url, (err, res, body) => {
                expect(body).to.equal('["(416) 555-4567"]')
                done();
            });
        });
    });
    describe("Text containing no valid phone numbers", () => {
        let url = "http://localhost:8080/api/phonenumbers/parse/text/Cell%20Phone:%204161234567%20Primary:%20NA";
        it("returns status 200", (done) => {
            request(url, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });        
        it("returns empty JSON array", (done) => {
            request(url, (err, res, body) => {
                expect(body).to.equal('[]');
                done();
            });
        });        
    });
});