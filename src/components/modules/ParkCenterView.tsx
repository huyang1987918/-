import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  Layers,
  Thermometer,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Play,
  Pause,
  MapPin,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ParkDock {
  id: string;
  dockNo: string;
  parkName: string;
  status: '卸货中' | '装车配载' | '预约待入' | '空闲可用';
  assignedVehicle?: string;
  assignedOrder?: string;
  progress: number; // %
  durationMinutes: number;
  tempStatus: string;
}

const INITIAL_DOCKS: ParkDock[] = [
  { id: 'dk-1', dockNo: '月台 A-01', parkName: '江西供销产业园', status: '卸货中', assignedVehicle: '赣C·8921B', assignedOrder: 'ASN-20260920-01', progress: 75, durationMinutes: 35, tempStatus: '-18.5℃ (冷链锁闭对接)' },
  { id: 'dk-2', dockNo: '月台 A-02', parkName: '江西供销产业园', status: '装车配载', assignedVehicle: '赣A·9982D', assignedOrder: 'SO-20260920-8901', progress: 40, durationMinutes: 20, tempStatus: '2.4℃ (保鲜果蔬)' },
  { id: 'dk-3', dockNo: '月台 A-03', parkName: '江西供销产业园', status: '空闲可用', progress: 0, durationMinutes: 0, tempStatus: '常温月台 (就绪)' },
  { id: 'dk-4', dockNo: '月台 B-01', parkName: '赣州冷链产业园', status: '卸货中', assignedVehicle: '赣B·4429F', assignedOrder: 'ASN-20260920-02', progress: 85, durationMinutes: 48, tempStatus: '-25.0℃ (深冷浓缩原浆)' },
  { id: 'dk-5', dockNo: '月台 B-02', parkName: '赣州冷链产业园', status: '预约待入', assignedVehicle: '粤B·7721C', assignedOrder: 'SO-20260920-8903', progress: 0, durationMinutes: 0, tempStatus: '排队进入卡口中' },
  { id: 'dk-6', dockNo: '月台 B-03', parkName: '赣州冷链产业园', status: '空闲可用', progress: 0, durationMinutes: 0, tempStatus: '冷库闭气式气封 (就绪)' },
  { id: 'dk-7', dockNo: '月台 C-01', parkName: '萍乡现代物流港', status: '装车配载', assignedVehicle: '赣J·1209B', assignedOrder: 'SO-20260920-8905', progress: 60, durationMinutes: 30, tempStatus: '-14.8℃ (调温中)' },
  { id: 'dk-8', dockNo: '月台 C-02', parkName: '萍乡现代物流港', status: '空闲可用', progress: 0, durationMinutes: 0, tempStatus: '干线双向月台 (就绪)' },
];

interface GateRecord {
  id: string;
  time: string;
  plate: string;
  direction: '入园' | '离园';
  driver: string;
  park: string;
  purpose: string;
  assignedDock: string;
}

const INITIAL_GATE_RECORDS: GateRecord[] = [
  { id: 'gt-1', time: '01:04:12', plate: '赣C·8921B', direction: '入园', driver: '王建国', park: '江西供销产业园', purpose: '冷冻肉禽入库验收', assignedDock: '月台 A-01' },
  { id: 'gt-2', time: '00:58:30', plate: '赣B·4429F', direction: '入园', driver: '刘强', park: '赣州冷链产业园', purpose: '保鲜果蔬分拣装车', assignedDock: '月台 B-01' },
  { id: 'gt-3', time: '00:45:10', plate: '赣G·5510A', direction: '离园', driver: '陈立新', park: '九江共青城产业园', purpose: '城配妥投发车', assignedDock: '已放行' },
  { id: 'gt-4', time: '00:32:44', plate: '赣A·9982D', direction: '入园', driver: '徐勇', park: '流程园区', purpose: '优质干粮调拨出库', assignedDock: '月台 A-02' },
];

export const ParkCenterView: React.FC = () => {
  const { selectedPark, setSelectedPark, addLiveLog, subSidebarItem } = useApp();
  const [activeTab, setActiveTab] = useState<'parks' | 'docks' | 'gate'>('parks');

  React.useEffect(() => {
    if (subSidebarItem === 'park_overview') setActiveTab('parks');
    else if (subSidebarItem === 'dock_schedule') setActiveTab('docks');
    else if (subSidebarItem === 'gate_monitor') setActiveTab('gate');
  }, [subSidebarItem]);
  const [docks, setDocks] = useState<ParkDock[]>(INITIAL_DOCKS);
  const [gateRecords, setGateRecords] = useState<GateRecord[]>(INITIAL_GATE_RECORDS);

  const parkProfiles = [
    {
      name: '江西供销产业园',
      city: '南昌市/赣州市',
      areaMu: 420,
      whAreaM2: 182400,
      loadRate: 75.6,
      coldTemp: -19.4,
      chillers: 12,
      docksCount: 32,
      desc: '省属核心骨干枢纽，布局大型冷库群与常温现代化配运中心',
    },
    {
      name: '赣州冷链产业园',
      city: '赣州市经开区',
      areaMu: 260,
      whAreaM2: 103000,
      loadRate: 81.7,
      coldTemp: -22.1,
      chillers: 8,
      docksCount: 24,
      desc: '对接大湾区南向保税通道，建有赣州5号自动化高位立体库',
    },
    {
      name: '萍乡现代物流港',
      city: '萍乡市湘东区',
      areaMu: 180,
      whAreaM2: 47800,
      loadRate: 67.1,
      coldTemp: -16.8,
      chillers: 6,
      docksCount: 16,
      desc: '湘赣边区农资与生鲜中转集散港，覆盖武汉、长沙干线通道',
    },
    {
      name: '九江共青城产业园',
      city: '九江市共青城市',
      areaMu: 220,
      whAreaM2: 72800,
      loadRate: 80.9,
      coldTemp: -17.5,
      chillers: 5,
      docksCount: 18,
      desc: '环鄱阳湖生鲜冷链集配枢纽，支撑高校后勤集采集配',
    },
    {
      name: '流程园区',
      city: '海淀区流程测试示范点',
      areaMu: 90,
      whAreaM2: 19333,
      loadRate: 75.5,
      coldTemp: -18.2,
      chillers: 3,
      docksCount: 8,
      desc: '标准化测试示范园区，打通生鲜分选与数字化流程验证',
    },
  ];

  // Filter docks
  const filteredDocks = docks.filter(d =>
    selectedPark === '所有园区' ? true : d.parkName === selectedPark
  );

  const filteredGates = gateRecords.filter(g =>
    selectedPark === '所有园区' ? true : g.park === selectedPark
  );

  const handleFreeDock = (dockId: string) => {
    setDocks(prev =>
      prev.map(d =>
        d.id === dockId
          ? { ...d, status: '空闲可用', assignedVehicle: undefined, assignedOrder: undefined, progress: 0, durationMinutes: 0 }
          : d
      )
    );
    addLiveLog({
      type: 'warehouse',
      level: 'info',
      text: `月台【${docks.find(d => d.id === dockId)?.dockNo}】已完成作业，释放为空闲状态`,
      park: selectedPark,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                园区中心 (Logistics Park Infrastructure Network)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                园区设施数字孪生
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              全景监测各园区仓储资产、装卸月台自动化导引、制冷机组负荷及智能道闸车牌识别 · 范围：{selectedPark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            接入园区: <span className="font-bold text-slate-800 font-mono">7 个</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] shadow-2xs overflow-hidden">
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-[#282a2c] flex items-center justify-between bg-slate-50/40 dark:bg-[#18191b]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('parks')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'parks'
                  ? 'border-[#07c160] text-emerald-700 bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              园区总览与资产地图
            </button>
            <button
              onClick={() => setActiveTab('docks')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'docks'
                  ? 'border-[#07c160] text-emerald-700 bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              智能化装卸月台排程 ({filteredDocks.length})
            </button>
            <button
              onClick={() => setActiveTab('gate')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'gate'
                  ? 'border-[#07c160] text-emerald-700 bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              智能道闸与车牌识别流
            </button>
          </div>
        </div>

        {/* Tab 1: Parks Overview Cards */}
        {activeTab === 'parks' && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkProfiles.map(item => (
              <div
                key={item.name}
                onClick={() => setSelectedPark(item.name)}
                className={`p-4.5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  selectedPark === item.name
                    ? 'border-[#07c160] bg-emerald-50/30 shadow-xs'
                    : 'border-slate-200/70 bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-xs">{item.name}</h4>
                      <span className="text-[11px] text-slate-400">{item.city}</span>
                    </div>
                  </div>
                  {selectedPark === item.name && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#07c160] text-white font-medium">
                      当前选中
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">{item.desc}</p>

                {/* Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>综合库容占用负荷</span>
                    <span className="font-mono font-bold text-slate-800">{item.loadRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.loadRate > 80 ? 'bg-amber-500' : 'bg-[#07c160]'
                      }`}
                      style={{ width: `${item.loadRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div>
                    占地: <span className="font-mono text-slate-800 font-semibold">{item.areaMu} 亩</span>
                  </div>
                  <div>
                    仓储: <span className="font-mono text-slate-800 font-semibold">{(item.whAreaM2 / 10000).toFixed(1)} 万㎡</span>
                  </div>
                  <div>
                    冷机温度: <span className="font-mono text-teal-600 font-semibold">{item.coldTemp}℃</span>
                  </div>
                  <div>
                    月台数量: <span className="font-mono text-slate-800 font-semibold">{item.docksCount} 个</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Smart Docks Radar */}
        {activeTab === 'docks' && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDocks.map(dock => (
              <div
                key={dock.id}
                className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">{dock.dockNo}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      dock.status === '卸货中'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : dock.status === '装车配载'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : dock.status === '预约待入'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {dock.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>所属园区: <span className="text-slate-700 font-medium">{dock.parkName}</span></div>
                  <div>
                    对接车辆: <span className="font-mono font-bold text-slate-800">{dock.assignedVehicle || '暂无'}</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">{dock.tempStatus}</div>
                </div>

                {dock.status !== '空闲可用' && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>作业进度</span>
                      <span className="font-mono">{dock.progress}% ({dock.durationMinutes}分钟)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#07c160] h-full rounded-full" style={{ width: `${dock.progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  {dock.status !== '空闲可用' ? (
                    <button
                      onClick={() => handleFreeDock(dock.id)}
                      className="px-2.5 py-1 text-[11px] bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-pointer"
                    >
                      释放为空闲
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`已开启【${dock.dockNo}】自动导引，并向在途排队车辆发送靠桥就绪指令！`)}
                      className="px-2.5 py-1 text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 cursor-pointer"
                    >
                      呼叫车辆靠泊
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Gate ANPR Flow */}
        {activeTab === 'gate' && (
          <div className="p-5 space-y-3">
            <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden bg-white">
              {filteredGates.map(item => (
                <div key={item.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400 text-[11px]">{item.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.direction === '入园' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.direction}
                    </span>
                    <span className="font-mono font-bold text-slate-800 bg-slate-900 text-amber-300 px-2 py-0.5 rounded text-[11px]">
                      {item.plate}
                    </span>
                    <span className="text-slate-600 font-medium">司机: {item.driver}</span>
                    <span className="text-slate-400">· {item.park}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-[11px]">{item.purpose}</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
                      {item.assignedDock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
