import { useInventory } from '@/hooks/useInventory';
import type { InventoryItem } from '@/types';
import { Pencil, Trash2, AlertTriangle } from 'lucide-react';

export default function ItemTable() {
  const items = useInventory((s) => s.items);
  const activeCategory = useInventory((s) => s.activeCategory);
  const searchQuery = useInventory((s) => s.searchQuery);
  const openEditModal = useInventory((s) => s.openEditModal);
  const deleteItem = useInventory((s) => s.deleteItem);

  const today = new Date().toISOString().slice(0, 10);

  const filtered = items
    .filter((it) => it.category === activeCategory)
    .filter((it) => !searchQuery || it.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (item: InventoryItem) => {
    if (window.confirm(`确定要删除「${item.name}」吗？此操作不可撤销。`)) {
      deleteItem(item.id);
    }
  };

  const isExpired = (expiryDate: string) => expiryDate && expiryDate <= today;
  const isLowStock = (item: InventoryItem) => item.remainingAmount <= item.totalAmount * 0.2;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#4a5a6a]">
        <div className="w-16 h-16 mb-4 rounded-full bg-[#0a1628] border border-[#1a2d4a] flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-[#4a5a6a]" />
        </div>
        <p className="text-sm">{searchQuery ? '未找到匹配的物品' : '暂无数据，点击上方"添加物品"开始记录'}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1a2d4a]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0a1628] text-[#8899aa] text-xs uppercase tracking-wider">
            <th className="text-left py-3 px-4 font-medium">名称</th>
            <th className="text-left py-3 px-4 font-medium">购买时间</th>
            <th className="text-left py-3 px-4 font-medium">购买公司</th>
            <th className="text-center py-3 px-4 font-medium">危化品</th>
            <th className="text-left py-3 px-4 font-medium">保质期</th>
            <th className="text-left py-3 px-4 font-medium">购买量</th>
            <th className="text-left py-3 px-4 font-medium">余量</th>
            <th className="text-center py-3 px-4 font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => {
            const expired = isExpired(item.expiryDate);
            const low = isLowStock(item);
            const ratio = item.totalAmount > 0 ? item.remainingAmount / item.totalAmount : 0;
            const barColor = expired
              ? 'bg-[#ff5252]'
              : low
                ? 'bg-[#ffab00]'
                : ratio > 0.5
                  ? 'bg-[#00e676]'
                  : 'bg-[#ffab00]';

            return (
              <tr
                key={item.id}
                className={`border-t border-[#1a2d4a] ${
                  expired ? 'bg-[#ff5252]/5' : idx % 2 === 0 ? 'bg-[#0f1923]/50' : 'bg-[#0f1923]'
                } hover:bg-[#0a1628] transition-colors`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e0e6ed] font-medium">{item.name}</span>
                    {expired && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff5252]/20 text-[#ff5252] font-medium">
                        已过期
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-[#8899aa]">{item.purchaseDate}</td>
                <td className="py-3 px-4 text-[#8899aa]">{item.company}</td>
                <td className="py-3 px-4 text-center">
                  {item.isHazardous ? (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#ffab00]/15 text-[#ffab00] font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      危化品
                    </span>
                  ) : (
                    <span className="text-[#4a5a6a]">-</span>
                  )}
                </td>
                <td className={`py-3 px-4 ${expired ? 'text-[#ff5252]' : 'text-[#8899aa]'}`}>
                  {item.expiryDate || '-'}
                </td>
                <td className="py-3 px-4 text-[#8899aa]">
                  {item.totalAmount} {item.unit}
                </td>
                <td className="py-3 px-4 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-[#1a2d4a] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-mono w-14 text-right ${low ? 'text-[#ffab00]' : 'text-[#8899aa]'}`}>
                      {item.remainingAmount} {item.unit}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-[#8899aa] hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all"
                      title="编辑"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-[#8899aa] hover:text-[#ff5252] hover:bg-[#ff5252]/10 transition-all"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}