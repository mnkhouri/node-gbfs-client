import * as https from 'https';
import * as http from 'http';

// Promisified http(s) get
export function get(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {

    const getFn = url.startsWith('https') ? https.get : http.get;

    getFn(url, (res) => {
      if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error(`Failure: status code ${res.statusCode}`));
      }

      const body: (string|Buffer)[] = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => resolve(body.join('')));

    }).on('error', (err) => reject(err));
  })
}
