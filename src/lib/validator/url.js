const UrlRegexp = /.\../;

export function urlValidator(url) {
  return UrlRegexp.test(url);
}
