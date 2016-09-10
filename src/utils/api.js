import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default new class ApiClient {
  constructor() {
    // Create method accessors for each `method`
    methods.forEach(method => {
      this[method] = (
        path,
        { params, data } = {}
      ) => new Promise((resolve, reject) => {
        const request = superagent[method](`/api/${path}`);

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          if (err) {
            if (err && err.response) {
              reject(err.response.text);
            } else {
              reject(body || err);
            }
          } else {
            resolve(body);
          }
        });
      });
    });
  }
}();
