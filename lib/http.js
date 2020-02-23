"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const url_1 = require("url");
// Promisified http(s) get
function get(url) {
    const parsedUrl = new url_1.URL(url);
    return new Promise((resolve, reject) => {
        const getFn = url.startsWith('https') ? https.get : http.get;
        getFn({
            headers: {
                'User-Agent': 'request',
            },
            hostname: parsedUrl.hostname,
            method: 'GET',
            path: parsedUrl.pathname,
            port: parsedUrl.port,
        }, (res) => {
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
