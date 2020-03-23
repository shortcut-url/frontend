let UrlRegexp = /^.+\..{2,255}$/;

export function urlValidator(url) {
  return UrlRegexp.test(url);
}
