import React, { useState, useEffect } from 'react';
import { X, Building2, AlertCircle } from 'lucide-react';
import { WarehouseItem } from '../../types';
import { INITIAL_PARKS } from '../../mock/data';

interface WarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<WarehouseItem, 'id' | 'index'>) => void;
  initialData?: WarehouseItem | null;
}

export const WarehouseModal: React.FC<WarehouseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    park: '江西供销产业园',
    status: '启用(默认)' as WarehouseItem['status'],
    type: '前置仓' as WarehouseItem['type'],
    serviceType: '仓库租赁',
    category: '干仓' as WarehouseItem['category'],
    isVirtual: '实体(默认)' as WarehouseItem['isVirtual'],
    area: 5000,
    totalCapacity: 10000,
    availableCapacity: 8000,
    contactName: '',
    contactPhone: '',
    region: '江西省赣州市章贡区',
    landArea: 6000,
    usableArea: 4800,
    maxVolume: 10000,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        park: initialData.park,
        status: initialData.status,
        type: initialData.type,
        serviceType: initialData.serviceType,
        category: initialData.category,
        isVirtual: initialData.isVirtual,
        area: initialData.area,
        totalCapacity: initialData.totalCapacity,
        availableCapacity: initialData.availableCapacity,
        contactName: initialData.contactName,
        contactPhone: initialData.contactPhone,
        region: initialData.region,
        landArea: initialData.landArea,
        usableArea: initialData.usableArea,
        maxVolume: initialData.maxVolume || initialData.totalCapacity,
      });
    } else {
      setFormData({
        name: '',
        park: '江西供销产业园',
        status: '启用(默认)',
        type: '前置仓',
        serviceType: '仓库租赁',
        category: '干仓',
        isVirtual: '实体(默认)',
        area: 5000,
        totalCapacity: 10000,
        availableCapacity: 8000,
        contactName: '',
        contactPhone: '',
        region: '江西省赣州市章贡区',
        landArea: 6000,
        usableArea: 4800,
        maxVolume: 10000,
      });
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('请输入仓库名称');
      return;
    }
    if (!formData.contactName.trim()) {
      setError('请输入联系人姓名');
      return;
    }
    if (!formData.contactPhone.trim()) {
      setError('请输入联系人电话');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {initialData ? '编辑仓库档案' : '新建仓储设施档案'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                仓库名称 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="例如：冷库C、共青城12#干仓"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">所属园区</label>
              <select
                value={formData.park}
                onChange={e => setFormData({ ...formData, park: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-white"
              >
                {INITIAL_PARKS.filter(p => p !== '所有园区').map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">仓库类别</label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value as WarehouseItem['category'] })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-white"
              >
                <option value="干仓">干仓</option>
                <option value="冷库">冷库</option>
                <option value="常温配送库">常温配送库</option>
                <option value="恒温恒湿仓">恒温恒湿仓</option>
                <option value="自动化立库">自动化立库</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">仓库类型</label>
              <select
                value={formData.type}
                onChange={e =>
                  setFormData({ ...formData, type: e.target.value as WarehouseItem['type'] })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-white"
              >
                <option value="前置仓">前置仓</option>
                <option value="中心仓">中心仓</option>
                <option value="区域干线仓">区域干线仓</option>
                <option value="保税仓">保税仓</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">服务类型</label>
              <input
                type="text"
                placeholder="例如：仓库租赁、一件代发、越库配送"
                value={formData.serviceType}
                onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">实体/虚拟属性</label>
              <select
                value={formData.isVirtual}
                onChange={e =>
                  setFormData({ ...formData, isVirtual: e.target.value as WarehouseItem['isVirtual'] })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-white"
              >
                <option value="实体(默认)">实体(默认)</option>
                <option value="虚拟仓">虚拟仓</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">仓库面积 (㎡)</label>
              <input
                type="number"
                value={formData.area}
                onChange={e => setFormData({ ...formData, area: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">仓储总容量 (m³)</label>
              <input
                type="number"
                value={formData.totalCapacity}
                onChange={e => setFormData({ ...formData, totalCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">仓储可用容量 (m³)</label>
              <input
                type="number"
                value={formData.availableCapacity}
                onChange={e => setFormData({ ...formData, availableCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">状态</label>
              <select
                value={formData.status}
                onChange={e =>
                  setFormData({ ...formData, status: e.target.value as WarehouseItem['status'] })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-white"
              >
                <option value="启用(默认)">启用(默认)</option>
                <option value="维护中">维护中</option>
                <option value="停用">停用</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                联系人姓名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="例如：李工"
                value={formData.contactName}
                onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                联系人电话 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="11位手机号码"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">所在地区及地址</label>
            <input
              type="text"
              placeholder="例如：江西省赣州市南康区家具产业园A区"
              value={formData.region}
              onChange={e => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none bg-slate-50"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#07c160] hover:bg-[#06a953] text-white rounded-xl font-medium shadow-xs shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {initialData ? '保存变更' : '确认录入'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
