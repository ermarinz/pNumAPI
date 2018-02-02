# pNumAPI
A Node.js / Express implementation of Google's libphonenumber

## Introduction
This software was written and tested using [Node.js](https://nodejs.org/en/) v8.4.0 and Node Package Manager (npm) v5.3.0.

If you do not have Node.js or npm installed, aquire a copy using the link above.

## Installation
1. Clone this repository
2. Browse to your working folder and use npm to install dependencies:
```sh
npm install
```
3. Start the server by using the following command:
```sh
node server.js
```

By default, this web service utilizes port 8080.

Verify that the service is running by checking console output:

![pNumAPI Running](screenshots/pNumAPI_running.png "Service successfully running")

## Usage
Coming soon

## Dependencies
pNumAPI utilizes the following modules, which are installed for you by npm.

### Express
Facilitating web service functionality, we utilize the popular Node.js framework [Express](https://expressjs.com/) v4.16.2.

### body-parser
In order to handle POST requests of content type plan/text, and body containing base64 encoded text files, we utilize the express middleware known as [body-parser](https://github.com/expressjs/body-parser)

### google-libphonenumber
Core functionality of this software is made possible by utilizing the Node.js friendly third-party port [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) which is a useful wrapper to Google's open source [libphonenumber](https://github.com/googlei18n/libphonenumber) library.

## Licenses
This software is licensed under BSD-2-Clause. The [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) package is licensed under MIT. The bundled [libphonenumber](https://github.com/googlei18n/libphonenumber) library is licensed under Apache 2.0.