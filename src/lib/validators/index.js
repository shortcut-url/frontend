let UrlRegexp = /.\../;

export function urlValidator(url) {
  return UrlRegexp.test(url);
}
