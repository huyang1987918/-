import React, { useState } from 'react';
import {
  Building2,
  FileSpreadsheet,
  Users,
  Coins,
  Calendar,
  CheckCircle2,
  Clock,
  RotateCcw,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LeaseContract {
  id: string;
  contractNo: string;
  tenantName: string;
  industry: string;
  park: string;
  rentedAssets: string; // e.g. 1号冷库A区 (3,200㎡)
  areaSqm: number;
  monthlyRentWan: number;
  period: string;
  status: '正常履约' | '即将到期' | '待缴租金' | '退租审批';
}

export const MerchantLeaseView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'contracts' | 'assets' | 'tenants' | 'billing'>('contracts');
  const [searchKey, setSearchKey] = useState('');

  const contracts: LeaseContract[] = [
    {
      id: 'LSE-001',
      contractNo: 'CT-2025-0812',
      tenantName: '江西绿色农产品供应链集团有限公司',
      industry: '生鲜果蔬农特产',
      park: '江西供销产业园',
      rentedAssets: '1号智能冷库A区 (全温控)',
      areaSqm: 4500,
      monthlyRentWan: 18.5,
      period: '2025.01 - 2027.12',
      status: '正常履约',
    },
    {
      id: 'LSE-002',
      contractNo: 'CT-2025-0813',
      tenantName: '赣州冷链国际智能电商合伙企业',
      industry: '跨境电商冷链',
      park: '赣州冷链产业园',
      rentedAssets: '自动化立体库B-02区',
      areaSqm: 6200,
      monthlyRentWan: 26.8,
      period: '2025.03 - 2028.02',
      status: '正常履约',
    },
    {
      id: 'LSE-003',
      contractNo: 'CT-2025-0814',
      tenantName: '江西省供销农批冷链储运车队',
      industry: '干线物流车队',
      park: '萍乡现代物流港',
      rentedAssets: '干线常温分拨仓C1 + 8个专属月台',
      areaSqm: 3800,
      monthlyRentWan: 12.2,
      period: '2024.10 - 2026.10',
      status: '即将到期',
    },
    {
      id: 'LSE-004',
      contractNo: 'CT-2025-0815',
      tenantName: '九江生态粮油储备运营公司',
      industry: '粮油大宗储备',
      park: '九江共青城产业园',
      rentedAssets: '保税恒温恒湿仓D区',
      areaSqm: 5000,
      monthlyRentWan: 16.0,
      period: '2025.06 - 2027.05',
      status: '正常履约',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <Building2 className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">招商租赁与资产运营中心</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                租约全生命周期
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              全网仓储设施档口出租管理、企业入驻资质审核、租约合同生命周期与租金自动出账催缴
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新园区出租率与租约合同统计')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>刷新租约</span>
          </button>
          <button
            onClick={() => alert('已打开新建入驻企业签约与租约合同录入界面')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新签租约合同</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">全网综合出租率</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">92.4%</span>
            <span className="text-xs text-slate-400">高满租</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>环比提升 +2.6%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">本月租金收益核算</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Coins className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">¥386.4</span>
            <span className="text-xs text-slate-400">万元</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">租金收缴率 99.1%</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">在册入驻企业数</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">148</span>
            <span className="text-xs text-slate-400">家客商</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">生鲜冷链龙头集聚</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">待租与可招商面积</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-amber-600">1.85</span>
            <span className="text-xs text-slate-400">万 ㎡</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">主要为萍乡冷库扩建仓</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'contracts'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              在册租约合同清单
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'assets'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              房源与档口招商资产图
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'tenants'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              入驻商户信用档案
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索合同号、租户企业..."
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
                <th className="py-2.5 px-3">合同协议编号</th>
                <th className="py-2.5 px-3">承租客商企业名称</th>
                <th className="py-2.5 px-3">所属行业</th>
                <th className="py-2.5 px-3">所在园区</th>
                <th className="py-2.5 px-3">租赁物理标的</th>
                <th className="py-2.5 px-3 text-right">承租面积 (㎡)</th>
                <th className="py-2.5 px-3 text-right">月租金 (万元)</th>
                <th className="py-2.5 px-3">租赁有效期</th>
                <th className="py-2.5 px-3">履约状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contracts.map(item => (
                <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {item.contractNo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {item.tenantName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{item.industry}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{item.park}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.rentedAssets}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                    {item.areaSqm.toLocaleString()} ㎡
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-emerald-700">
                    ¥{item.monthlyRentWan} 万
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{item.period}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      item.status === '正常履约'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开合同【${item.contractNo}】电子凭证与租金台账`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      合同详情
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
