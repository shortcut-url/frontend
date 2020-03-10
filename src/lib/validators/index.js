let UrlRegexp = /^.+\..{2,255}$/;

export let urlValidator = url => UrlRegexp.test(url);
