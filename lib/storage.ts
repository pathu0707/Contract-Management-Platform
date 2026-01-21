export function loadFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToStorage<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(data));
}
