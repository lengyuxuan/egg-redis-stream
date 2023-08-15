export function objToArr(obj: { [k: string]: any }): string[] {
  const list: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    list.push(k);
    list.push(Object.prototype.toString.call(v) === '[object Object]' ? JSON.stringify(v) : v);
  }
  return list;
}

export function arrToObj<T = Record<string, string>>(arr: string[]) {
  const obj = {};
  for (let i = 0; i < arr.length; i += 2) {
    obj[arr[i]] = arr[i + 1];
  }
  return obj as T;
}
