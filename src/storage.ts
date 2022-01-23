const KEY_PREFIX = "contactBook_";

const get = (key: string) => {
  const item = localStorage.getItem(`${KEY_PREFIX}${key}`);
  return item && JSON.parse(item);
};

const set = (key: string, value: any) => {
  localStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(value));
};

const remove = (key: string) => {
  localStorage.removeItem(`${KEY_PREFIX}${key}`);
};

const clear = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
};

export { get, set, remove, clear };
