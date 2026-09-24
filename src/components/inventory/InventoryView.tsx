import React, { useState } from 'react';
import { Package, SlidersHorizontal, Layers, LayoutDashboard, Search, Filter, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InventoryView: React.FC<{ mode?: 'inventory' | 'virtual' | 'water_level' | 'visual' }> = ({
  mode = 'inventory',
}) => {
  const { warehouses, selectedPark } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarehouses = warehouses.filter(w =>
    selectedPark === '所有园区' ? true : w.park === selectedPark
  );

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            {mode === 'water_level' ? (
              <SlidersHorizontal className="w-5 h-5 text-[#07c160]" />
            ) : mode === 'virtual' ? (
              <Layers className="w-5 h-5 text-[#07c160]" />
            ) : mode === 'visual' ? (
              <LayoutDashboard className="w-5 h-5 text-[#07c160]" />
            ) : (
              <Package className="w-5 h-5 text-[#07c160]" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
              {mode === 'water_level'
                ? '库存安全水位与动态阈值管理'
                : mode === 'virtual'
                ? '虚拟仓储与跨仓智能整合'
                : mode === 'visual'
                ? '3D 数字孪生库位可视化'
                : '实物库存与库容利用明细'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              当前园区范围：{selectedPark} · 纳入监测设施：{filteredWarehouses.length} 个
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#07c160]" />
            <input
              type="text"
              placeholder="搜索物料或仓位..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8.5 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Warehouse Capacity & Inventory Water Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWarehouses.slice(0, 9).map(item => {
          const used = Math.max(0, item.totalCapacity - item.availableCapacity);
          const percent =
            item.totalCapacity > 0 ? Math.round((used / item.totalCapacity) * 100) : 0;
          const isTight = percent > 80;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/70 p-4.5 shadow-2xs space-y-3 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">{item.name}</h4>
                  <span className="text-[11px] text-slate-400">{item.park} · {item.category}</span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isTight
                      ? 'bg-amber-50 text-amber-700 border-amber-200/60'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                  }`}
                >
                  {isTight ? '水位偏高' : '水位健康'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>当前利用率</span>
                  <span className="font-bold font-mono text-slate-800">{percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percent > 85 ? 'bg-rose-500' : percent > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2.5 border-t border-slate-100">
                <div>
                  总容积: <span className="font-mono text-slate-800 font-semibold">{item.totalCapacity} m³</span>
                </div>
                <div>
                  可用容积: <span className="font-mono text-teal-600 font-semibold">{item.availableCapacity} m³</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">负责人: {item.contactName}</span>
                <span className="text-slate-400">{item.type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
