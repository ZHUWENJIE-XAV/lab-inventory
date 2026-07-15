import { create } from 'zustand';
import type { Category, InventoryItem } from '@/types';
import { loadItems, saveItems } from '@/utils/storage';

function generateId(): string {
  return crypto.randomUUID();
}

interface InventoryState {
  items: InventoryItem[];
  activeCategory: Category;
  searchQuery: string;
  modalOpen: boolean;
  editingItem: InventoryItem | null;

  load: () => void;
  setActiveCategory: (cat: Category) => void;
  setSearchQuery: (q: string) => void;
  openAddModal: () => void;
  openEditModal: (item: InventoryItem) => void;
  closeModal: () => void;
  addItem: (data: Omit<InventoryItem, 'id'>) => void;
  updateItem: (data: InventoryItem) => void;
  deleteItem: (id: string) => void;
}

export const useInventory = create<InventoryState>((set, get) => ({
  items: [],
  activeCategory: 'sers',
  searchQuery: '',
  modalOpen: false,
  editingItem: null,

  load: () => set({ items: loadItems() }),

  setActiveCategory: (cat) => set({ activeCategory: cat, searchQuery: '' }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  openAddModal: () => set({ modalOpen: true, editingItem: null }),

  openEditModal: (item) => set({ modalOpen: true, editingItem: item }),

  closeModal: () => set({ modalOpen: false, editingItem: null }),

  addItem: (data) => {
    const newItem: InventoryItem = { ...data, id: generateId() };
    const items = [...get().items, newItem];
    saveItems(items);
    set({ items, modalOpen: false });
  },

  updateItem: (data) => {
    const items = get().items.map((it) => (it.id === data.id ? data : it));
    saveItems(items);
    set({ items, modalOpen: false, editingItem: null });
  },

  deleteItem: (id) => {
    const items = get().items.filter((it) => it.id !== id);
    saveItems(items);
    set({ items });
  },
}));