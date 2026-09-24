import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle2,
  Barcode,
  Calendar,
  Layers,
  Thermometer,
  Boxes,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProductSKU {
  id: string;
  skuCode: string;
  barcode: string;
  name: string;
  category: '生鲜果品' | '冷冻肉禽' | '常温粮油' | '恒温中药' | '冷藏乳饮';
  spec: string;
  grossWeightKg: number;
  tempZone: '深冷(-25℃)' | '冷冻(-18℃)' | '冷藏(2~6℃)' | '恒温(15~20℃)' | '常温干仓';
  shelfLifeDays: number;
  remainingDays: number;
  minSafetyStock: number;
  maxSafetyStock: number;
  currentStock: number;
  lockedStock: number;
  availableStock: number;
  status: '正常流通' | '临期警戒' | '低库存预警' | '停产下架';
}

const INITIAL_SKUS: ProductSKU[] = [
  {
    id: 'sku-1',
    skuCode: 'SKU-09842',
    barcode: '6901234567890',
    name: '赣南特级早熟蜜桔 (5kg礼盒装)',
    category: '生鲜果品',
    spec: '5kg/箱 (优质精选特级果)',
    grossWeightKg: 5.3,
    tempZone: '冷藏(2~6℃)',
    shelfLifeDays: 30,
    remainingDays: 22,
    minSafetyStock: 2000,
    maxSafetyStock: 10000,
    currentStock: 6420,
    lockedStock: 450,
    availableStock: 5970,
    status: '正常流通',
  },
  {
    id: 'sku-2',
    skuCode: 'SKU-09843',
    barcode: '6901234567891',
    name: '高山无公害生态香菇 (真空干燥)',
    category: '生鲜果品',
    spec: '500g/袋 (特级椴木香菇)',
    grossWeightKg: 0.55,
    tempZone: '常温干仓',
    shelfLifeDays: 365,
    remainingDays: 310,
    minSafetyStock: 1000,
    maxSafetyStock: 8000,
    currentStock: 3200,
    lockedStock: 120,
    availableStock: 3080,
    status: '正常流通',
  },
  {
    id: 'sku-3',
    skuCode: 'SKU-09844',
    barcode: '6901234567892',
    name: '生鲜冷冻土鸡 (三黄鸡整只冷冻)',
    category: '冷冻肉禽',
    spec: '1.2kg/只 (单只抽真空锁鲜)',
    grossWeightKg: 1.25,
    tempZone: '冷冻(-18℃)',
    shelfLifeDays: 180,
    remainingDays: 14,
    minSafetyStock: 1500,
    maxSafetyStock: 6000,
    currentStock: 1680,
    lockedStock: 300,
    availableStock: 1380,
    status: '临期警戒',
  },
  {
    id: 'sku-4',
    skuCode: 'SKU-09845',
    barcode: '6901234567893',
    name: '赣南脐橙原浆冷冻纯汁 (桶装)',
    category: '冷藏乳饮',
    spec: '20kg/无菌桶 (NFC无添加冷榨)',
    grossWeightKg: 21.0,
    tempZone: '深冷(-25℃)',
    shelfLifeDays: 360,
    remainingDays: 280,
    minSafetyStock: 500,
    maxSafetyStock: 3000,
    currentStock: 420,
    lockedStock: 80,
    availableStock: 340,
    status: '低库存预警',
  },
  {
    id: 'sku-5',
    skuCode: 'SKU-09846',
    barcode: '6901234567894',
    name: '江西优质双季晚米 (富硒香米)',
    category: '常温粮油',
    spec: '25kg/编织袋 (国标一等米)',
    grossWeightKg: 25.2,
    tempZone: '常温干仓',
    shelfLifeDays: 180,
    remainingDays: 150,
    minSafetyStock: 3000,
    maxSafetyStock: 15000,
    currentStock: 8900,
    lockedStock: 600,
    availableStock: 8300,
    status: '正常流通',
  },
  {
    id: 'sku-6',
    skuCode: 'SKU-09847',
    barcode: '6901234567895',
    name: '道地葛根粉精制纯粉 (礼品盒)',
    category: '恒温中药',
    spec: '1kg/盒 (纯正葛根古法提炼)',
    grossWeightKg: 1.2,
    tempZone: '恒温(15~20℃)',
    shelfLifeDays: 720,
    remainingDays: 620,
    minSafetyStock: 400,
    maxSafetyStock: 2500,
    currentStock: 1450,
    lockedStock: 40,
    availableStock: 1410,
    status: '正常流通',
  },
];

export const ProductCenterView: React.FC = () => {
  const { addLiveLog, subSidebarItem } = useApp();
  const [skus, setSkus] = useState<ProductSKU[]>(INITIAL_SKUS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  React.useEffect(() => {
    if (subSidebarItem === 'shelf_life_alert') {
      setStatusFilter('临期警戒');
      setCategoryFilter('ALL');
    } else if (subSidebarItem === 'new_sku') {
      setIsCreateOpen(true);
      setStatusFilter('ALL');
    } else {
      setStatusFilter('ALL');
    }
  }, [subSidebarItem]);

  // New SKU form
  const [newSKU, setNewSKU] = useState({
    name: '',
    barcode: '',
    category: '生鲜果品' as ProductSKU['category'],
    spec: '',
    grossWeightKg: 1.0,
    tempZone: '冷藏(2~6℃)' as ProductSKU['tempZone'],
    shelfLifeDays: 90,
    minSafetyStock: 500,
    maxSafetyStock: 5000,
    currentStock: 1000,
  });

  // Filter
  const filteredSkus = skus.filter(s => {
    if (categoryFilter !== 'ALL' && s.category !== categoryFilter) return false;
    if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;
    if (searchTerm) {
      const match =
        s.skuCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.barcode.includes(searchTerm) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const totalSKUs = skus.length;
  const coldCount = skus.filter(s => s.tempZone.includes('冷')).length;
  const warningCount = skus.filter(s => s.status === '临期警戒' || s.status === '低库存预警').length;

  const handleCreateSKU = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSKU.name) {
      alert('请填写商品名称');
      return;
    }

    const created: ProductSKU = {
      id: `sku-${Date.now()}`,
      skuCode: `SKU-0${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: newSKU.barcode || `690${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: newSKU.name,
      category: newSKU.category,
      spec: newSKU.spec || '标准包装',
      grossWeightKg: Number(newSKU.grossWeightKg),
      tempZone: newSKU.tempZone,
      shelfLifeDays: Number(newSKU.shelfLifeDays),
      remainingDays: Number(newSKU.shelfLifeDays),
      minSafetyStock: Number(newSKU.minSafetyStock),
      maxSafetyStock: Number(newSKU.maxSafetyStock),
      currentStock: Number(newSKU.currentStock),
      lockedStock: 0,
      availableStock: Number(newSKU.currentStock),
      status: '正常流通',
    };

    setSkus([created, ...skus]);
    setIsCreateOpen(false);
    addLiveLog({
      type: 'warehouse',
      level: 'success',
      text: `新SKU【${created.name}】(${created.skuCode}) 主档案建档成功，温层要求：${created.tempZone}`,
      park: '所有园区',
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                商品中心 (Master Product Catalog)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                统一物料主档案
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              维护全网SKU编码、69国际条形码、温区储位匹配、保质期监控及高低水位动态安全线
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#07c160] hover:bg-[#06a953] text-white rounded-xl text-xs font-medium shadow-xs shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            新建SKU档案
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">在册有效SKU</span>
          <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{totalSKUs} 种</div>
          <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 条形码合规率 100%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">冷链温控品类</span>
          <div className="text-2xl font-bold font-mono text-teal-600 mt-1">{coldCount} 种</div>
          <div className="text-[10px] text-teal-600 mt-1">涵盖深冷/冷冻/冷藏</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">临期与低库存预警</span>
          <div className={`text-2xl font-bold font-mono mt-1 ${warningCount > 0 ? 'text-amber-600' : 'text-slate-800'}`}>
            {warningCount} 种
          </div>
          <div className="text-[10px] text-amber-600 mt-1">已触发补货与折价规则</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">全网在库总实物量</span>
          <div className="text-2xl font-bold font-mono text-purple-600 mt-1">
            {skus.reduce((s, item) => s + item.currentStock, 0).toLocaleString()} 件
          </div>
          <div className="text-[10px] text-slate-400 mt-1">支持全网跨仓调拨</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] shadow-2xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-3.5 bg-slate-50/20 dark:bg-[#1e1f20] border-b border-slate-100 dark:border-[#282a2c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-emerald-500 dark:text-emerald-400" />
              <input
                type="text"
                placeholder="搜索SKU编码、条码、品名..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8.5 pr-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-800 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] w-56 transition-colors"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-700 dark:text-[#e3e3e3] cursor-pointer transition-colors"
            >
              <option value="ALL">全部品类</option>
              <option value="生鲜果品">生鲜果品</option>
              <option value="冷冻肉禽">冷冻肉禽</option>
              <option value="常温粮油">常温粮油</option>
              <option value="恒温中药">恒温中药</option>
              <option value="冷藏乳饮">冷藏乳饮</option>
            </select>
          </div>

          <button
            onClick={() => {
              const csv = 'SKU,条码,品名,分类,温区,当前库存,可用库存,状态\n' + skus.map(s => `${s.skuCode},${s.barcode},${s.name},${s.category},${s.tempZone},${s.currentStock},${s.availableStock},${s.status}`).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `SKU_Catalog_${Date.now()}.csv`;
              link.click();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-[#3c4043] text-slate-600 dark:text-[#c4c7c5] hover:bg-slate-50 dark:hover:bg-[#282a2c] rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            导出SKU台账
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-200/70">
                <th className="py-3 px-4">SKU 编码</th>
                <th className="py-3 px-3">商品品名与规格</th>
                <th className="py-3 px-3">条形码</th>
                <th className="py-3 px-3">品类温区要求</th>
                <th className="py-3 px-3 text-right">保质期 / 剩余天数</th>
                <th className="py-3 px-3 text-right">在库总量</th>
                <th className="py-3 px-3 text-right">可用库存</th>
                <th className="py-3 px-3 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSkus.map(item => (
                <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-700">
                    {item.skuCode}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.spec} · 单重 {item.grossWeightKg}kg</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {item.barcode}
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-800 font-medium">{item.category}</div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.tempZone}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <div className="font-semibold text-slate-800">{item.remainingDays} / {item.shelfLifeDays}天</div>
                    {item.remainingDays <= 15 && (
                      <span className="text-[10px] text-rose-600 bg-rose-50 px-1 rounded">临期预警</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                    {item.currentStock.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-teal-600">
                    {item.availableStock.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        item.status === '正常流通'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.status === '临期警戒'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : item.status === '低库存预警'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create SKU Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <h3 className="font-semibold text-slate-800 text-sm">新建SKU物料主档案</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSKU} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">商品全称 *</label>
                <input
                  type="text"
                  required
                  placeholder="如：赣南早熟蜜桔 (5kg特级装)"
                  value={newSKU.name}
                  onChange={e => setNewSKU({ ...newSKU, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">商品品类</label>
                  <select
                    value={newSKU.category}
                    onChange={e => setNewSKU({ ...newSKU, category: e.target.value as ProductSKU['category'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="生鲜果品">生鲜果品</option>
                    <option value="冷冻肉禽">冷冻肉禽</option>
                    <option value="常温粮油">常温粮油</option>
                    <option value="恒温中药">恒温中药</option>
                    <option value="冷藏乳饮">冷藏乳饮</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">储运温区要求</label>
                  <select
                    value={newSKU.tempZone}
                    onChange={e => setNewSKU({ ...newSKU, tempZone: e.target.value as ProductSKU['tempZone'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="冷藏(2~6℃)">冷藏(2~6℃)</option>
                    <option value="冷冻(-18℃)">冷冻(-18℃)</option>
                    <option value="深冷(-25℃)">深冷(-25℃)</option>
                    <option value="恒温(15~20℃)">恒温(15~20℃)</option>
                    <option value="常温干仓">常温干仓</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">保质期 (天)</label>
                  <input
                    type="number"
                    value={newSKU.shelfLifeDays}
                    onChange={e => setNewSKU({ ...newSKU, shelfLifeDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">单品毛重 (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newSKU.grossWeightKg}
                    onChange={e => setNewSKU({ ...newSKU, grossWeightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">初始在库量</label>
                  <input
                    type="number"
                    value={newSKU.currentStock}
                    onChange={e => setNewSKU({ ...newSKU, currentStock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#07c160] hover:bg-[#06a953] text-white rounded-xl font-medium shadow-xs shadow-emerald-500/20"
                >
                  确认录入SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
