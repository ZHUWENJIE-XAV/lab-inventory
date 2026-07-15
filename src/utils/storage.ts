import type { InventoryItem } from '@/types';

const STORAGE_KEY = 'lab_inventory_data';

export function loadItems(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: InventoryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}