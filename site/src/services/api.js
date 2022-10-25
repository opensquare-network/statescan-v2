const paramsKeyConvert = (str = "") =>
  str.replace(/[A-Z]/g, ([s]) => `_${s.toLowerCase()}`);

class Api {
  endpoint = null;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetch = (path, params = {}, options) => {
    const url = new URL(path, this.endpoint);
    for (const key of Object.keys(params)) {
      url.searchParams.set(paramsKeyConvert(key), params[key]);
    }

    return new Promise((resolve, reject) =>
      fetch(url, options)
        .then((resp) =>
          resp.status !== 200
            ? reject({ error: { status: resp.status } })
            : resp.json().then((result) => resolve({ result })),
        )
        .catch((e) => {
          if (e.message === "The user aborted a request.") {
            reject(e);
          } else {
            resolve({
              error: {
                status: 500,
                message: "can not parse response as JSON",
                data: null,
              },
            });
          }
        }),
    );
  };

  post = async (path, body = null) => {
    return await this.fetch(
      path,
      {},
      {
        method: "POST",
        credentials: "same-origin",
        body: body ? JSON.stringify(body) : null,
        headers: { "Content-Type": "application/json" },
      },
    );
  };
}

export default new Api(
  new URL(process.env.REACT_APP_PUBLIC_API_END_POINT).href,
);
