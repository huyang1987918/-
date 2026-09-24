import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Filter,
  DollarSign,
  FileCheck2,
  Calendar,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Settings2,
  Sliders,
  ChevronRight,
  CreditCard,
  Building2,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BillRecord {
  id: string;
  billNo: string;
  customerName: string;
  park: string;
  warehouseName: string;
  feeType: '冷库租赁费' | '干仓包月费' | '冷链干线运费' | '出入库操作装卸' | '自动化立体库托位费';
  period: string;
  amount: number;
  discountAmount: number;
  payableAmount: number;
  status: '待审核出账' | '已确认待付款' | '已核销结清' | '对账异常争议';
  createTime: string;
}

const INITIAL_BILLS: BillRecord[] = [
  {
    id: 'bms-1',
    billNo: 'BMS-INV-2026-0901',
    customerName: '江西供销现代物流有限公司',
    park: '江西供销产业园',
    warehouseName: '冷库A',
    feeType: '冷库租赁费',
    period: '2026年09月上旬',
    amount: 135000.0,
    discountAmount: 6550.0,
    payableAmount: 128450.0,
    status: '已核销结清',
    createTime: '2026-09-19 23:30:10',
  },
  {
    id: 'bms-2',
    billNo: 'BMS-INV-2026-0902',
    customerName: '赣州冷链智能供应链合伙企业',
    park: '赣州冷链产业园',
    warehouseName: '赣州5号自动化立体库',
    feeType: '自动化立体库托位费',
    period: '2026年09月上旬',
    amount: 92000.0,
    discountAmount: 5080.0,
    payableAmount: 86920.0,
    status: '已确认待付款',
    createTime: '2026-09-19 21:18:22',
  },
  {
    id: 'bms-3',
    billNo: 'BMS-INV-2026-0903',
    customerName: '萍乡干线城配联营车队',
    park: '萍乡现代物流港',
    warehouseName: '8#常温配运库',
    feeType: '冷链干线运费',
    period: '2026年09月01日~15日',
    amount: 47200.0,
    discountAmount: 2000.0,
    payableAmount: 45200.0,
    status: '已核销结清',
    createTime: '2026-09-19 20:05:14',
  },
  {
    id: 'bms-4',
    billNo: 'BMS-INV-2026-0904',
    customerName: '九江高校后勤集采集配处',
    park: '九江共青城产业园',
    warehouseName: '九江云仓集配中心',
    feeType: '出入库操作装卸',
    period: '2026年09月10日~18日',
    amount: 21600.0,
    discountAmount: 0.0,
    payableAmount: 21600.0,
    status: '待审核出账',
    createTime: '2026-09-20 00:12:00',
  },
  {
    id: 'bms-5',
    billNo: 'BMS-INV-2026-0905',
    customerName: '华东冷链生鲜商超直供',
    park: '江西供销产业园',
    warehouseName: '冷库C',
    feeType: '冷库租赁费',
    period: '2026年09月上旬',
    amount: 68400.0,
    discountAmount: 3200.0,
    payableAmount: 65200.0,
    status: '对账异常争议',
    createTime: '2026-09-18 16:45:00',
  },
  {
    id: 'bms-6',
    billNo: 'BMS-INV-2026-0906',
    customerName: '顺丰冷运供应链服务部',
    park: '赣州冷链产业园',
    warehouseName: '赣州5号自动化立体库',
    feeType: '冷链干线运费',
    period: '2026年09月01日~15日',
    amount: 58900.0,
    discountAmount: 1500.0,
    payableAmount: 57400.0,
    status: '已确认待付款',
    createTime: '2026-09-19 14:20:00',
  },
];

export const SettlementCenterView: React.FC = () => {
  const { selectedPark, addLiveLog, hasPermission, subSidebarItem } = useApp();
  const [activeTab, setActiveTab] = useState<'lease' | 'freight' | 'rules' | 'invoices'>('lease');

  React.useEffect(() => {
    if (subSidebarItem === 'billing_summary') setActiveTab('lease');
    else if (subSidebarItem === 'freight_check') setActiveTab('freight');
    else if (subSidebarItem === 'billing_rules') setActiveTab('rules');
  }, [subSidebarItem]);
  const [bills, setBills] = useState<BillRecord[]>(INITIAL_BILLS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Rule settings state
  const [ruleRates, setRuleRates] = useState({
    coldStoragePerM3: 2.2,
    dryStoragePerM2: 0.8,
    agvPalletPerDay: 3.5,
    handlingPerPallet: 15.0,
    tempDeviationPenaltyRate: 5.0,
  });

  const canAudit = hasPermission('billing:audit');

  // Filter bills
  const filteredBills = bills.filter(b => {
    if (selectedPark !== '所有园区' && b.park !== selectedPark) return false;
    if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
    if (activeTab === 'freight' && !b.feeType.includes('运费')) return false;
    if (activeTab === 'lease' && b.feeType.includes('运费')) return false;
    if (searchTerm) {
      const match =
        b.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.feeType.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  // KPI calculations
  const totalPayable = bills.reduce((sum, b) => sum + b.payableAmount, 0);
  const settledTotal = bills.filter(b => b.status === '已核销结清').reduce((s, b) => s + b.payableAmount, 0);
  const pendingAuditCount = bills.filter(b => b.status === '待审核出账').length;
  const disputeCount = bills.filter(b => b.status === '对账异常争议').length;

  // Approve bill action
  const handleApproveBill = (id: string) => {
    setBills(prev =>
      prev.map(b => (b.id === id ? { ...b, status: '已确认待付款' } : b))
    );
    addLiveLog({
      type: 'billing',
      level: 'success',
      text: `财务复核通过账单【${bills.find(b => b.id === id)?.billNo}】，已生成月结出账单并通知客户`,
      park: selectedPark,
    });
  };

  // Reconcile and settle action
  const handleSettleBill = (id: string) => {
    setBills(prev =>
      prev.map(b => (b.id === id ? { ...b, status: '已核销结清' } : b))
    );
    addLiveLog({
      type: 'billing',
      level: 'success',
      text: `账单【${bills.find(b => b.id === id)?.billNo}】款项已确认入账，系统自动完成销账`,
      park: selectedPark,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-300 flex items-center justify-center border border-purple-100 dark:border-purple-500/30">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                结算中心 (BMS - Billing Management System)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-500/30 rounded-full">
                自动化计费引擎
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              实现仓储租金、冷链干线运费、装卸作业费自动化计提、对账单批量生成与电子发票台账 · 园区：{selectedPark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              addLiveLog({
                type: 'billing',
                level: 'info',
                text: '结算中心已自动触发9月全网月结仓储与运输综合对账批处理作业',
                park: selectedPark,
              });
              alert('已批量运行计费引擎：完成 142 笔仓储运费汇总试算！');
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white rounded-xl text-xs font-medium shadow-xs shadow-purple-500/20 dark:shadow-purple-900/40 transition-all cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            一键批量出账结算
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">本期应收结算总额</span>
          <div className="text-2xl font-bold font-mono text-slate-800 mt-1">
            ¥{(totalPayable / 10000).toFixed(2)} 万
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-300 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 自动计费覆盖率 99.2%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">已确认核销金额</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            ¥{(settledTotal / 10000).toFixed(2)} 万
          </div>
          <div className="text-[10px] text-emerald-600 mt-1">
            回款核销率 {totalPayable > 0 ? Math.round((settledTotal / totalPayable) * 100) : 0}%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">待复核审核账单</span>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
            {pendingAuditCount} 笔
          </div>
          <div className="text-[10px] text-slate-400 mt-1">需要财务专员签章确认</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">对账异常争议</span>
          <div className={`text-2xl font-bold font-mono mt-1 ${disputeCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {disputeCount} 笔
          </div>
          <div className="text-[10px] text-rose-500 mt-1">
            {disputeCount > 0 ? '温区系数与时长需校对' : '全部账单无争议'}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] shadow-2xs overflow-hidden">
        {/* Sub Nav Tabs */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-[#282a2c] flex items-center justify-between bg-slate-50/40 dark:bg-[#18191b]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('lease')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'lease'
                  ? 'border-purple-600 text-purple-700 bg-white dark:border-purple-400 dark:text-purple-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              仓储计费汇总与账单 ({bills.length})
            </button>
            <button
              onClick={() => setActiveTab('freight')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'freight'
                  ? 'border-purple-600 text-purple-700 bg-white dark:border-purple-400 dark:text-purple-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              冷链干线运费对账 (8 车次)
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'border-purple-600 text-purple-700 bg-white dark:border-purple-400 dark:text-purple-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              自动化计费规则引擎
            </button>
          </div>

          <span className="text-[11px] text-slate-400 dark:text-[#80868b]">
            财务会计周期: 自然月按旬对账
          </span>
        </div>

        {/* Toolbar */}
        <div className="p-3.5 bg-slate-50/20 dark:bg-[#1e1f20] border-b border-slate-100 dark:border-[#282a2c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-500 dark:text-purple-400" />
              <input
                type="text"
                placeholder="搜索账单号、客户、计费项目..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8.5 pr-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 text-slate-800 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] w-56 transition-colors"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 text-slate-700 dark:text-[#e3e3e3] cursor-pointer transition-colors"
            >
              <option value="ALL">全部核销状态</option>
              <option value="已核销结清">已核销结清</option>
              <option value="已确认待付款">已确认待付款</option>
              <option value="待审核出账">待审核出账</option>
              <option value="对账异常争议">对账异常争议</option>
            </select>
          </div>

          <button
            onClick={() => {
              const csv = '账单号,客户,项目,周期,应收金额,状态\n' + bills.map(b => `${b.billNo},${b.customerName},${b.feeType},${b.period},${b.payableAmount},${b.status}`).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `BMS_Billing_${Date.now()}.csv`;
              link.click();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            导出对账明细报表
          </button>
        </div>

        {/* Tab 1: Billing List */}
        {activeTab === 'lease' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-200/70">
                  <th className="py-3 px-4">账单凭证号</th>
                  <th className="py-3 px-3">结算客户单位</th>
                  <th className="py-3 px-3">归属园区 / 设施</th>
                  <th className="py-3 px-3">计费科目类别</th>
                  <th className="py-3 px-3">计费账期</th>
                  <th className="py-3 px-3 text-right">优惠减免</th>
                  <th className="py-3 px-3 text-right">应收金额 (元)</th>
                  <th className="py-3 px-3 text-center">状态</th>
                  <th className="py-3 px-4 text-center">审核核销</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBills.map(item => (
                  <tr key={item.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-purple-600 dark:text-purple-300">
                      {item.billNo}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {item.customerName}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-800">{item.park}</div>
                      <div className="text-[11px] text-slate-400">{item.warehouseName}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[10px] font-medium border border-purple-100 dark:border-purple-500/30">
                        {item.feeType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {item.period}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      ¥{item.discountAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                      ¥{item.payableAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.status === '已核销结清'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === '已确认待付款'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === '待审核出账'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.status === '待审核出账' && canAudit && (
                          <button
                            onClick={() => handleApproveBill(item.id)}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white rounded-lg text-[11px] font-medium shadow-2xs cursor-pointer"
                          >
                            审核出账
                          </button>
                        )}
                        {item.status === '已确认待付款' && canAudit && (
                          <button
                            onClick={() => handleSettleBill(item.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-medium shadow-2xs cursor-pointer"
                          >
                            确认核销
                          </button>
                        )}
                        {item.status === '已核销结清' && (
                          <span className="text-slate-400 text-[11px] flex items-center gap-1 justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            已结清
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Billing Rules Configuration */}
        {activeTab === 'rules' && (
          <div className="p-6 space-y-5 text-xs">
            <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/50 p-4 rounded-2xl flex items-start gap-3">
              <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">BMS 智能计费规则矩阵与计提费率配置</h4>
                <p className="text-slate-500 mt-1">
                  系统每日凌晨自动抓取 WMS 在库容积、托盘周转量、冷库温湿度合规记录与 TMS 干线里程，根据以下计费模型自动计提账单：
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-3">
                <h5 className="font-semibold text-slate-800 text-xs">冷库与常温仓储基础费率</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">冷库容积计费 (元/m³/天):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={ruleRates.coldStoragePerM3}
                      onChange={e => setRuleRates({ ...ruleRates, coldStoragePerM3: Number(e.target.value) })}
                      className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-right font-mono font-bold text-[#07c160]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">干仓面积计费 (元/㎡/天):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={ruleRates.dryStoragePerM2}
                      onChange={e => setRuleRates({ ...ruleRates, dryStoragePerM2: Number(e.target.value) })}
                      className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-right font-mono font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-3">
                <h5 className="font-semibold text-slate-800 text-xs">自动化立体库与装卸操作费率</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">AGV立体库托盘日租 (元/托/天):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={ruleRates.agvPalletPerDay}
                      onChange={e => setRuleRates({ ...ruleRates, agvPalletPerDay: Number(e.target.value) })}
                      className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-right font-mono font-bold text-purple-600 dark:text-purple-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">入库/出库装卸费 (元/托盘):</span>
                    <input
                      type="number"
                      step="0.5"
                      value={ruleRates.handlingPerPallet}
                      onChange={e => setRuleRates({ ...ruleRates, handlingPerPallet: Number(e.target.value) })}
                      className="w-24 px-2 py-1 border border-slate-200 rounded-lg text-right font-mono font-bold text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => {
                  alert('计费规则已成功保存并立即生效至全网BMS引擎！');
                  addLiveLog({
                    type: 'billing',
                    level: 'success',
                    text: '财务主管更新了BMS计费规则参数（冷库与AGV立体库计费矩阵）',
                    park: selectedPark,
                  });
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white rounded-xl font-medium shadow-xs shadow-purple-500/20 dark:shadow-purple-900/40 cursor-pointer transition-all"
              >
                保存规则并试算当前账期
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
