import React, { useState } from 'react';
import {
  Truck,
  Search,
  Filter,
  Activity,
  Thermometer,
  Gauge,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus,
  RefreshCw,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VehicleFleetItem {
  id: string;
  plateNumber: string;
  vehicleType: '13.7米半挂冷藏' | '9.6米重卡双温' | '4.2米城配冷藏' | '15米高栏干线';
  driverName: string;
  driverPhone: string;
  parkOrigin: string;
  destination: string;
  tempZone: string;
  currentTemp: number;
  targetTemp: number;
  speedKmH: number;
  loadRate: number; // %
  status: '干线在途' | '月台装载中' | '服务区停歇' | '末端配送' | '空车待调度';
  eta: string;
  routeProgress: number; // %
  abnormalTemp?: boolean;
}

const INITIAL_FLEET: VehicleFleetItem[] = [
  {
    id: 'tms-1',
    plateNumber: '赣C·8921B',
    vehicleType: '13.7米半挂冷藏',
    driverName: '王建国',
    driverPhone: '13911223344',
    parkOrigin: '江西供销产业园',
    destination: '上海普陀区西北物流园区',
    tempZone: '低温冷冻 (-18℃)',
    currentTemp: -18.6,
    targetTemp: -19.0,
    speedKmH: 84,
    loadRate: 94,
    status: '干线在途',
    eta: '今天 04:30',
    routeProgress: 68,
    abnormalTemp: false,
  },
  {
    id: 'tms-2',
    plateNumber: '赣B·4429F',
    vehicleType: '9.6米重卡双温',
    driverName: '刘强',
    driverPhone: '13877665544',
    parkOrigin: '赣州冷链产业园',
    destination: '广东省深圳市平湖物流中心',
    tempZone: '保鲜果蔬 (2~6℃)',
    currentTemp: 3.2,
    targetTemp: 4.0,
    speedKmH: 78,
    loadRate: 88,
    status: '干线在途',
    eta: '今天 03:15',
    routeProgress: 82,
    abnormalTemp: false,
  },
  {
    id: 'tms-3',
    plateNumber: '赣J·1209B',
    vehicleType: '13.7米半挂冷藏',
    driverName: '赵海峰',
    driverPhone: '13699887766',
    parkOrigin: '萍乡现代物流港',
    destination: '湖北省武汉市东西湖生鲜枢纽',
    tempZone: '低温冷冻 (-18℃)',
    currentTemp: -14.8,
    targetTemp: -18.0,
    speedKmH: 81,
    loadRate: 91,
    status: '干线在途',
    eta: '今天 05:40',
    routeProgress: 45,
    abnormalTemp: true, // triggers warning
  },
  {
    id: 'tms-4',
    plateNumber: '赣G·5510A',
    vehicleType: '4.2米城配冷藏',
    driverName: '陈立新',
    driverPhone: '13500112233',
    parkOrigin: '九江共青城产业园',
    destination: '九江市区各大商超专卖店',
    tempZone: '恒温奶制品 (2~8℃)',
    currentTemp: 4.5,
    targetTemp: 4.0,
    speedKmH: 42,
    loadRate: 85,
    status: '末端配送',
    eta: '今天 02:00',
    routeProgress: 90,
    abnormalTemp: false,
  },
  {
    id: 'tms-5',
    plateNumber: '赣A·9982D',
    vehicleType: '15米高栏干线',
    driverName: '徐勇',
    driverPhone: '13788990011',
    parkOrigin: '流程园区',
    destination: '湖南省长沙市高桥大市场',
    tempZone: '常温优质干货',
    currentTemp: 22.0,
    targetTemp: 22.0,
    speedKmH: 0,
    loadRate: 100,
    status: '月台装载中',
    eta: '预计 08:00',
    routeProgress: 10,
    abnormalTemp: false,
  },
  {
    id: 'tms-6',
    plateNumber: '赣B·3128C',
    vehicleType: '9.6米重卡双温',
    driverName: '黄明',
    driverPhone: '13966554433',
    parkOrigin: '赣州冷链产业园',
    destination: '待接单调度',
    tempZone: '多温区备用',
    currentTemp: -18.0,
    targetTemp: -18.0,
    speedKmH: 0,
    loadRate: 0,
    status: '空车待调度',
    eta: '待发车',
    routeProgress: 0,
    abnormalTemp: false,
  },
];

export const TransportCenterView: React.FC = () => {
  const { selectedPark, addLiveLog, subSidebarItem } = useApp();
  const [activeTab, setActiveTab] = useState<'fleet' | 'dispatch' | 'carriers'>('fleet');

  React.useEffect(() => {
    if (subSidebarItem === 'transport_monitor' || subSidebarItem === 'fleet_radar') {
      setActiveTab('fleet');
    } else if (subSidebarItem === 'dispatch_board') {
      setActiveTab('dispatch');
    } else if (subSidebarItem === 'carrier_score') {
      setActiveTab('carriers');
    }
  }, [subSidebarItem]);
  const [fleet, setFleet] = useState<VehicleFleetItem[]>(INITIAL_FLEET);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleFleetItem | null>(null);

  // Filter vehicles
  const filteredFleet = fleet.filter(item => {
    if (selectedPark !== '所有园区' && item.parkOrigin !== selectedPark) return false;
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (searchTerm) {
      const match =
        item.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  // KPI calculations
  const totalFleetCount = fleet.length;
  const inTransitCount = fleet.filter(f => f.status === '干线在途' || f.status === '末端配送').length;
  const avgLoadRate = Math.round(fleet.reduce((s, f) => s + f.loadRate, 0) / (fleet.length || 1));
  const tempAlertCount = fleet.filter(f => f.abnormalTemp).length;

  // Remote HVAC cooling trigger
  const handleRemoteCooling = (vId: string) => {
    setFleet(prev =>
      prev.map(v =>
        v.id === vId
          ? { ...v, currentTemp: v.targetTemp, abnormalTemp: false }
          : v
      )
    );

    addLiveLog({
      type: 'transport',
      level: 'success',
      text: `已向车辆【${selectedVehicle?.plateNumber || vId}】发送远程智能制冷机组增压指令，冷厢温度已恢复达标`,
      park: selectedVehicle?.parkOrigin || selectedPark,
    });

    if (selectedVehicle && selectedVehicle.id === vId) {
      setSelectedVehicle(prev => prev ? { ...prev, currentTemp: prev.targetTemp, abnormalTemp: false } : null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-300 flex items-center justify-center border border-teal-100 dark:border-teal-500/30">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                运输中心 (TMS - Transportation Management System)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-500/30 rounded-full">
                冷链干线车队
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              全国干线多式联运、实时北斗GPS轨迹、冷链机组温湿度传感器遥测与智能排线调度 · 范围：{selectedPark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dispatch')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl text-xs font-medium shadow-xs shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            新建排车调度单
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">全网在册车次</span>
          <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{totalFleetCount} 辆</div>
          <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 北斗定位 100% 在线
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">在途巡航运力</span>
          <div className="text-2xl font-bold font-mono text-[#07c160] mt-1">{inTransitCount} 辆</div>
          <div className="text-[10px] text-slate-400 mt-1">时速平均 76.5 km/h</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">车厢平均装载率</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">{avgLoadRate}%</div>
          <div className="text-[10px] text-emerald-600 mt-1">智能配载容积优化</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs">
          <span className="text-slate-400 text-[11px]">冷链温控异常警报</span>
          <div className={`text-2xl font-bold font-mono mt-1 ${tempAlertCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {tempAlertCount} 辆
          </div>
          <div className="text-[10px] text-rose-500 mt-1">
            {tempAlertCount > 0 ? '需远程增压降温' : '所有冷机温度正常'}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] shadow-2xs overflow-hidden">
        {/* Sub Nav Tabs */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-[#282a2c] flex items-center justify-between bg-slate-50/40 dark:bg-[#18191b]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'fleet'
                  ? 'border-teal-600 text-teal-700 bg-white dark:border-teal-400 dark:text-teal-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              在途车辆与冷链温控遥测 ({fleet.length})
            </button>
            <button
              onClick={() => setActiveTab('dispatch')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'dispatch'
                  ? 'border-teal-600 text-teal-700 bg-white dark:border-teal-400 dark:text-teal-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              智能配载与智能派车池
            </button>
            <button
              onClick={() => setActiveTab('carriers')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'carriers'
                  ? 'border-teal-600 text-teal-700 bg-white dark:border-teal-400 dark:text-teal-300 dark:bg-[#1e1f20]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              承运商综合评分考核
            </button>
          </div>

          <span className="text-[11px] text-slate-400 dark:text-[#80868b]">
            高频刷新周期: 10秒/次
          </span>
        </div>

        {/* Toolbar */}
        <div className="p-3.5 bg-slate-50/20 dark:bg-[#1e1f20] border-b border-slate-100 dark:border-[#282a2c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-teal-500 dark:text-teal-400" />
              <input
                type="text"
                placeholder="搜索车牌、司机、目的地..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8.5 pr-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 text-slate-800 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] w-56 transition-colors"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 text-slate-700 dark:text-[#e3e3e3] cursor-pointer transition-colors"
            >
              <option value="ALL">全部运行状态</option>
              <option value="干线在途">干线在途</option>
              <option value="月台装载中">月台装载中</option>
              <option value="服务区停歇">服务区停歇</option>
              <option value="末端配送">末端配送</option>
              <option value="空车待调度">空车待调度</option>
            </select>
          </div>
        </div>

        {/* Tab 1: Fleet List */}
        {activeTab === 'fleet' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#18191b] text-slate-500 dark:text-[#9aa0a6] font-medium border-b border-slate-200/70 dark:border-[#282a2c]">
                  <th className="py-3 px-4">车牌号</th>
                  <th className="py-3 px-3">车型规格</th>
                  <th className="py-3 px-3">责任司机</th>
                  <th className="py-3 px-3">起始园区 &rarr; 目的地</th>
                  <th className="py-3 px-3">车厢实时温度</th>
                  <th className="py-3 px-3 text-center">装载负荷</th>
                  <th className="py-3 px-3 text-center">当前状态</th>
                  <th className="py-3 px-3">预计送达(ETA)</th>
                  <th className="py-3 px-4 text-center">遥测控制</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#282a2c]">
                {filteredFleet.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-colors group cursor-pointer"
                    onClick={() => setSelectedVehicle(item)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-800 dark:text-[#f1f3f4] flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 bg-slate-900 dark:bg-[#131314] text-amber-300 dark:text-amber-400 rounded text-[11px] border border-slate-700 dark:border-[#3c4043]">
                          {item.plateNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-[#c4c7c5]">{item.vehicleType}</td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 dark:text-[#f1f3f4]">{item.driverName}</div>
                      <div className="text-[11px] text-slate-400 dark:text-[#80868b] font-mono">{item.driverPhone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-slate-700 dark:text-[#e3e3e3]">
                        <span>{item.parkOrigin}</span>
                        <ArrowRight className="w-3 h-3 text-sky-500 dark:text-sky-400" />
                        <span className="font-semibold text-slate-800 dark:text-[#f1f3f4]">{item.destination}</span>
                      </div>
                      <div className="w-36 bg-slate-100 dark:bg-[#282a2c] rounded-full h-1.5 mt-1.5 overflow-hidden">
                        <div
                          className="bg-teal-500 h-full rounded-full"
                          style={{ width: `${item.routeProgress}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <Thermometer
                          className={`w-4 h-4 ${
                            item.abnormalTemp ? 'text-rose-500 animate-pulse' : 'text-[#07c160]'
                          }`}
                        />
                        <span
                          className={`font-mono font-bold ${
                            item.abnormalTemp ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-[#f1f3f4]'
                          }`}
                        >
                          {item.currentTemp > 0 ? `+${item.currentTemp}` : item.currentTemp}℃
                        </span>
                        {item.abnormalTemp && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                            温升超标
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-[#80868b] mt-0.5">目标: {item.targetTemp}℃</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono font-bold text-slate-800 dark:text-[#f1f3f4]">{item.loadRate}%</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.status === '干线在途'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-[#4ade80] dark:border-emerald-500/30'
                            : item.status === '月台装载中'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-[#fbbf24] dark:border-amber-500/30'
                            : item.status === '末端配送'
                            ? 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30'
                            : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-[#282a2c] dark:text-[#c4c7c5] dark:border-[#3c4043]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-[#e3e3e3]">{item.eta}</td>
                    <td className="py-3 px-4 text-center" onClick={e => e.stopPropagation()}>
                      {item.abnormalTemp ? (
                        <button
                          onClick={() => handleRemoteCooling(item.id)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-medium shadow-2xs flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          <Zap className="w-3 h-3" />
                          远程紧急降温
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedVehicle(item)}
                          className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-[#282a2c] dark:hover:bg-[#333538] text-slate-600 dark:text-[#c4c7c5] rounded-lg text-[11px] font-medium border border-slate-200 dark:border-[#3c4043] mx-auto cursor-pointer transition-colors"
                        >
                          电子轨迹
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Smart Dispatch */}
        {activeTab === 'dispatch' && (
          <div className="p-5 space-y-4 text-xs">
            <div className="bg-teal-50/50 dark:bg-teal-500/10 border border-teal-200/70 dark:border-teal-500/30 p-4 rounded-2xl flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-[#f1f3f4] text-sm">TMS 智能装载拼车与运力推荐引擎</h4>
                <p className="text-slate-500 dark:text-[#9aa0a6] mt-0.5">
                  基于3D装载率仿真算法，自动将多笔同方向、同温层的OMS出库订单聚合成整车，最大化车辆容积利用率并减少碳排放。
                </p>
              </div>
              <button
                onClick={() => alert('已成功运行智能装载算法：合并4单至赣C·8921B，装载率提升至97.2%！')}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-xs shrink-0 cursor-pointer"
              >
                运行智能装载拼车
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-[#f1f3f4]">江西供销产业园 &rarr; 上海/华东线</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-[#4ade80] rounded text-[10px]">推荐匹配: 13.7米半挂冷藏</span>
                </div>
                <p className="text-slate-500 dark:text-[#9aa0a6] text-[11px]">待发货品: 赣南蜜桔 400箱 + 冷冻土鸡 150箱 (总重 18.5吨，体积 62m³)</p>
                <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-100 dark:border-[#282a2c]">
                  <span className="text-slate-400 dark:text-[#80868b]">预估单趟运费: ¥4,800</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">容积匹配度: 94%</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-[#f1f3f4]">赣州冷链产业园 &rarr; 深圳/大湾区南向</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-[#4ade80] rounded text-[10px]">推荐匹配: 9.6米重卡</span>
                </div>
                <p className="text-slate-500 dark:text-[#9aa0a6] text-[11px]">待发货品: 脐橙浓缩原浆 120桶 (总重 12.8吨，恒温冷链)</p>
                <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-100 dark:border-[#282a2c]">
                  <span className="text-slate-400 dark:text-[#80868b]">预估单趟运费: ¥3,200</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">容积匹配度: 89%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Carriers Scorecard */}
        {activeTab === 'carriers' && (
          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-[#f1f3f4]">赣州供销现代冷链车队</h4>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">98.4分 (AAA)</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#9aa0a6] space-y-1">
                  <div>准时到达率: 98.9%</div>
                  <div>温控合规率: 99.4%</div>
                  <div>电子回单上传时效: 1.2小时</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-[#f1f3f4]">江西顺达恒温干线快运</h4>
                  <span className="font-mono text-[#07c160] dark:text-[#4ade80] font-bold">95.2分 (AA)</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#9aa0a6] space-y-1">
                  <div>准时到达率: 96.5%</div>
                  <div>温控合规率: 97.0%</div>
                  <div>电子回单上传时效: 2.5小时</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 dark:text-[#f1f3f4]">湘赣边区农副集配联运处</h4>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">92.8分 (A)</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#9aa0a6] space-y-1">
                  <div>准时到达率: 93.1%</div>
                  <div>温控合规率: 96.2%</div>
                  <div>电子回单上传时效: 3.8小时</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Telemetry Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#1e1f20] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-[#3c4043]">
            <div className="p-4.5 border-b border-slate-100 dark:border-[#282a2c] flex items-center justify-between bg-slate-50/60 dark:bg-[#18191b]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-300 flex items-center justify-center border border-teal-100 dark:border-teal-500/30">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-[#f1f3f4] text-sm">车辆全息遥测与在途状态</h3>
                  <span className="font-mono text-xs text-teal-600 dark:text-teal-400">{selectedVehicle.plateNumber}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282a2c] text-slate-400 hover:text-slate-600 dark:hover:text-[#f1f3f4] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#18191b] border border-slate-200/70 dark:border-[#282a2c]">
                <div>
                  <span className="text-slate-400 dark:text-[#80868b]">责任司机:</span>
                  <p className="font-semibold text-slate-800 dark:text-[#f1f3f4] mt-0.5">{selectedVehicle.driverName}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-[#80868b]">电话号码:</span>
                  <p className="font-mono text-slate-800 dark:text-[#f1f3f4] mt-0.5">{selectedVehicle.driverPhone}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-[#80868b]">车型:</span>
                  <p className="font-medium text-slate-800 dark:text-[#f1f3f4] mt-0.5">{selectedVehicle.vehicleType}</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-[#80868b]">车速:</span>
                  <p className="font-mono text-teal-600 dark:text-teal-400 font-bold mt-0.5">{selectedVehicle.speedKmH} km/h</p>
                </div>
              </div>

              {/* Temperature block */}
              <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#282a2c] bg-white dark:bg-[#18191b] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-[#f1f3f4] flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-[#07c160] dark:text-[#4ade80]" />
                    车厢冷链实时温控
                  </span>
                  <span className="font-mono font-bold text-base text-slate-800 dark:text-[#f1f3f4]">
                    {selectedVehicle.currentTemp}℃
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-[#9aa0a6]">
                  <span>设定目标值: {selectedVehicle.targetTemp}℃</span>
                  <span>温区规范: {selectedVehicle.tempZone}</span>
                </div>
                {selectedVehicle.abnormalTemp && (
                  <button
                    onClick={() => handleRemoteCooling(selectedVehicle.id)}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium shadow-xs transition-colors cursor-pointer"
                  >
                    立即下发远程制冷增压指令
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-[#282a2c] bg-slate-50/60 dark:bg-[#18191b] flex items-center justify-end">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
