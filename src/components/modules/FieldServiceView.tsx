import React, { useState } from 'react';
import {
  Truck,
  Scale,
  Navigation,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Search,
  ShieldCheck,
  Check,
  Cpu,
  Layers,
  Video,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DockBerth {
  id: string;
  dockNo: string;
  park: string;
  zone: '冷链A库月台' | '冷链B库月台' | '干仓C区月台' | '自动化生鲜月台';
  status: '正在装卸' | '空闲待入' | '已预约排队' | '保养检修';
  currentTruck?: string;
  driver?: string;
  goods?: string;
  taskType: '出库装车' | '入库卸货' | '越库转运';
  startTime?: string;
  progress?: number;
}

interface WeighbridgeRecord {
  id: string;
  ticketNo: string;
  plateNumber: string;
  goods: string;
  grossWeight: number; // 毛重 (吨)
  tareWeight: number;  // 皮重 (吨)
  netWeight: number;   // 净重 (吨)
  weighTime: string;
  infraredStatus: '正常合规' | '边缘越界预警';
  autoPass: boolean;
}

interface ForkliftTask {
  id: string;
  deviceType: '智能AGV' | '有人叉车';
  deviceCode: string;
  operator: string;
  targetZone: string;
  payload: string;
  status: '搬运执行中' | '空闲待命' | '充电中';
  progress: number;
}

export const FieldServiceView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'dock' | 'weighbridge' | 'forklift'>('dock');
  const [searchKey, setSearchKey] = useState('');

  const [docks, setDocks] = useState<DockBerth[]>([
    {
      id: 'DOCK-A01',
      dockNo: 'A-01号冷链气密月台',
      park: '江西供销产业园',
      zone: '冷链A库月台',
      status: '正在装卸',
      currentTruck: '赣C·89211 (冷藏挂车)',
      driver: '李师傅 (138****0129)',
      goods: '赣南脐橙鲜果 1,200箱',
      taskType: '出库装车',
      startTime: '10:15',
      progress: 75,
    },
    {
      id: 'DOCK-A02',
      dockNo: 'A-02号冷链气密月台',
      park: '江西供销产业园',
      zone: '冷链A库月台',
      status: '空闲待入',
      taskType: '出库装车',
    },
    {
      id: 'DOCK-A03',
      dockNo: 'A-03号温控升降月台',
      park: '江西供销产业园',
      zone: '冷链B库月台',
      status: '已预约排队',
      currentTruck: '粤B·99824 (厢式冷藏车)',
      driver: '张师傅 (139****4421)',
      goods: '冷冻调理禽肉 800箱',
      taskType: '入库卸货',
      startTime: '11:00 (预约)',
      progress: 0,
    },
    {
      id: 'DOCK-B01',
      dockNo: 'B-01号自动化快速月台',
      park: '赣州冷链产业园',
      zone: '自动化生鲜月台',
      status: '正在装卸',
      currentTruck: '赣B·3321A (重型箱车)',
      driver: '王师傅 (135****9901)',
      goods: '高山优质富硒大米 500包',
      taskType: '出库装车',
      startTime: '10:30',
      progress: 40,
    },
    {
      id: 'DOCK-C01',
      dockNo: 'C-01号大件干仓月台',
      park: '萍乡现代物流港',
      zone: '干仓C区月台',
      status: '空闲待入',
      taskType: '越库转运',
    },
    {
      id: 'DOCK-C02',
      dockNo: 'C-02号大件干仓月台',
      park: '萍乡现代物流港',
      zone: '干仓C区月台',
      status: '保养检修',
      taskType: '出库装车',
    },
  ]);

  const [weighRecords] = useState<WeighbridgeRecord[]>([
    {
      id: 'WB-01',
      ticketNo: 'WB20260923001',
      plateNumber: '赣C·8921B',
      goods: '赣南蜜桔 400箱',
      grossWeight: 31.5,
      tareWeight: 13.0,
      netWeight: 18.5,
      weighTime: '10:45:22',
      infraredStatus: '正常合规',
      autoPass: true,
    },
    {
      id: 'WB-02',
      ticketNo: 'WB20260923002',
      plateNumber: '赣B·4429F',
      goods: '脐橙原浆 120桶',
      grossWeight: 24.8,
      tareWeight: 12.0,
      netWeight: 12.8,
      weighTime: '11:12:05',
      infraredStatus: '正常合规',
      autoPass: true,
    },
    {
      id: 'WB-03',
      ticketNo: 'WB20260923003',
      plateNumber: '赣J·1209B',
      goods: '冷冻生鲜禽肉',
      grossWeight: 28.2,
      tareWeight: 11.5,
      netWeight: 16.7,
      weighTime: '11:30:40',
      infraredStatus: '正常合规',
      autoPass: true,
    },
  ]);

  const [forkliftTasks] = useState<ForkliftTask[]>([
    {
      id: 'FL-01',
      deviceType: '智能AGV',
      deviceCode: 'AGV-04 (潜伏顶升式)',
      operator: '自动导航调度',
      targetZone: '冷库A区-03通道-04货位',
      payload: '冷冻土鸡托盘 (1.2吨)',
      status: '搬运执行中',
      progress: 68,
    },
    {
      id: 'FL-02',
      deviceType: '有人叉车',
      deviceCode: 'FC-02 (3吨高位叉车)',
      operator: '张明 (工号 F08)',
      targetZone: '月台A-01 &rarr; 暂存集货区',
      payload: '赣南脐橙整托 40件',
      status: '搬运执行中',
      progress: 45,
    },
    {
      id: 'FL-03',
      deviceType: '智能AGV',
      deviceCode: 'AGV-07 (激光SLAM叉车)',
      operator: '自动导航调度',
      targetZone: '干仓C区-月台C-01',
      payload: '大米托盘 (1.5吨)',
      status: '空闲待命',
      progress: 100,
    },
  ]);

  const handleCallNext = (dockId: string) => {
    alert(`已向排队车牌发送进场道闸指引短信，分配月台：${dockId}`);
  };

  const filteredDocks = docks.filter(d => {
    if (!searchKey.trim()) return true;
    const q = searchKey.toLowerCase();
    return (
      d.dockNo.toLowerCase().includes(q) ||
      (d.currentTruck && d.currentTruck.toLowerCase().includes(q)) ||
      (d.driver && d.driver.toLowerCase().includes(q)) ||
      (d.goods && d.goods.toLowerCase().includes(q)) ||
      d.zone.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f0f2f5] dark:bg-[#131314] min-h-full">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-[#07c160] dark:text-[#4ade80] flex items-center justify-center border border-emerald-100/80 dark:border-emerald-500/30 shadow-xs">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 dark:text-[#f1f3f4] tracking-tight">园区现场服务与装卸调度</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-500/30">
                月台/地磅/过闸联动
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#9aa0a6] mt-0.5">
              实现集装箱及干线重卡入园预约、智能月台气密泊位自动指引、无人值守地磅称重与现场叉车协同
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新现场月台与地磅最新状态')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#3c4043] text-slate-600 dark:text-[#c4c7c5] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#282a2c] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>刷新泊位</span>
          </button>
          <button
            onClick={() => alert('已触发智能月台快速叫号呼叫')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>广播叫号进场</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-[#9aa0a6]">
            <span className="text-xs font-medium">当前在用装卸月台</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] flex items-center justify-center">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800 dark:text-[#f1f3f4]">42</span>
            <span className="text-xs text-slate-400 dark:text-[#80868b]">/ 56 个</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 dark:text-[#4ade80] font-medium">使用率 75.0% · 运行平稳</div>
        </div>

        <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-[#9aa0a6]">
            <span className="text-xs font-medium">今日地磅过磅重卡</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Scale className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400">318</span>
            <span className="text-xs text-slate-400 dark:text-[#80868b]">车次</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 dark:text-[#80868b]">无人值守红外防作弊</div>
        </div>

        <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-[#9aa0a6]">
            <span className="text-xs font-medium">平均装卸泊位耗时</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400">38.5</span>
            <span className="text-xs text-slate-400 dark:text-[#80868b]">分钟/车</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 dark:text-[#4ade80] font-medium">较传统提速 32%</div>
        </div>

        <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-[#9aa0a6]">
            <span className="text-xs font-medium">预约进园履约率</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160] dark:text-[#4ade80]">99.2%</span>
            <span className="text-xs text-slate-400 dark:text-[#80868b]">按时到达</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 dark:text-[#4ade80] font-medium">免排队绿色通道</div>
        </div>
      </div>

      {/* Tabs and Docks Grid */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-4 shadow-2xs space-y-4">
        {/* Navigation Tabs and Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#282a2c]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('dock')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'dock'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-[#9aa0a6] hover:bg-slate-100/70 dark:hover:bg-[#282a2c] dark:hover:text-[#f1f3f4]'
              }`}
            >
              月台与泊位实时看板
            </button>
            <button
              onClick={() => setActiveTab('weighbridge')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'weighbridge'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-[#9aa0a6] hover:bg-slate-100/70 dark:hover:bg-[#282a2c] dark:hover:text-[#f1f3f4]'
              }`}
            >
              无人值守智能地磅流水
            </button>
            <button
              onClick={() => setActiveTab('forklift')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'forklift'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-[#9aa0a6] hover:bg-slate-100/70 dark:hover:bg-[#282a2c] dark:hover:text-[#f1f3f4]'
              }`}
            >
              场内叉车与AGV派工
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-emerald-500 dark:text-emerald-400" />
              <input
                type="text"
                placeholder="搜索车牌、泊位编号..."
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                className="w-56 pl-8.5 pr-3 py-1.5 bg-slate-50 dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:border-emerald-500 dark:focus:border-[#4ade80] text-slate-800 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Dock Cards Grid */}
        {activeTab === 'dock' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredDocks.map(dock => (
              <div
                key={dock.id}
                className={`p-4 rounded-xl border transition-all ${
                  dock.status === '正在装卸'
                    ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-500/30 dark:bg-emerald-950/20'
                    : dock.status === '空闲待入'
                    ? 'border-teal-200 bg-teal-50/15 dark:border-teal-500/30 dark:bg-teal-950/20'
                    : dock.status === '已预约排队'
                    ? 'border-amber-200 bg-amber-50/20 dark:border-amber-500/30 dark:bg-amber-950/20'
                    : 'border-slate-200 bg-slate-50/40 dark:border-[#3c4043] dark:bg-[#18191b]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-slate-800 dark:text-[#f1f3f4] flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      dock.status === '正在装卸' ? 'bg-[#07c160] animate-pulse' : dock.status === '空闲待入' ? 'bg-teal-500' : 'bg-amber-400'
                    }`} />
                    {dock.dockNo}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                    dock.status === '正在装卸'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/15 dark:text-[#4ade80] dark:border-emerald-500/30'
                      : dock.status === '空闲待入'
                      ? 'bg-teal-50 text-teal-700 border-teal-200/60 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30'
                      : dock.status === '已预约排队'
                      ? 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/15 dark:text-[#fbbf24] dark:border-amber-500/30'
                      : 'bg-slate-100 text-slate-500 border-slate-200/60 dark:bg-[#282a2c] dark:text-[#9aa0a6] dark:border-[#3c4043]'
                  }`}>
                    {dock.status}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 text-slate-600 dark:text-[#c4c7c5] mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-[#80868b]">所属区域：</span>
                    <span className="font-medium text-slate-700 dark:text-[#e3e3e3]">{dock.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-[#80868b]">作业属性：</span>
                    <span className="font-medium text-slate-700 dark:text-[#e3e3e3]">{dock.taskType}</span>
                  </div>
                  {dock.currentTruck && (
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-[#80868b]">占用车牌：</span>
                      <span className="font-mono font-medium text-emerald-700 dark:text-[#4ade80]">{dock.currentTruck}</span>
                    </div>
                  )}
                  {dock.goods && (
                    <div className="flex justify-between">
                      <span className="text-slate-400 dark:text-[#80868b]">装卸货品：</span>
                      <span className="truncate max-w-[160px] text-slate-800 dark:text-[#f1f3f4]">{dock.goods}</span>
                    </div>
                  )}
                </div>

                {dock.status === '正在装卸' && dock.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#80868b] mb-1">
                      <span>作业进度</span>
                      <span className="font-mono font-semibold">{dock.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-[#282a2c] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#07c160] rounded-full transition-all"
                        style={{ width: `${dock.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-[#282a2c] flex items-center justify-between">
                  <button
                    onClick={() => alert(`查看月台【${dock.dockNo}】现场高清摄像头画面`)}
                    className="text-[11px] text-emerald-700 dark:text-[#4ade80] hover:underline font-medium cursor-pointer flex items-center gap-1"
                  >
                    <Video className="w-3 h-3" />
                    视频巡查
                  </button>
                  {dock.status === '空闲待入' && (
                    <button
                      onClick={() => handleCallNext(dock.id)}
                      className="px-2.5 py-1 bg-[#07c160] hover:bg-[#06a953] text-white rounded-lg text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
                    >
                      呼叫排队车辆
                    </button>
                  )}
                  {dock.status === '正在装卸' && (
                    <button
                      onClick={() => alert(`已确认月台【${dock.dockNo}】作业完毕，正在打印出场放行单`)}
                      className="px-2.5 py-1 bg-white dark:bg-[#282a2c] border border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-[#4ade80] hover:bg-emerald-50 dark:hover:bg-emerald-500/15 rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
                    >
                      完成作业放行
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Weighbridge Stream */}
        {activeTab === 'weighbridge' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#18191b] text-slate-500 dark:text-[#9aa0a6] font-medium border-b border-slate-200/70 dark:border-[#282a2c]">
                  <th className="py-3 px-4">过磅单号</th>
                  <th className="py-3 px-3">车牌号码</th>
                  <th className="py-3 px-3">装载货品</th>
                  <th className="py-3 px-3">毛重 / 皮重 (吨)</th>
                  <th className="py-3 px-3">货物净重 (吨)</th>
                  <th className="py-3 px-3">过磅时间</th>
                  <th className="py-3 px-3 text-center">红外防作弊</th>
                  <th className="py-3 px-4 text-center">道闸放行</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#282a2c]">
                {weighRecords.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-[#282a2c]/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-800 dark:text-[#f1f3f4]">{item.ticketNo}</td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 bg-slate-900 dark:bg-[#131314] text-amber-300 dark:text-amber-400 rounded text-[11px] font-mono border border-slate-700 dark:border-[#3c4043]">
                        {item.plateNumber}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700 dark:text-[#e3e3e3]">{item.goods}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-[#c4c7c5]">
                      {item.grossWeight}t / {item.tareWeight}t
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700 dark:text-[#4ade80]">
                      {item.netWeight} 吨
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 dark:text-[#80868b]">{item.weighTime}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-500/30">
                        <Check className="w-2.5 h-2.5" />
                        {item.infraredStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30">
                        自动升杆放行
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Forklift and AGV Dispatch */}
        {activeTab === 'forklift' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {forkliftTasks.map(task => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-800 dark:text-[#f1f3f4] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    {task.deviceCode}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                    task.status === '搬运执行中'
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] border-emerald-200/60 dark:border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-[#282a2c] text-slate-500 dark:text-[#9aa0a6] border-slate-200 dark:border-[#3c4043]'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 text-slate-500 dark:text-[#9aa0a6]">
                  <div className="flex justify-between">
                    <span>调度主体：</span>
                    <span className="text-slate-800 dark:text-[#f1f3f4]">{task.operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>目标货位：</span>
                    <span className="font-mono text-slate-800 dark:text-[#f1f3f4]">{task.targetZone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>搬运托盘：</span>
                    <span className="text-slate-700 dark:text-[#e3e3e3]">{task.payload}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#80868b] mb-1">
                    <span>任务进度</span>
                    <span className="font-mono">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-[#282a2c] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
