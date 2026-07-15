import { useInventory } from '@/hooks/useInventory';
import { CATEGORY_LABELS, CATEGORY_KEYS } from '@/types';

export default function CategoryTabs() {
  const activeCategory = useInventory((s) => s.activeCategory);
  const setActiveCategory = useInventory((s) => s.setActiveCategory);

  return (
    <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[#0a1628] border border-[#1a2d4a]">
      {CATEGORY_KEYS.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeCategory === cat
              ? 'bg-[#00e5ff] text-[#0a1628] shadow-lg shadow-[#00e5ff]/20'
              : 'text-[#8899aa] hover:text-[#00e5ff] hover:bg-[#0f1d33]'
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}