export function classNames(...args) {
  return args.reduce((acc, current) => {
    if (current) return `${acc} ${current}`;

    return acc;
  }, '');
}
