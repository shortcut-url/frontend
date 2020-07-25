export let copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};
