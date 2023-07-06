export default function updateUniqueItems(grocerieslist) {
  if (!(grocerieslist instanceof Map)) {
    throw new Error('Cannot process');
  }

  Array.from(grocerieslist.keys()).forEach((item) => {
    if (grocerieslist.get(item) === 1) {
      grocerieslist.set(item, 100);
    }
  });

  return grocerieslist;
}
