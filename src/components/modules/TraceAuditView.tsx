import React, { useState } from 'react';
import {
  History,
  QrCode,
  ShieldCheck,
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertTriangle,
  ExternalLink,
  Lock,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TraceLog {
  id: string;
  traceCode: string;
  product: string;
  batchNo: string;
  park: string;
  temperatureChain: string;
  blockHash: string;
  timestamp: string;
  status: '全链存证合规' | '温控预警记录' | '溯源已核验';
}

export const TraceAuditView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'trace' | 'blockchain' | 'audit' | 'recall'>('trace');
  const [searchKey, setSearchKey] = useState('');
  const [selectedLog, setSelectedLog] = useState<TraceLog | null>(null);

  const logs: TraceLog[] = [
    {
      id: 'TRC-01',
      traceCode: '6901928091823901',
      product: '赣南特级优质脐橙 (一物一码追溯)',
      batchNo: 'BATCH-20260919-01',
      park: '江西供销产业园 冷库A区',
      temperatureChain: '全流程 2.8℃ ~ 4.2℃ (恒温)',
      blockHash: '0x8f2a99c4d1e2b4...3a9c',
      timestamp: '2026-09-22 10:15:32',
      status: '全链存证合规',
    },
    {
      id: 'TRC-02',
      traceCode: '6901928091823902',
      product: '鄱阳湖生态活体大闸蟹礼盒',
      batchNo: 'BATCH-20260920-04',
      park: '九江共青城冷链中转仓',
      temperatureChain: '全流程 1.5℃ ~ 3.5℃ (冷藏)',
      blockHash: '0x4c718a221f90ee...71b2',
      timestamp: '2026-09-22 09:42:10',
      status: '全链存证合规',
    },
    {
      id: 'TRC-03',
      traceCode: '6901928091823903',
      product: '绿色生态高山富硒大米 (真空装)',
      batchNo: 'BATCH-20260915-02',
      park: '萍乡现代物流港 自动化立库',
      temperatureChain: '常温避光恒湿 18.0℃',
      blockHash: '0x19a0bc78d55fa1...00ff',
      timestamp: '2026-09-22 08:30:19',
      status: '全链存证合规',
    },
    {
      id: 'TRC-04',
      traceCode: '6901928091823904',
      product: '冷冻调理禽肉深加工半成品',
      batchNo: 'BATCH-20260918-09',
      park: '赣州冷链国际物流港',
      temperatureChain: '冷冻 -18.4℃ ~ -19.1℃',
      blockHash: '0xdd41b092ac9182...fa43',
      timestamp: '2026-09-22 07:12:05',
      status: '全链存证合规',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <History className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">追溯审计与区块链存证中心</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                一物一码溯源
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              记录农特产品产地种植、冷链仓储温湿度IoT传感器数据、出入库操作审计与区块链不可篡改凭证
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已重新校验当前区块链节点存证哈希有效性')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>校验节点</span>
          </button>
          <button
            onClick={() => alert('已打开一物一码批量赋码与防伪标签生成工具')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>追溯码批量赋码</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">累计赋码溯源商品</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <QrCode className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">1,894.2</span>
            <span className="text-xs text-slate-400">万件</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">一物一码真实防伪</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">区块链存证区块高度</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">892,104</span>
            <span className="text-xs text-slate-400">高度</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">供销链区块链联盟链</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">温控存证防篡改通过率</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">100%</span>
            <span className="text-xs text-slate-400">真实可信</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">传感器硬件国密加密上链</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">安全审计高危拦截</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">0 违规</span>
            <span className="text-xs text-slate-400">合规安全</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">全操作行为日志存证</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('trace')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'trace'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              一物一码追溯流水池
            </button>
            <button
              onClick={() => setActiveTab('blockchain')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'blockchain'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              区块链温湿度存证节点
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              系统操作安全审计日志
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索追溯码、批次号、商品..."
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
                <th className="py-2.5 px-3">追溯防伪码</th>
                <th className="py-2.5 px-3">对应商品名</th>
                <th className="py-2.5 px-3">生产检验批次</th>
                <th className="py-2.5 px-3">归属仓储园区</th>
                <th className="py-2.5 px-3">全程温控存证</th>
                <th className="py-2.5 px-3">区块链存证哈希</th>
                <th className="py-2.5 px-3">上链时间戳</th>
                <th className="py-2.5 px-3">存证状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {log.traceCode}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{log.product}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{log.batchNo}</td>
                  <td className="py-2.5 px-3 text-slate-700">{log.park}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {log.temperatureChain}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                    {log.blockHash}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {log.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开追溯码【${log.traceCode}】的全程时间轴溯源报告 (包含产地采摘、初加工、冷链运输、入库抽检全链条记录)`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      溯源报告
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
