"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const http = require("http");
// Promisified http(s) get
function get(url) {
    return new Promise((resolve, reject) => {
        const getFn = url.startsWith('https') ? https.get : http.get;
        getFn(url, (res) => {
            if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error(`Failure: status code ${res.statusCode}`));
            }
            const body = [];
            res.on('data', (chunk) => body.push(chunk));
            res.on('end', () => resolve(body.join('')));
        }).on('error', (err) => reject(err));
    });
}
exports.get = get;
