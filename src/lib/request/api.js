const baseUri = 'http://localhost:8080';

export let requestAPI = async (method, url, options = {}) => {
  let uri = `${options.baseUri || baseUri}/${url}`;

  let headers = new Headers({
    ...createContentType(options),
    ...options.headers
  });

  let res = await fetch(uri, {
    method,
    headers,
    ...options
  });

  let statusCode = res.status;
  let resInfo = { statusCode, ok: res.ok };

  if (statusCode === 504)
    return {
      data: { errors: { message: 'An error has occurred. Try later' } },
      ...resInfo
    };

  let json = await res.text();

  try {
    return { data: JSON.parse(json), ...resInfo };
  } catch (err) {
    return { data: json, ...resInfo };
  }
};

let createContentType = options => {
  let header = contentTypeFromOptions(options);

  return header ? { 'Content-Type': header } : {};
};

let contentTypeFromOptions = options => {
  if (options && options.headers && options.headers['Content-Type']) {
    return options.headers['Content-Type'];
  }

  if (options && options.body && options.body instanceof FormData) {
    return 'multipart/form-data';
  }

  return typeof options.body === 'object' ? 'application/json' : '';
};
