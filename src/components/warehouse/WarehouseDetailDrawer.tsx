import React from 'react';
import { X, Building2, MapPin, Phone, User, Layers, Gauge, ShieldAlert } from 'lucide-react';
import { WarehouseItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface WarehouseDetailDrawerProps {
  warehouse: WarehouseItem | null;
  onClose: () => void;
  onEdit: (item: WarehouseItem) => void;
}

export const WarehouseDetailDrawer: React.FC<WarehouseDetailDrawerProps> = ({
  warehouse,
  onClose,
  onEdit,
}) => {
  const { hasPermission, currentRole, roles } = useApp();

  if (!warehouse) return null;

  const canViewRealPhone = hasPermission('warehouse:sensitive_phone');
  const canEdit = hasPermission('warehouse:edit');

  const displayPhone = canViewRealPhone
    ? warehouse.contactPhone
    : warehouse.contactPhone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');

  const usageRate =
    warehouse.totalCapacity > 0
      ? Math.round(((warehouse.totalCapacity - warehouse.availableCapacity) / warehouse.totalCapacity) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">{warehouse.name}</h3>
              <span className="text-[11px] text-slate-400">{warehouse.park} · {warehouse.category}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Status & Highlights */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div>
              <span className="text-[10px] text-slate-400">运行状态</span>
              <div className="font-semibold text-slate-800 mt-0.5">{warehouse.status}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">仓储类型</span>
              <div className="font-semibold text-slate-800 mt-0.5">{warehouse.type}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400">属性</span>
              <div className="font-semibold text-slate-800 mt-0.5">{warehouse.isVirtual}</div>
            </div>
          </div>

          {/* Capacity gauge */}
          <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-600" />
                当前库容负荷率
              </span>
              <span className="font-bold font-mono text-emerald-600">{usageRate}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usageRate > 85 ? 'bg-rose-500' : usageRate > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, usageRate))}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-slate-500 pt-1.5 text-[11px] border-t border-slate-100">
              <div>总容积: <span className="font-medium text-slate-800">{warehouse.totalCapacity} m³</span></div>
              <div>已用: <span className="font-medium text-slate-800">{Math.max(0, warehouse.totalCapacity - warehouse.availableCapacity)} m³</span></div>
              <div>可用: <span className="font-medium text-teal-600">{warehouse.availableCapacity} m³</span></div>
            </div>
          </div>

          {/* Specs grid */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              设施基础参数
            </h4>
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div>
                <span className="text-slate-400 text-[11px]">仓库面积:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{warehouse.area} ㎡</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">占地面积:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{warehouse.landArea} ㎡</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">可用面积:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{warehouse.usableArea} ㎡</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">服务类型:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{warehouse.serviceType}</p>
              </div>
            </div>
          </div>

          {/* Contact & RBAC demonstration */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              责任联系人 (RBAC权限验证)
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">姓名:</span>
                <span className="font-semibold text-slate-800">{warehouse.contactName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  电话:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-slate-800 font-semibold">{displayPhone}</span>
                  {!canViewRealPhone && (
                    <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <ShieldAlert className="w-2.5 h-2.5" /> 角色脱敏保护
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between pt-2 border-t border-slate-200/70">
                <span className="text-slate-500 flex items-center gap-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  地址:
                </span>
                <span className="text-slate-700 text-right">{warehouse.region}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            当前身份: {roles.find(r => r.id === currentRole)?.name}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-white transition-colors text-xs font-medium cursor-pointer"
            >
              关闭
            </button>
            <button
              disabled={!canEdit}
              onClick={() => {
                onEdit(warehouse);
                onClose();
              }}
              title={!canEdit ? '当前角色无权编辑' : ''}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                canEdit
                  ? 'bg-[#07c160] hover:bg-[#06a953] text-white shadow-xs shadow-emerald-500/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              编辑此档案
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
