import http from 'http';

export default function fetch(host, path) {
  return new Promise((resolve, reject) => {
    const options = { host, path };

    // Steam the data into memory and return it as the promise response
    const request = http.request(options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(data);
        } else {
          resolve(data);
        }
      });
    });

    // Watch for errors
    request.on('error', (error) => {
      reject(error);
    });

    // Close the request
    request.end();
  });
}
