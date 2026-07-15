import { useEffect } from 'react';
import { useInventory } from '@/hooks/useInventory';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import CategoryTabs from '@/components/CategoryTabs';
import ActionBar from '@/components/ActionBar';
import ItemTable from '@/components/ItemTable';
import ItemFormModal from '@/components/ItemFormModal';

export default function App() {
  const load = useInventory((s) => s.load);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#e0e6ed]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Header />
        <StatsCards />
        <CategoryTabs />
        <ActionBar />
        <ItemTable />
        <ItemFormModal />
      </div>
    </div>
  );
}