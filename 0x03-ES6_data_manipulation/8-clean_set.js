export default function cleanSet(set, startString) {
  let result = '';

  set.forEach((value) => {
    const stringValue = String(value);
    if (stringValue.startsWith(startString)) {
      const restOfString = stringValue.slice(startString.length);
      if (result.length > 0) {
        result += '-';
      }
      result += restOfString;
    }
  });

  return result;
}
