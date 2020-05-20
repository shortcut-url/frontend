import nodeFetch, { Headers, Request } from 'node-fetch';
import FormData from 'form-data';

const dev = process.env.NODE_ENV !== 'production';

const baseUri = dev
  ? 'http://localhost:3000/api'
  : `${process.env.DEPLOYMENT_SERVER}/api`;

export async function requestAPI(method, url, options = {}) {
  let uri = `${options.baseUri || baseUri}/${url}`;

  let headers = new Headers({
    ...createContentType(options),
    ...options.headers
  });

  let { body, ...restOptions } = options;

  let config = new Request(uri, {
    ...restOptions,
    method,
    headers,
    body: createBody(body, headers)
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
}

function createContentType(options) {
  let header = contentTypeFromOptions(options);

  return header ? { 'Content-Type': header } : {};
}

function contentTypeFromOptions(options) {
  if (options && options.headers && options.headers['Content-Type']) {
    return options.headers['Content-Type'];
  }

  if (options && options.body && options.body instanceof FormData) {
    return undefined;
  }

  return typeof options.body === 'object'
    ? 'application/json'
    : (options.headers && options.headers['Content-Type']) || '';
}

function createBody(body, headers) {
  let contentType = headers.get('content-type');

  if (body && contentType && contentType.includes('json')) {
    return JSON.stringify(body);
  }

  if (body instanceof FormData) {
    return body;
  }

  return undefined;
}
