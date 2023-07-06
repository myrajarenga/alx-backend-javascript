export default function cleanSet(set, startString) {
  const filterValues = Array.from(set).filter((value) => value.startsWith(startString));
  const newString = filterValues.join('-');
  return newString;
}
