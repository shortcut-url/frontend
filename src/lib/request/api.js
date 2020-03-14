import nodeFetch, { Headers, Request } from 'node-fetch';

const baseUri = 'http://localhost:8080';

export let requestAPI = async (method, url, options = {}) => {
  let uri = `${options.baseUri || baseUri}/${url}`;

  let headers = new Headers({
    ...createContentType(options),
    ...options.headers
  });

  let { body, ...restOptions } = options;

  let config = new Request(uri, {
    method,
    headers,
    ...restOptions,
    body: createBody(options, headers)
  });

  let res = await nodeFetch(config);

  let statusCode = res.status;
  let resInfo = { statusCode, ok: res.ok };

  if (statusCode === 504)
    return {
      data: { errors: { message: 'An error has occurred. Try later' } },
      ...resInfo
    };

  let textResponse = await res.text();

  try {
    return { data: JSON.parse(textResponse), ...resInfo };
  } catch (err) {
    return { data: textResponse, ...resInfo };
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

  return typeof options.body === 'object' ? 'application/json' : '';
};

let createBody = (options, headers) => {
  let contentType = headers.get('content-type');

  if (options.body && contentType && contentType.includes('json')) {
    return JSON.stringify(options.body);
  }

  return undefined;
};
