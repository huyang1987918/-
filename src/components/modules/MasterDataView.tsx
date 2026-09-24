import React, { useState } from 'react';
import {
  Database,
  Boxes,
  Users,
  Building2,
  Barcode,
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  Filter,
  Eye,
  Edit,
  Tag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MasterRecord {
  id: string;
  code: string;
  name: string;
  category: string;
  spec: string;
  unit: string;
  tempZone: string;
  ownerCompany: string;
  status: '启用' | '停用';
  updatedAt: string;
}

export const MasterDataView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'sku' | 'partners' | 'facilities' | 'rules'>('sku');
  const [searchKey, setSearchKey] = useState('');

  const records: MasterRecord[] = [
    {
      id: 'MD-01',
      code: 'SKU-001091',
      name: '赣南特级优质脐橙 (精装礼盒)',
      category: '生鲜水果',
      spec: '5kg/箱 (果径80-85mm)',
      unit: '箱',
      tempZone: '恒温保鲜 2~6℃',
      ownerCompany: '江西供销现代果业有限公司',
      status: '启用',
      updatedAt: '2026-09-20',
    },
    {
      id: 'MD-02',
      code: 'SKU-001092',
      name: '南丰生态贡桔 (特选家庭装)',
      category: '生鲜水果',
      spec: '10kg/箱',
      unit: '箱',
      tempZone: '恒温保鲜 2~6℃',
      ownerCompany: '江西省绿色农产品供应链集团',
      status: '启用',
      updatedAt: '2026-09-18',
    },
    {
      id: 'MD-03',
      code: 'SKU-002105',
      name: '鄱阳湖生态大闸蟹 (公4.0两 母3.0两)',
      category: '冷链水产',
      spec: '8只装礼盒 (活体生鲜)',
      unit: '盒',
      tempZone: '冷藏冷链 0~4℃',
      ownerCompany: '鄱阳湖生态渔业发展公司',
      status: '启用',
      updatedAt: '2026-09-21',
    },
    {
      id: 'MD-04',
      code: 'SKU-003012',
      name: '高山优质富硒富锌生态大米',
      category: '粮油副食',
      spec: '10kg/袋 (真空包装)',
      unit: '袋',
      tempZone: '常温干仓',
      ownerCompany: '江西农投粮油储备贸易集团',
      status: '启用',
      updatedAt: '2026-09-15',
    },
    {
      id: 'MD-05',
      code: 'SKU-004099',
      name: '井冈山野生红菇 (低温烘焙干燥)',
      category: '干货特产',
      spec: '250g/罐 (双层密封)',
      unit: '罐',
      tempZone: '常温避光仓',
      ownerCompany: '井冈山特色农林开发有限公司',
      status: '启用',
      updatedAt: '2026-09-12',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <Database className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">主数据管理中心 (MDM)</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                供应链全局基准
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              统一管理全省冷链果品、农特产SKU字典、客商与承运商主档案、园区仓房物理资产台账与编码规则
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已重新同步全渠道主数据与SKU条码库')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>同步主数据</span>
          </button>
          <button
            onClick={() => alert('已打开新增主数据物料/客商档案弹窗')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新增主数据档案</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">全域在册标准SKU</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">14,890</span>
            <span className="text-xs text-slate-400">种</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">条码合规率 100%</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">合作往来客商企业</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">624</span>
            <span className="text-xs text-slate-400">家</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">货主 / 承运商 / 供应商</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">仓房物理资产台账</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">86</span>
            <span className="text-xs text-slate-400">处设施</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">包含 34座智能冷库</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">统一编码规则字典</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Barcode className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">42</span>
            <span className="text-xs text-slate-400">套标准体系</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">国家农产品条码兼容</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('sku')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'sku'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              全域SKU物料字典
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              客商往来单位档案
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'facilities'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              物理仓房资产台账
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              编码与批次规则
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索SKU编码、品名、货主..."
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              className="w-52 pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/70 text-[11px]">
                <th className="py-2.5 px-3">物料主编码</th>
                <th className="py-2.5 px-3">商品品名</th>
                <th className="py-2.5 px-3">品类</th>
                <th className="py-2.5 px-3">规格包装</th>
                <th className="py-2.5 px-3">计量单位</th>
                <th className="py-2.5 px-3">仓储温区要求</th>
                <th className="py-2.5 px-3">归属货主企业</th>
                <th className="py-2.5 px-3">状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map(rec => (
                <tr key={rec.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {rec.code}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {rec.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{rec.category}</td>
                  <td className="py-2.5 px-3 text-slate-600">{rec.spec}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-mono">{rec.unit}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {rec.tempZone}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{rec.ownerCompany}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开SKU【${rec.name}】条码与物流参数详情`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      物料卡片
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
