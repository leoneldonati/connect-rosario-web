export function groupBy<T, K extends PropertyKey>(
  array: T[],
  fn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, current) => {
    const key = fn(current);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(current);
    return acc;
  }, {} as Record<K, T[]>);
}
