import { useState, useEffect } from 'react';
import { useInventory } from '@/hooks/useInventory';
import type { InventoryItem, Category } from '@/types';
import { CATEGORY_LABELS, CATEGORY_KEYS } from '@/types';
import { X } from 'lucide-react';

const emptyForm: Omit<InventoryItem, 'id'> = {
  category: 'sers',
  name: '',
  purchaseDate: '',
  company: '',
  isHazardous: false,
  expiryDate: '',
  totalAmount: 0,
  unit: 'g',
  remainingAmount: 0,
};

export default function ItemFormModal() {
  const modalOpen = useInventory((s) => s.modalOpen);
  const editingItem = useInventory((s) => s.editingItem);
  const activeCategory = useInventory((s) => s.activeCategory);
  const closeModal = useInventory((s) => s.closeModal);
  const addItem = useInventory((s) => s.addItem);
  const updateItem = useInventory((s) => s.updateItem);

  const [form, setForm] = useState<Omit<InventoryItem, 'id'>>(emptyForm);

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setForm(rest);
    } else {
      setForm({ ...emptyForm, category: activeCategory });
    }
  }, [editingItem, activeCategory, modalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.purchaseDate) return;
    if (editingItem) {
      updateItem({ ...form, id: editingItem.id });
    } else {
      addItem(form);
    }
  };

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative w-full max-w-lg bg-[#0f1923] border border-[#1a2d4a] rounded-2xl shadow-2xl shadow-black/50 animate-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2d4a]">
          <h2 className="text-lg font-semibold text-[#e0e6ed]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {editingItem ? '编辑物品' : '添加物品'}
          </h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-[#8899aa] hover:text-[#e0e6ed] hover:bg-[#1a2d4a] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-[#8899aa] mb-1.5">分类</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value as Category)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
            >
              {CATEGORY_KEYS.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#8899aa] mb-1.5">名称 *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="药品/耗材名称"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] placeholder:text-[#4a5a6a] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8899aa] mb-1.5">购买时间 *</label>
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => update('purchaseDate', e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8899aa] mb-1.5">保质期</label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => update('expiryDate', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#8899aa] mb-1.5">购买公司</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="供应商/公司名称"
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] placeholder:text-[#4a5a6a] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#8899aa] mb-1.5">购买量</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.totalAmount || ''}
                onChange={(e) => update('totalAmount', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8899aa] mb-1.5">单位</label>
              <select
                value={form.unit}
                onChange={(e) => update('unit', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
              >
                {['g', 'mg', 'mL', 'L', '瓶', '个', '盒', '包', '支'].map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8899aa] mb-1.5">余量</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.remainingAmount || ''}
                onChange={(e) => update('remainingAmount', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] focus:outline-none focus:border-[#00e5ff]/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isHazardous"
              checked={form.isHazardous}
              onChange={(e) => update('isHazardous', e.target.checked)}
              className="w-4 h-4 rounded border-[#1a2d4a] bg-[#0a1628] accent-[#ffab00]"
            />
            <label htmlFor="isHazardous" className="text-sm text-[#ffab00] cursor-pointer select-none">
              该物品为危化品
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#8899aa] hover:text-[#e0e6ed] hover:border-[#4a5a6a] transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-[#00e5ff] text-[#0a1628] text-sm font-semibold hover:bg-[#00cee6] hover:shadow-lg hover:shadow-[#00e5ff]/20 transition-all duration-300"
            >
              {editingItem ? '保存修改' : '确认添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}