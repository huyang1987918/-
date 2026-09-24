import React, { useState } from 'react';
import {
  Leaf,
  Zap,
  Sun,
  Activity,
  BarChart3,
  RotateCcw,
  Plus,
  Search,
  Droplets,
  Flame,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EnergyDevice {
  id: string;
  name: string;
  location: string;
  category: '冷链制冷机组' | '屋顶光伏并网' | '智能储能电柜' | '照明与动力配电';
  powerKw: number;
  todayKwh: number;
  cop: number; // 能效比
  status: '正常运行' | '错峰储能中' | '光伏全发' | '维护预警';
  savingRate: string;
}

export const PropertyEnergyView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'solar' | 'submeter' | 'carbon'>('overview');
  const [searchKey, setSearchKey] = useState('');

  const devices: EnergyDevice[] = [
    {
      id: 'PWR-001',
      name: '1# 螺杆式双级制冷压缩机组',
      location: '江西供销产业园 冷库A区',
      category: '冷链制冷机组',
      powerKw: 78.4,
      todayKwh: 1420,
      cop: 3.42,
      status: '正常运行',
      savingRate: '节能 12.4%',
    },
    {
      id: 'PWR-002',
      name: '2# 变频智能冷水机组 (自动化立库专用)',
      location: '赣州冷链产业园 B-02立体库',
      category: '冷链制冷机组',
      powerKw: 65.2,
      todayKwh: 1180,
      cop: 3.85,
      status: '正常运行',
      savingRate: '节能 15.1%',
    },
    {
      id: 'PWR-003',
      name: 'A区库房屋顶分布式光伏发电阵列 (2.4MW)',
      location: '江西供销产业园 1-3号库顶',
      category: '屋顶光伏并网',
      powerKw: 184.0,
      todayKwh: 2680,
      cop: 4.10,
      status: '光伏全发',
      savingRate: '自发自用 88%',
    },
    {
      id: 'PWR-004',
      name: '磷酸铁锂工业储能电柜 (500kWh)',
      location: '萍乡现代物流港 变配电房',
      category: '智能储能电柜',
      powerKw: 42.0,
      todayKwh: 480,
      cop: 3.12,
      status: '错峰储能中',
      savingRate: '削峰填谷',
    },
    {
      id: 'PWR-005',
      name: '智能装卸月台高频变频卷帘与照明',
      location: '九江共青城产业园 月台区',
      category: '照明与动力配电',
      powerKw: 12.8,
      todayKwh: 190,
      cop: 2.80,
      status: '正常运行',
      savingRate: '感应休眠',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <Leaf className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">物业能源与绿色双碳运营</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                绿色零碳园区
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              监控全园区冷库制冷机组能耗、屋顶分布式光伏自发自用、智能微电网削峰填谷与水电气分户计量
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已重新采集全网智能电表、水表与光伏逆变器数据')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>智能抄表刷新</span>
          </button>
          <button
            onClick={() => alert('已生成本月园区绿色低碳节能综合分析报告')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>能耗分析报告</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">今日园区总用电量</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">5,950</span>
            <span className="text-xs text-slate-400">kWh</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <TrendingDown className="w-3 h-3" />
            <span>环比昨日节能 -6.8%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">屋顶分布式光伏发电</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sun className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-amber-600">2,680</span>
            <span className="text-xs text-slate-400">kWh</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">绿电自给率 45.0%</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">冷库综合平均COP能效</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">3.64</span>
            <span className="text-xs text-slate-400">一级能效</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">智能变频恒温控制</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">本月减碳核算量</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">128.5</span>
            <span className="text-xs text-slate-400">吨 CO₂</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">获得绿证认证补贴</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              重点高耗能设备监测
            </button>
            <button
              onClick={() => setActiveTab('solar')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'solar'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              光储微电网削峰填谷
            </button>
            <button
              onClick={() => setActiveTab('submeter')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'submeter'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              租户分户智能电表水表
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索机组、库区配电..."
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              className="w-52 pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Devices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/70 text-[11px]">
                <th className="py-2.5 px-3">设备编码</th>
                <th className="py-2.5 px-3">用能设备/机组名称</th>
                <th className="py-2.5 px-3">安装库区与物理位置</th>
                <th className="py-2.5 px-3">能耗分类</th>
                <th className="py-2.5 px-3 text-right">实时负荷 (kW)</th>
                <th className="py-2.5 px-3 text-right">今日累计 (kWh)</th>
                <th className="py-2.5 px-3 text-center">综合能效比 (COP)</th>
                <th className="py-2.5 px-3">运行工况</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {devices.map(dev => (
                <tr key={dev.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {dev.id}
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium">
                    {dev.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{dev.location}</td>
                  <td className="py-2.5 px-3 text-slate-600">{dev.category}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-800">
                    {dev.powerKw} kW
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-medium">
                    {dev.todayKwh.toLocaleString()} kWh
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-700">
                    {dev.cop}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {dev.status} ({dev.savingRate})
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开设备【${dev.name}】实时电力波形与调频参数`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      波形分析
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
