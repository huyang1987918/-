import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Layers,
  Thermometer,
  Truck,
  Boxes,
  Receipt,
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  PieChart as PieIcon,
  RefreshCw,
  Clock,
  Compass,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  PARK_CAPACITY_DATA,
  CATEGORY_STOCK_STRUCTURE,
  CARRIER_RADAR_DATA,
  COLD_STORAGE_CONTINUOUS_SERIES,
  RECENT_14_DAYS_TREND,
  ALERT_TYPE_STATISTICS,
  OWTB_LIFECYCLE_FUNNEL,
} from '../../mock/data';

export const AnalyticsCenter: React.FC = () => {
  const { selectedPark, warehouses, liveStats, theme } = useApp();

  const isDark = theme === 'dark';

  const chartTooltipStyle = {
    backgroundColor: isDark ? '#1e1f20' : '#ffffff',
    borderColor: isDark ? '#3c4043' : '#cbd5e1',
    borderRadius: '12px',
    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.6)' : '0 8px 20px rgba(0,0,0,0.06)',
    fontSize: '11px',
    color: isDark ? '#f1f3f4' : '#0f172a',
  };

  const [dateRange, setDateRange] = useState<'today' | '7d' | '14d' | '30d'>('14d');
  const [activeAnalysisDimension, setActiveAnalysisDimension] = useState<
    'all' | 'warehouse' | 'transport' | 'coldchain' | 'billing'
  >('all');
  const [isExporting, setIsExporting] = useState(false);
  const [radarComparison, setRadarComparison] = useState<'supplyChain' | 'coldFleet'>('supplyChain');

  // Filter trend data according to date range
  const trendData = useMemo(() => {
    if (dateRange === '7d') return RECENT_14_DAYS_TREND.slice(-7);
    if (dateRange === 'today') return RECENT_14_DAYS_TREND.slice(-2);
    return RECENT_14_DAYS_TREND;
  }, [dateRange]);

  // Park data filtered if header park is active
  const filteredParkData = useMemo(() => {
    if (selectedPark === '所有园区') return PARK_CAPACITY_DATA;
    return PARK_CAPACITY_DATA.filter(p => p.name === selectedPark || p.name.includes(selectedPark));
  }, [selectedPark]);

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`【报表导出成功】已生成《OWTB 供应链多维运营统计分析周报_${dateRange}.xlsx》，涵盖 ${selectedPark} 详细吞吐与库容明细！`);
    }, 800);
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f0f2f5] dark:bg-[#131314] min-h-full">
      {/* Top App Header & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-[#07c160] border border-emerald-100">
              <BarChart3 className="w-5 h-5 text-[#07c160]" />
            </span>
            <h2 className="text-base md:text-lg font-semibold text-slate-800 tracking-tight">
              全景运营数据洞察与深度分析看板
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Analytics Hub
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>涵盖OMS订单汇聚、WMS库容周转、TMS在途冷链与BMS财务自动化对账</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>过滤园区: <strong className="text-slate-700 font-medium">{selectedPark}</strong></span>
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Chips */}
          <div className="inline-flex p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/60">
            {(
              [
                { id: 'today', label: '今日实时' },
                { id: '7d', label: '近7天' },
                { id: '14d', label: '近14天' },
                { id: '30d', label: '近30天' },
              ] as const
            ).map(tab => (
              <button
                key={tab.id}
                onClick={() => setDateRange(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  dateRange === tab.id
                    ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? '生成报表中...' : '导出分析报表'}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Orders */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">14日订单流转总数</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <ArrowUpRight className="w-3 h-3" /> +16.8%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-800">21.85</span>
            <span className="text-xs text-slate-400">万单</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>日均吞吐: 1.56 万单</span>
            <span className="text-emerald-700 font-medium">履约率 98.7%</span>
          </div>
        </div>

        {/* Metric 2: Warehouse Load */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">全域在库动态存量</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              负荷率 79.4%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-800">42.54</span>
            <span className="text-xs text-slate-400">万 m³</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>总设计容量: 53.5 万 m³</span>
            <span className="text-teal-600 font-medium">可用 10.96 万 m³</span>
          </div>
        </div>

        {/* Metric 3: Cold Chain Safety */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">冷链全程控温达标率</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 className="w-3 h-3" /> 卓越
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-600">99.2%</span>
            <span className="text-xs text-slate-400">温控合规</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>平均库温: -19.4℃</span>
            <span className="text-amber-600 font-medium">轻微波动 3次已自愈</span>
          </div>
        </div>

        {/* Metric 4: Revenue & Freight */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">阶段累计结算流水 (BMS)</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
              自动核销 94%
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-800">¥1,586.4</span>
            <span className="text-xs text-slate-400">万元</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>仓储费: 68.2%</span>
            <span className="text-emerald-700 font-medium">干线运费: 31.8%</span>
          </div>
        </div>
      </div>

      {/* Dimension Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2 overflow-x-auto scrollbar-none">
        {(
          [
            { id: 'all', label: '全景综合看板', icon: Layers },
            { id: 'warehouse', label: '仓储库容透视', icon: Boxes },
            { id: 'transport', label: '在途运力与承运商', icon: Truck },
            { id: 'coldchain', label: '冷链数字孪生监测', icon: Thermometer },
            { id: 'billing', label: '财务结算对账', icon: Receipt },
          ] as const
        ).map(dim => {
          const Icon = dim.icon;
          const isActive = activeAnalysisDimension === dim.id;

          return (
            <button
              key={dim.id}
              onClick={() => setActiveAnalysisDimension(dim.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#07c160] hover:bg-[#06a953] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{dim.label}</span>
            </button>
          );
        })}
      </div>

      {/* Row 1 Charts: Composed Trend Chart + OWTB Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: 14-day Multi-Axis Composed Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#07c160]" />
                供应链跨期运营走势多维对比 (Composed Dual-Axis Trend)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                左轴：销售单量 (单) 与出入库件数 ｜ 右轴：结算总流水 (万元)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#07c160] shadow-xs" /> 订单量
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-xs" /> 入库件数
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 shadow-xs" /> 出库件数
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-0.5 bg-amber-500 shadow-xs" /> 结算流水
              </span>
            </div>
          </div>

          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#07c160" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#07c160" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                <XAxis dataKey="date" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 11, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis yAxisId="left" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 11, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fontSize: 11, fill: '#d97706' }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  name="订单量 (单)"
                  stroke="#07c160"
                  strokeWidth={2.5}
                  fill="url(#orderGrad)"
                />
                <Bar
                  yAxisId="left"
                  dataKey="inboundPieces"
                  name="入库量 (件)"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
                <Bar
                  yAxisId="left"
                  dataKey="outboundPieces"
                  name="出库量 (件)"
                  fill="#0ea5e9"
                  radius={[4, 4, 0, 0]}
                  barSize={10}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="gmvWan"
                  name="结算流水 (万元)"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 1 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: OWTB Funnel Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#07c160]" />
                OWTB 全链路阶段流转漏斗
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200/60">
                总体转化 81.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              监控销售接收、智能分单、仓储作业、干线配送与结算确权各阶段流失
            </p>

            <div className="space-y-3">
              {OWTB_LIFECYCLE_FUNNEL.map(step => (
                <div key={step.stage} className="text-xs">
                  <div className="flex items-center justify-between text-slate-800 mb-1">
                    <span className="font-medium flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: step.fill }}
                      />
                      {step.stage}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {step.count.toLocaleString()} 单 (<strong>{step.rate}%</strong>)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${step.rate}%`,
                        backgroundColor: step.fill,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>平均全链路周转时效: <strong className="text-slate-800">24.6 小时</strong></span>
            <span className="text-emerald-700 font-medium">时效达成率 98.4%</span>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Category Donut Chart + Carrier Radar Chart + Park Capacity Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Chart 3: Product Category & Temperature Zone Structure */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#07c160]" />
                品类货值与温区结构占比
              </h3>
              <p className="text-[11px] text-slate-400">全网在库总货值约 ¥1,360 万元</p>
            </div>
          </div>

          <div className="h-52 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_STOCK_STRUCTURE}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
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

          <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-100 text-[11px]">
            {CATEGORY_STOCK_STRUCTURE.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 truncate max-w-[190px]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-mono text-slate-800 font-medium">
                  {cat.value}% (¥{cat.amount}万)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Carrier Logistics Radar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#07c160]" />
                干线运力履约综合评分雷达
              </h3>
              <p className="text-[11px] text-slate-400">六大维度对比行业基准线</p>
            </div>
            {/* Toggle radar subject */}
            <div className="inline-flex p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/60 text-[10px]">
              <button
                onClick={() => setRadarComparison('supplyChain')}
                className={`px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${
                  radarComparison === 'supplyChain' ? 'bg-white text-slate-800 font-semibold shadow-2xs' : 'text-slate-500'
                }`}
              >
                供销骨干
              </button>
              <button
                onClick={() => setRadarComparison('coldFleet')}
                className={`px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${
                  radarComparison === 'coldFleet' ? 'bg-white text-slate-800 font-semibold shadow-2xs' : 'text-slate-500'
                }`}
              >
                冷链专线
              </button>
            </div>
          </div>

          <div className="h-56 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={70} data={CARRIER_RADAR_DATA}>
                <PolarGrid stroke={isDark ? '#3c4043' : '#e2e8f0'} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: isDark ? '#c4c7c5' : '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? '#3c4043' : '#cbd5e1'} tick={{ fontSize: 9 }} />
                <Radar
                  name="行业基准"
                  dataKey="benchmark"
                  stroke={isDark ? '#64748b' : '#94a3b8'}
                  fill={isDark ? '#475569' : '#cbd5e1'}
                  fillOpacity={0.25}
                  strokeWidth={1.5}
                />
                <Radar
                  name={radarComparison === 'supplyChain' ? '江西供销骨干车队' : '赣州冷链专属车队'}
                  dataKey={radarComparison === 'supplyChain' ? 'supplyChain' : 'coldFleet'}
                  stroke="#07c160"
                  fill="#07c160"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center justify-between">
            <span>综合服务评级: <strong className="text-slate-800">AAA+ (行业领先)</strong></span>
            <span>在途损耗率: 0.04%</span>
          </div>
        </div>

        {/* Chart 5: Park Capacity & Turnover Days Composed Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#07c160]" />
                各园区容量负荷与周转天数
              </h3>
              <p className="text-[11px] text-slate-400">柱状：库容占用 ｜ 折线：库存周转天数</p>
            </div>
          </div>

          <div className="h-56 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={filteredParkData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis yAxisId="left" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 10, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#f97316" tick={{ fontSize: 10, fill: '#ea580c' }} unit="天" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar yAxisId="left" dataKey="used" name="已用容量 (m³)" fill="#07c160" radius={[4, 4, 0, 0]} />
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

          <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>最佳周转: <strong className="text-slate-800">赣州冷链 (9.8天)</strong></span>
            <span className="text-emerald-700 font-medium">全网平均 12.1 天</span>
          </div>
        </div>
      </div>

      {/* Row 3 Charts: Cold Chain Digital Twin Line Chart + Alert Type Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 6: Cold Storage Digital Twin 24-Hour Waveform */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#07c160]" />
                生鲜冷库数字孪生 24小时连续高频温湿度与能耗波动
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                实时采集制冷机组传感器脉冲，恒定控温基线: -18.0℃ ~ -22.0℃
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-0.5 bg-sky-500" /> 库温 (℃)
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-0.5 bg-emerald-500" /> 湿度 (%RH)
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="w-2.5 h-0.5 bg-amber-500" /> 压缩机功耗 (kW)
              </span>
            </div>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={COLD_STORAGE_CONTINUOUS_SERIES} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#282a2c' : '#e2e8f0'} />
                <XAxis dataKey="time" stroke={isDark ? '#5f6368' : '#94a3b8'} tick={{ fontSize: 11, fill: isDark ? '#9aa0a6' : '#64748b' }} />
                <YAxis yAxisId="temp" domain={[-24, -16]} stroke="#0284c7" tick={{ fontSize: 11, fill: '#0284c7' }} unit="℃" />
                <YAxis yAxisId="power" orientation="right" domain={[50, 120]} stroke="#f59e0b" tick={{ fontSize: 11, fill: '#d97706' }} unit="kW" />
                <Tooltip contentStyle={chartTooltipStyle} />
                <ReferenceLine yAxisId="temp" y={-18.0} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: '安全上限 -18℃', fill: '#f43f5e', fontSize: 10, fontWeight: 600 }} />
                <ReferenceLine yAxisId="temp" y={-22.0} stroke="#07c160" strokeDasharray="3 3" strokeWidth={1.5} label={{ value: '安全下限 -22℃', fill: '#07c160', fontSize: 10, fontWeight: 600 }} />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temp"
                  name="冷库实时温度 (℃)"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#0284c7', stroke: '#ffffff', strokeWidth: 1 }}
                />
                <Line
                  yAxisId="power"
                  type="monotone"
                  dataKey="powerKw"
                  name="制冷机组功耗 (kW)"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              变频压缩机节能模式运行中，综合能耗环比下降 11.4%
            </span>
            <span className="text-slate-400">监控周期: 过去 24 小时</span>
          </div>
        </div>

        {/* Chart 7: Alert Distribution Statistics */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                系统异常事件分类与排查分布
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium border border-amber-200/60">
                近7日共 118 起
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              用于定位供应链薄弱瓶颈与前置调度预警
            </p>

            <div className="space-y-3.5">
              {ALERT_TYPE_STATISTICS.map(item => (
                <div key={item.type} className="text-xs">
                  <div className="flex items-center justify-between text-slate-800 mb-1">
                    <span className="font-medium text-[11px] truncate max-w-[180px]">
                      {item.type}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {item.count}次 ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.severity === 'danger'
                          ? 'bg-rose-500'
                          : item.severity === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-[#07c160]'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-medium">自动消警与自愈闭环率 96.2%</span>
            <button
              onClick={() => alert('已打开异常拦截与警报工单排查清单')}
              className="text-emerald-700 hover:underline font-medium cursor-pointer"
            >
              查看警报工单 &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
