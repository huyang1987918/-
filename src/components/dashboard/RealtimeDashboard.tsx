import React, { useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Truck,
  Receipt,
  ShoppingCart,
  Clock,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  PieChart as PieIcon,
  Compass,
  ArrowRight,
  BarChart3,
  Thermometer,
  ShieldAlert,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  HOURLY_FLOW_DATA,
  PARK_CAPACITY_DATA,
  CATEGORY_STOCK_STRUCTURE,
  CARRIER_RADAR_DATA,
  COLD_STORAGE_CONTINUOUS_SERIES,
  OWTB_LIFECYCLE_FUNNEL,
  ALERT_TYPE_STATISTICS,
} from '../../mock/data';

export const RealtimeDashboard: React.FC = () => {
  const {
    liveStats,
    isStreaming,
    setIsStreaming,
    liveLogs,
    selectedPark,
    openTab,
    warehouses,
    theme,
  } = useApp();

  const isDark = theme === 'dark';

  const chartTooltipStyle = {
    backgroundColor: isDark ? '#1e1f20' : '#ffffff',
    borderColor: isDark ? '#3c4043' : '#cbd5e1',
    borderRadius: '12px',
    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.6)' : '0 8px 20px rgba(0,0,0,0.06)',
    fontSize: '11px',
    color: isDark ? '#f1f3f4' : '#0f172a',
  };

  const [timeRange, setTimeRange] = useState<'today' | 'week'>('today');
  const [activeChartTab, setActiveChartTab] = useState<'flow' | 'funnel' | 'carrier'>('flow');

  // Filtered park data if a specific park is chosen in the header
  const displayParkData =
    selectedPark === '所有园区'
      ? PARK_CAPACITY_DATA
      : PARK_CAPACITY_DATA.filter(p => p.name === selectedPark || p.name.includes(selectedPark));

  const safeParkData = displayParkData.length > 0 ? displayParkData : PARK_CAPACITY_DATA;

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f0f2f5] dark:bg-[#131314] min-h-full">
      {/* Top Status & Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              {isStreaming ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-400"></span>
              )}
            </span>
            <div>
              <h2 className="text-sm md:text-base font-semibold text-slate-800 flex items-center gap-2">
                OWTB 供应链实时数据监控大屏
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  实时数据流
                </span>
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#07c160]" />
                <span className="font-mono">基准时间: {liveStats.lastTickTime}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>园区过滤: <strong className="text-slate-700 font-medium">{selectedPark}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Stream Play/Pause Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isStreaming
                ? 'bg-amber-50/90 text-amber-700 border border-amber-200/70 hover:bg-amber-100/80 shadow-2xs'
                : 'bg-emerald-50/90 text-emerald-700 border border-emerald-200/70 hover:bg-emerald-100/80 shadow-2xs'
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isStreaming ? '暂停推送' : '恢复数据流'}</span>
          </button>

          {/* Quick Filter range */}
          <div className="inline-flex p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === 'today'
                  ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              今日实时
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === 'week'
                  ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              近7日走势
            </button>
          </div>

          {/* Direct link to deep analytics center */}
          <button
            onClick={() => openTab({ id: 'operation', title: '运营看板', module: 'operation' })}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium text-[#07c160] bg-emerald-50/70 hover:bg-emerald-100/70 rounded-xl border border-emerald-200/60 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#07c160]" />
            <span>深度运营看板 &rarr;</span>
          </button>
        </div>
      </div>

      {/* 4 Core OWTB Real-time KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* O: Order */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-50 text-[#07c160] flex items-center justify-center font-bold text-xs border border-emerald-100">
                O
              </div>
              <span className="text-xs font-semibold text-slate-800">订单中心 (OMS)</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-slate-800 tracking-tight">
              {liveStats.todayOrders.toLocaleString()}
              <span className="text-xs font-normal text-slate-400 ml-1.5">单</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">全域今日接单与履约流转</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400">待调度:</span>
              <span className="font-semibold text-slate-700 ml-1 font-mono">
                {liveStats.pendingFulfillment} 单
              </span>
            </div>
            <div>
              <span className="text-slate-400">异常拦截:</span>
              <span className="font-semibold text-rose-600 ml-1 font-mono">
                {liveStats.interceptedOrders} 单
              </span>
            </div>
          </div>
        </div>

        {/* W: Warehouse */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs border border-teal-100">
                W
              </div>
              <span className="text-xs font-semibold text-slate-800">仓储中心 (WMS)</span>
            </div>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
              负荷率 {liveStats.warehouseLoadRate}%
            </span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-slate-800 tracking-tight">
              {(liveStats.totalStockPieces / 10000).toFixed(2)}
              <span className="text-xs font-normal text-slate-400 ml-1.5">万件</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">有效在库库存总量 (共 {warehouses.length} 仓)</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400">入库速率:</span>
              <span className="font-semibold text-teal-600 ml-1 font-mono">
                {liveStats.inboundRate} 件/分
              </span>
            </div>
            <div>
              <span className="text-slate-400">出库速率:</span>
              <span className="font-semibold text-[#07c160] ml-1 font-mono">
                {liveStats.outboundRate} 件/分
              </span>
            </div>
          </div>
        </div>

        {/* T: Transport */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">
                T
              </div>
              <span className="text-xs font-semibold text-slate-800">运输中心 (TMS)</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              准时率 {liveStats.onTimeDeliveryRate}%
            </span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-slate-800 tracking-tight">
              {liveStats.inTransitVehicles}
              <span className="text-xs font-normal text-slate-400 ml-1.5">辆在途</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">跨省干线与同城冷链配送</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400">平均装载率:</span>
              <span className="font-semibold text-slate-700 ml-1 font-mono">87.4%</span>
            </div>
            <div>
              <span className="text-slate-400">在途温控:</span>
              <span className="font-semibold text-emerald-600 ml-1 font-mono">100% 达标</span>
            </div>
          </div>
        </div>

        {/* B: Billing */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs border border-violet-100">
                B
              </div>
              <span className="text-xs font-semibold text-slate-800">结算中心 (BMS)</span>
            </div>
            <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200/60">
              自动核销 94%
            </span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-slate-800 tracking-tight">
              ¥{(liveStats.todaySettlementYuan / 10000).toFixed(2)}
              <span className="text-xs font-normal text-slate-400 ml-1.5">万元</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">今日累计对账结算总金额</p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400">仓储服务费:</span>
              <span className="font-semibold text-slate-700 ml-1 font-mono">68.5%</span>
            </div>
            <div>
              <span className="text-slate-400">干线运费:</span>
              <span className="font-semibold text-slate-700 ml-1 font-mono">31.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row: 24h Area Flow OR Funnel Stage View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Interactive View Switcher */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#07c160]" />
                {activeChartTab === 'flow'
                  ? '24小时仓储出入库与订单吞吐走势 (实时监测)'
                  : '全链路 OWTB 阶段履约流转漏斗'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeChartTab === 'flow'
                  ? '毫秒级捕获入库、出库与订单波峰，红虚线标识预警阈值'
                  : '监控订单自OMS汇聚至BMS最终对账核销的各阶段留存与转化'}
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="inline-flex p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setActiveChartTab('flow')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeChartTab === 'flow'
                    ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                出入库走势
              </button>
              <button
                onClick={() => setActiveChartTab('funnel')}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeChartTab === 'funnel'
                    ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                OWTB全链路漏斗
              </button>
            </div>
          </div>

          {activeChartTab === 'flow' ? (
            <>
              <div className="flex items-center gap-4 text-[11px] text-slate-600 mb-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-xs" /> 入库流量 (件)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#07c160] shadow-xs" /> 出库流量 (件)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shadow-xs" /> 下单单量
                </span>
                <span className="flex items-center gap-1.5 text-rose-600 font-medium">
                  <span className="w-3 h-0.5 border-b-2 border-dashed border-rose-500" /> 吞吐警戒线 (2,000件)
                </span>
              </div>

              <div className="h-68 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={HOURLY_FLOW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="flowInbound" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="flowOutbound" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#07c160" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#07c160" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                    <XAxis dataKey="hour" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 11, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                    <YAxis stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 11, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <ReferenceLine y={2000} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: '波峰阈值', fill: '#f43f5e', fontSize: 10, fontWeight: 600 }} />
                    <Area
                      type="monotone"
                      dataKey="inBound"
                      name="入库量 (件)"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#flowInbound)"
                    />
                    <Area
                      type="monotone"
                      dataKey="outBound"
                      name="出库量 (件)"
                      stroke="#07c160"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#flowOutbound)"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      name="下单单量"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 1 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="space-y-3 my-auto">
              {OWTB_LIFECYCLE_FUNNEL.map(step => (
                <div key={step.stage} className="text-xs">
                  <div className="flex items-center justify-between text-slate-800 mb-1">
                    <span className="font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: step.fill }} />
                      {step.stage}
                    </span>
                    <span className="font-mono text-slate-500">
                      {step.count.toLocaleString()} 单 (<strong>{step.rate}%</strong>)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${step.rate}%`, backgroundColor: step.fill }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Park Warehouse Capacity Load + Turnover Days */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#07c160]" />
                各园区容量负荷与周转天数
              </h3>
              <button
                onClick={() => openTab({ id: 'warehouse', title: '仓库管理', module: 'warehouse' })}
                className="text-[11px] text-[#07c160] hover:underline font-medium cursor-pointer"
              >
                明细 &rarr;
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">单位：立方米 (m³) ｜ 周转单位：天</p>

            <div className="h-60 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={safeParkData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                  <XAxis dataKey="name" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                  <YAxis yAxisId="left" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f97316" tick={{ fontSize: 10, fill: '#ea580c' }} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar yAxisId="left" dataKey="total" name="总容积 (m³)" fill="#a7f3d0" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="used" name="已占用 (m³)" fill="#07c160" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="turnoverDays"
                    name="周转天数 (天)"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#f97316', stroke: '#ffffff', strokeWidth: 1 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
            <span>负荷最高: <strong className="text-slate-800">赣州冷链 (81.7%)</strong></span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              周转最快: 9.8天
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Category Donut + Carrier Radar + Cold Chain Waveform */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Chart A: Stock Category & Temperature Zone */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#07c160]" />
              商品品类与温区结构占比
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
              5大核心品类
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">在库总货值 ¥1,360.2 万元</p>

          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_STOCK_STRUCTURE}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {CATEGORY_STOCK_STRUCTURE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% (货值 ¥${item?.payload?.amount}万, ${item?.payload?.tempZone})`,
                    name,
                  ]}
                  contentStyle={chartTooltipStyle}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
            {CATEGORY_STOCK_STRUCTURE.slice(0, 3).map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 truncate max-w-[190px]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-mono text-slate-800 font-medium">
                  {cat.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart B: Carrier Radar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#07c160]" />
              在途运力与承运商履约评分
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
              综合 AAA+
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">供销干线物流 vs 行业基准</p>

          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={65} data={CARRIER_RADAR_DATA}>
                <PolarGrid stroke={isDark ? '#3c4043' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: isDark ? '#c4c7c5' : '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? '#3c4043' : '#cbd5e1'} tick={{ fontSize: 8 }} />
                <Radar name="行业基准" dataKey="benchmark" stroke={isDark ? '#64748b' : '#94a3b8'} fill={isDark ? '#475569' : '#cbd5e1'} fillOpacity={0.25} strokeWidth={1.5} />
                <Radar name="供销干线" dataKey="supplyChain" stroke="#07c160" fill="#10b981" fillOpacity={0.45} strokeWidth={2} />
                <Tooltip contentStyle={chartTooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
            <span>准时交付率: <strong className="text-slate-800">96%</strong></span>
            <span className="text-emerald-700 font-medium">温控合规: 98%</span>
          </div>
        </div>

        {/* Chart C: Cold Chain Waveform */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#07c160]" />
              冷库连续高频温控波形
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
              控温平稳
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">基线区间: -18.0℃ ~ -22.0℃</p>

          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COLD_STORAGE_CONTINUOUS_SERIES.slice(0, 8)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                <XAxis dataKey="time" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis domain={[-22, -17]} stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <ReferenceLine y={-18.0} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1.5} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  name="温度 (℃)"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0284c7', stroke: '#ffffff', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
            <span>当前瞬时库温: <strong className="text-slate-800">-19.5 ℃</strong></span>
            <span className="text-emerald-700 font-medium">湿度 88% RH</span>
          </div>
        </div>
      </div>

      {/* Row 3: Realtime Live Event Feed & Cold Chain Facility Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cold Storage Facility Health Status */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                全域冷链仓储温控机组状态
              </h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200/60">
                4个冷库全部绿标
              </span>
            </div>

            <div className="space-y-2">
              {warehouses
                .filter(w => w.category === '冷库')
                .slice(0, 4)
                .map(w => {
                  const temp = (-(18.2 + (w.index % 4) * 0.9)).toFixed(1);
                  const isSafe = Number(temp) <= -18.0;

                  return (
                    <div
                      key={w.id}
                      className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between text-xs hover:border-emerald-300 hover:bg-emerald-50/20 transition-all"
                    >
                      <div>
                        <span className="font-medium text-slate-800">{w.name}</span>
                        <p className="text-[11px] text-slate-400">{w.park}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-mono font-bold ${isSafe ? 'text-teal-600' : 'text-amber-600'}`}>
                          {temp} ℃
                        </span>
                        <div className="text-[10px] text-slate-400">湿度: 88% RH 正常</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> 机组巡检正常
            </span>
            <span className="text-slate-400">自动调节延迟 &lt; 3秒</span>
          </div>
        </div>

        {/* Real-time Logistics Live Events Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#07c160] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#07c160]"></span>
                </span>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-[#f1f3f4] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#07c160]" />
                  实时履约动态流水 (Live Logistics Stream)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-500/30 font-mono font-medium">
                  2.5s 脉冲推送
                </span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#80868b] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                事件驱动流 · 实时
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs scrollbar-none">
              {liveLogs.map(log => {
                let badgeClass = 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-[#282a2c] dark:text-[#c4c7c5] dark:border-[#3c4043]';
                if (log.type === 'billing') {
                  badgeClass = 'bg-purple-50 text-purple-700 border-purple-200/70 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30';
                } else if (log.level === 'success') {
                  badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/15 dark:text-[#4ade80] dark:border-emerald-500/30';
                } else if (log.level === 'warning') {
                  badgeClass = 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/15 dark:text-[#fbbf24] dark:border-amber-500/30';
                } else if (log.level === 'danger') {
                  badgeClass = 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-500/15 dark:text-[#fb7185] dark:border-rose-500/30';
                } else if (log.type === 'order') {
                  badgeClass = 'bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-500/15 dark:text-[#38bdf8] dark:border-sky-500/30';
                }

                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl border border-slate-200/60 dark:border-[#282a2c] bg-slate-50/60 dark:bg-[#18191b] hover:bg-white dark:hover:bg-[#222326] hover:border-slate-200 dark:hover:border-[#3c4043] hover:shadow-2xs transition-all flex items-start gap-2.5"
                  >
                    <span className="font-mono text-slate-400 dark:text-[#80868b] shrink-0 text-[11px] mt-0.5">
                      {log.timestamp}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-semibold font-mono ${badgeClass}`}
                    >
                      {log.type.toUpperCase()}
                    </span>
                    <span className="text-slate-700 dark:text-[#e3e3e3] text-[11px] flex-1 leading-relaxed">
                      {log.text}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-[#9aa0a6] shrink-0 bg-white dark:bg-[#282a2c] border border-slate-200/70 dark:border-[#3c4043] px-2 py-0.5 rounded-full font-medium">
                      {log.park}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#282a2c] text-[11px] text-slate-400 dark:text-[#80868b] flex items-center justify-between">
            <span>日志存储与审计安全合规</span>
            <span className="text-emerald-700 dark:text-[#4ade80] font-medium">已监听全域 5 个园区事件</span>
          </div>
        </div>
      </div>
    </div>
  );
};
