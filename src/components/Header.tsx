import { Beaker } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#00e5ff]/20 to-[#00e5ff]/5 border border-[#00e5ff]/20">
          <Beaker className="w-7 h-7 text-[#00e5ff]" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#00e5ff] to-[#00cee6] bg-clip-text text-transparent"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Lab Inventory
          </h1>
          <p className="text-xs text-[#4a5a6a] mt-0.5">课题组药品与耗材管理系统</p>
        </div>
      </div>
    </header>
  );
}