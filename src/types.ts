export type Category = 'sers' | 'czts' | 'consumable';

export interface InventoryItem {
  id: string;
  category: Category;
  name: string;
  purchaseDate: string;
  company: string;
  isHazardous: boolean;
  expiryDate: string;
  totalAmount: number;
  unit: string;
  remainingAmount: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  sers: 'SERS药品',
  czts: 'CZTS药品',
  consumable: '实验室耗材',
};

export const CATEGORY_KEYS: Category[] = ['sers', 'czts', 'consumable'];