import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Bell,
  Wrench,
  Camera,
  CheckCircle2,
  Clock,
  RotateCcw,
  Plus,
  Search,
  Filter,
  Users,
  AlertTriangle,
  Send,
  PhoneCall,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ServiceTicket {
  id: string;
  ticketNo: string;
  title: string;
  type: '安全巡检' | '设备报修' | '应急联动' | '客户诉求';
  priority: '特急' | '高' | '中' | '普通';
  location: string;
  applicant: string;
  assignee: string;
  status: '处理中' | '待指派' | '已闭环' | '复核通过';
  createdAt: string;
}

export const ServiceCollabView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'tickets' | 'gate' | 'inspection' | 'emergency'>('tickets');
  const [searchKey, setSearchKey] = useState('');

  const [tickets, setTickets] = useState<ServiceTicket[]>([
    {
      id: 'TKT-001',
      ticketNo: 'SRV-2026-0901',
      title: '冷库A-03气密门快速卷帘升降电机异响检修',
      type: '设备报修',
      priority: '高',
      location: '江西供销产业园 冷库A区月台',
      applicant: '生鲜仓储主管 (陈工)',
      assignee: '维保工程组 - 王工',
      status: '处理中',
      createdAt: '10:20',
    },
    {
      id: 'TKT-002',
      ticketNo: 'SRV-2026-0902',
      title: '主干道2号智能地磅传感器红外对射校准复验',
      type: '安全巡检',
      priority: '中',
      location: '江西供销产业园 进园主卡口',
      applicant: '地磅运营班长',
      assignee: '弱电维保组 - 赵工',
      status: '已闭环',
      createdAt: '09:15',
    },
    {
      id: 'TKT-003',
      ticketNo: 'SRV-2026-0903',
      title: '入驻果品商户档口水暖冷媒管道接驳报验',
      type: '客户诉求',
      priority: '普通',
      location: '赣州冷链基地 交易大厅12号',
      applicant: '赣南脐橙直采直供合伙企业',
      assignee: '客户服务中心 - 小李',
      status: '处理中',
      createdAt: '08:45',
    },
    {
      id: 'TKT-004',
      ticketNo: 'SRV-2026-0904',
      title: '高温暴雨天气园区雨污分流阀门与备用柴发巡检',
      type: '应急联动',
      priority: '特急',
      location: '全园区变配电与排涝泵站',
      applicant: '安全生产应急办',
      assignee: '应急值班全体人员',
      status: '复核通过',
      createdAt: '08:00',
    },
  ]);

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">服务协同与应急安防指挥</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                联防联动闭环
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              整合园区智能道闸车流联动、现场设施维保巡检派工、商户报修诉求与应急安全联动
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新服务协同工单与道闸安防实时流')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>刷新状态</span>
          </button>
          <button
            onClick={() => alert('已打开新建服务维保工单与现场派发窗口')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>发起协同工单</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">今日安防道闸车流</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">1,492</span>
            <span className="text-xs text-slate-400">辆次</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">车牌AI秒级自动识别放行</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">工单闭环完成率</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">98.4%</span>
            <span className="text-xs text-slate-400">高质完成</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">平均响应时效 12.5 分钟</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">在办维保巡检任务</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-amber-600">6</span>
            <span className="text-xs text-slate-400">单执行中</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">人员已全数到达现场</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">安全生产平稳天数</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">1,085</span>
            <span className="text-xs text-slate-400">天无重大事故</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">特级安全标杆园区</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'tickets'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              协同工单与维保派工池
            </button>
            <button
              onClick={() => setActiveTab('gate')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'gate'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              安防道闸车牌识别流水
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'emergency'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              应急预案与安全演练
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索工单标题、申请人..."
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
                <th className="py-2.5 px-3">工单流水号</th>
                <th className="py-2.5 px-3">协同任务事项</th>
                <th className="py-2.5 px-3">任务类型</th>
                <th className="py-2.5 px-3">优先级</th>
                <th className="py-2.5 px-3">现场发生位置</th>
                <th className="py-2.5 px-3">提报发起人</th>
                <th className="py-2.5 px-3">指派执行组</th>
                <th className="py-2.5 px-3">闭环状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map(tkt => (
                <tr key={tkt.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {tkt.ticketNo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800 max-w-sm truncate" title={tkt.title}>
                    {tkt.title}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {tkt.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      tkt.priority === '特急'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : tkt.priority === '高'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {tkt.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{tkt.location}</td>
                  <td className="py-2.5 px-3 text-slate-700">{tkt.applicant}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{tkt.assignee}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      tkt.status === '已闭环' || tkt.status === '复核通过'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : 'bg-sky-50 text-sky-700 border-sky-200/60'
                    }`}>
                      {tkt.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开工单【${tkt.ticketNo}】现场照片与处置详情记录`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      查看明细
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
