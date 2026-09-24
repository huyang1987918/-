import React from 'react';
import {
  X,
  RotateCw,
  LayoutDashboard,
  BarChart3,
  Building2,
  ShoppingCart,
  Package,
  Boxes,
  Home,
  Truck,
  Receipt,
  ShieldCheck,
  LayoutGrid,
  ClipboardList,
  Compass,
  Wrench,
  Leaf,
  Settings,
  Database,
  Globe,
  ShoppingBag,
  History,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopNavModule } from '../../types';

const MODULE_ICONS: Record<TopNavModule, React.ComponentType<{ className?: string }>> = {
  cockpit: LayoutDashboard,
  operation: BarChart3,
  park: Building2,
  order: ShoppingCart,
  inventory: Package,
  product: Boxes,
  warehouse: Home,
  transport: Truck,
  settlement: Receipt,
  user_center: ShieldCheck,
  work_center: LayoutGrid,
  fulfillment: ClipboardList,
  multimodal: Compass,
  field_service: Wrench,
  property_energy: Leaf,
  service_collab: ShieldCheck,
  merchant_lease: Building2,
  system_mgmt: Settings,
  master_data: Database,
  portal_ops: Globe,
  mall_ops: ShoppingBag,
  trace_audit: History,
};

export const TabBar: React.FC = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab, setActiveModule, setSubSidebarItem } = useApp();

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTabId(tab.id);
    setActiveModule(tab.module);
    if (tab.subModule) {
      setSubSidebarItem(tab.subModule);
    }
  };

  return (
    <div className="bg-[#e9ecf1] dark:bg-[#18191b] border-b border-slate-300/80 dark:border-[#282a2c] px-3 flex items-center justify-between text-xs h-9 select-none shrink-0">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        {tabs.map(tab => {
          const isActive = activeTabId === tab.id;
          const TabIcon = MODULE_ICONS[tab.module] || LayoutDashboard;

          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`group relative flex items-center gap-1.5 px-3 py-1 cursor-pointer transition-all rounded-lg whitespace-nowrap text-xs ${
                isActive
                  ? 'bg-white dark:bg-[#1e1f20] text-emerald-700 dark:text-[#4ade80] font-semibold shadow-xs border border-emerald-300/90 dark:border-emerald-500/40'
                  : 'text-slate-600 dark:text-[#9aa0a6] hover:text-slate-900 dark:hover:text-[#f1f3f4] hover:bg-slate-300/60 dark:hover:bg-[#282a2c]'
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 shrink-0 transition-colors ${isActive ? 'text-[#07c160] dark:text-[#4ade80]' : 'text-slate-500 dark:text-[#80868b] group-hover:text-emerald-600 dark:group-hover:text-[#4ade80]'}`} />
              <span>{tab.title}</span>
              {tab.closable !== false && tabs.length > 1 && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="p-0.5 rounded-md hover:bg-slate-200/80 dark:hover:bg-[#3c4043] text-slate-400 dark:text-[#80868b] hover:text-rose-600 dark:hover:text-rose-400 transition-colors ml-0.5 cursor-pointer"
                  title="关闭标签页"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1 text-slate-500 dark:text-[#9aa0a6] pl-2 shrink-0">
        <button
          onClick={() => {
            const el = document.querySelector('main');
            if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="回滚置顶"
          className="p-1 rounded-md hover:bg-slate-300/60 dark:hover:bg-[#282a2c] hover:text-emerald-600 dark:hover:text-[#4ade80] transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
