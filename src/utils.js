export function coalesce(...values) {
  let newValue;
  values.every((value) => {
    newValue = value;
    return value == null;
  });
  return newValue;
}

export function coalesceProp(prop, ...objects) {
  return coalesce(...objects.map(obj => obj[prop]));
}
