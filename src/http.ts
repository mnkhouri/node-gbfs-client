import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';

// Promisified http(s) get
export function get(url: string): Promise<string> {
  const parsedUrl = new URL(url);
  return new Promise<string>((resolve, reject) => {

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

      const body: Array<string | Buffer> = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => resolve(body.join('')));

    }).on('error', (err) => reject(err));
  });
}
