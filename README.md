# Project JARVINSA - nodejs mission

## Getting started

First you will need Nodejs and its npm package in your environment.
* [For Windows, iOS](https://nodejs.org/en/download/)
* [For others environments (Ubuntu, Debian, ...)](https://nodejs.org/en/download/package-manager/)

Then you will need a mongodb
* [Mongodb](https://www.mongodb.com/download-center#community)

Test if you have npm 
```console
backend > npm -v
```

Install sails from npm
```console
backend > npm install sails -g
```

Since sails is completely downloaded, install npm dependencies
```console
backend > npm install
```

## Launch application

Now you can launch the server
```console
backend > node app.js
```

If you want to be professional, launch in mode production
```console
backend > node app.js --prod
```

Normally the app will listen in the port 1337. You can personalize it in when launch `sails lift --port=80`

## API Documentation

Since this is a RestAPI app, each time when you go to any url that need to be authenticated, you will need first to login or create an account, which will give you the token. The response will be like the following:
```json
{
    "user": {
        "username": "username",
        "password": "$2a$10$j/JYBo.1YL9U3XPaSwQ79urGVbHD8q8z6aanqMqXwvnmT1eQSAcBi",
        "email": "toto@gmail.com",
        "createdAt": "2017-11-20T16:51:21.266Z",
        "updatedAt": "2017-11-20T16:51:21.266Z",
        "id": "5a130809a809dd68196bb005"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTMwODA5YTgwOWRkNjgxOTZiYjAwNSIsImlhdCI6MTUxMTE5NzQ5NSwiZXhwIjoxNTExMTk3NTU1fQ.NtGO9Ns-lvhsWd0oeyB756K1T_A3xV5_1E5WrsIgeHs"
}
```

Copy your token (which is the jwt token) and send it along each request that need the authentification in Bearer Token. (Champ Authorization)
