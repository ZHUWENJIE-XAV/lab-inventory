import { useInventory } from '@/hooks/useInventory';
import { FlaskConical, AlertTriangle, PackageOpen, Clock } from 'lucide-react';

export default function StatsCards() {
  const items = useInventory((s) => s.items);
  const activeCategory = useInventory((s) => s.activeCategory);

  const filtered = items.filter((it) => it.category === activeCategory);
  const total = filtered.length;
  const hazardous = filtered.filter((it) => it.isHazardous).length;
  const today = new Date().toISOString().slice(0, 10);
  const lowStock = filtered.filter((it) => it.remainingAmount <= it.totalAmount * 0.2).length;
  const nearExpiry = filtered.filter(
    (it) => it.expiryDate && it.expiryDate <= today
  ).length;

  const cards = [
    { icon: PackageOpen, label: '总计', value: total, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10' },
    { icon: AlertTriangle, label: '危化品', value: hazardous, color: 'text-[#ffab00]', bg: 'bg-[#ffab00]/10' },
    { icon: FlaskConical, label: '低库存', value: lowStock, color: 'text-[#ff5252]', bg: 'bg-[#ff5252]/10' },
    { icon: Clock, label: '已过期', value: nearExpiry, color: 'text-[#ff5252]', bg: 'bg-[#ff5252]/10' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-xl bg-[#0a1628] border border-[#1a2d4a] p-4 group hover:border-[#00e5ff]/30 transition-all duration-300"
        >
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10 ${card.bg}`} />
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${card.color}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {card.value}
              </div>
              <div className="text-xs text-[#8899aa] mt-0.5">{card.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}