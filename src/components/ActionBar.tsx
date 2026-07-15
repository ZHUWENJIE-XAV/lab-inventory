import { useInventory } from '@/hooks/useInventory';
import { Search, Plus } from 'lucide-react';

export default function ActionBar() {
  const searchQuery = useInventory((s) => s.searchQuery);
  const setSearchQuery = useInventory((s) => s.setSearchQuery);
  const openAddModal = useInventory((s) => s.openAddModal);

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899aa]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索药品/耗材名称..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0a1628] border border-[#1a2d4a] text-sm text-[#e0e6ed] placeholder:text-[#4a5a6a] focus:outline-none focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/20 transition-all"
        />
      </div>
      <button
        onClick={openAddModal}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00e5ff] text-[#0a1628] text-sm font-semibold hover:bg-[#00cee6] hover:shadow-lg hover:shadow-[#00e5ff]/20 transition-all duration-300"
      >
        <Plus className="w-4 h-4" />
        添加物品
      </button>
    </div>
  );
}