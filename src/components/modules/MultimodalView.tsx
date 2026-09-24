import React, { useState } from 'react';
import {
  Compass,
  Train,
  Ship,
  Truck,
  Boxes,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  RotateCcw,
  Plus,
  Eye,
  FileText,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MultimodalOrder {
  id: string;
  orderNo: string;
  cargo: string;
  mode: '公铁联运' | '铁水联运' | '江海直达' | '空铁联运';
  origin: string;
  transshipNode: string;
  destination: string;
  containerNo: string;
  teu: number;
  carrier: string;
  status: '班列在途' | '港区装卸中' | '待公路接驳' | '已签收交付' | '异常延误';
  eta: string;
  progress: number;
}

export const MultimodalView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'yard' | 'schedule' | 'nodes'>('orders');
  const [searchKey, setSearchKey] = useState('');
  const [modeFilter, setModeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<MultimodalOrder | null>(null);

  const initialOrders: MultimodalOrder[] = [
    {
      id: 'MM-2026-001',
      orderNo: 'TL-JX-092801',
      cargo: '赣南特级脐橙冷链集装箱 (恒温2-6℃)',
      mode: '公铁联运',
      origin: '赣州冷链国际物流港',
      transshipNode: '南昌向塘铁路枢纽',
      destination: '满洲里口岸 (中欧班列)',
      containerNo: 'CRXU-8921094',
      teu: 2,
      carrier: '江西铁投供销冷链班列',
      status: '班列在途',
      eta: '2026-09-24 16:30',
      progress: 68,
    },
    {
      id: 'MM-2026-002',
      orderNo: 'TL-JX-092802',
      cargo: '宜春精制高岭土与锂电新材料',
      mode: '铁水联运',
      origin: '宜春袁州货运站',
      transshipNode: '九江城西港集装箱码头',
      destination: '上海洋山深水港',
      containerNo: 'COSCO-771203',
      teu: 4,
      carrier: '中远海运集运物流',
      status: '港区装卸中',
      eta: '2026-09-23 20:00',
      progress: 45,
    },
    {
      id: 'MM-2026-003',
      orderNo: 'TL-JX-092803',
      cargo: '高山优质富硒大米与粮油原料',
      mode: '江海直达',
      origin: '九江共青城产业园',
      transshipNode: '九江港琵琶湖作业区',
      destination: '广州黄埔港',
      containerNo: 'CMA-9920148',
      teu: 2,
      carrier: '长航江运集装箱船队',
      status: '待公路接驳',
      eta: '2026-09-25 09:00',
      progress: 85,
    },
    {
      id: 'MM-2026-004',
      orderNo: 'TL-JX-092804',
      cargo: '鄱阳湖生态大闸蟹活水箱式运输',
      mode: '公铁联运',
      origin: '南昌昌北供销冷链园',
      transshipNode: '郑州圃田铁路集装箱中心',
      destination: '北京丰台冷链集散站',
      containerNo: 'CRE-5521099',
      teu: 1,
      carrier: '中铁快运特需专列',
      status: '班列在途',
      eta: '2026-09-23 06:00',
      progress: 72,
    },
    {
      id: 'MM-2026-005',
      orderNo: 'TL-JX-092805',
      cargo: '萍乡工业精密机械装备零配件',
      mode: '公铁联运',
      origin: '萍乡现代物流港',
      transshipNode: '株洲北编组站',
      destination: '成都青白江国际铁路港',
      containerNo: 'TBJU-331092',
      teu: 2,
      carrier: '西南铁路干线快线',
      status: '已签收交付',
      eta: '2026-09-22 18:00',
      progress: 100,
    },
  ];

  const filteredOrders = initialOrders.filter(item => {
    if (modeFilter !== 'all' && item.mode !== modeFilter) return false;
    if (searchKey && !item.cargo.includes(searchKey) && !item.orderNo.includes(searchKey) && !item.containerNo.includes(searchKey)) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <Compass className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">多式联运管控中心</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                公铁水海空大联运
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              实现江西供销全网公铁联运班列、九江长江黄金水道水水驳运与沿海港口集装箱高效中转
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新全路网多式联运班列与船期实时动态数据')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>刷新路况</span>
          </button>
          <button
            onClick={() => alert('已打开多式联运新开班列托运申报界面')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>提报联运计划</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">在途联运集装箱</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">1,280</span>
            <span className="text-xs text-slate-400">TEU</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>环比上月 +18.4%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">铁水联运班列/船期</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Train className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">38</span>
            <span className="text-xs text-slate-400">列/班次 (今日)</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">赣闽直通 / 沿江快线</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">多式联运准点交付率</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">98.6%</span>
            <span className="text-xs text-slate-400">高正点</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">智能接驳减少停滞6.2h</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">多式联运降本节碳</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">-24.5%</span>
            <span className="text-xs text-slate-400">单吨综合运费</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">累计减排二氧化碳 420t</div>
        </div>
      </div>

      {/* Tabs and Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              公铁水联运运单池
            </button>
            <button
              onClick={() => setActiveTab('yard')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'yard'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              枢纽集装箱堆场态势
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              班列与船期时刻表
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索单号、箱号、货物..."
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                className="w-56 pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
            </div>

            <select
              value={modeFilter}
              onChange={e => setModeFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">全联运方式</option>
              <option value="公铁联运">公铁联运</option>
              <option value="铁水联运">铁水联运</option>
              <option value="江海直达">江海直达</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/70 text-[11px]">
                <th className="py-2.5 px-3">托运运单号</th>
                <th className="py-2.5 px-3">联运方式</th>
                <th className="py-2.5 px-3">货物名称与规格</th>
                <th className="py-2.5 px-3">集装箱号 / 规格</th>
                <th className="py-2.5 px-3">全程路由路径</th>
                <th className="py-2.5 px-3">承运合作单位</th>
                <th className="py-2.5 px-3">预计到达时效</th>
                <th className="py-2.5 px-3">当前状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map(item => (
                <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {item.orderNo}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {item.mode === '公铁联运' && <Train className="w-3 h-3 text-emerald-600" />}
                      {item.mode === '铁水联运' && <Ship className="w-3 h-3 text-sky-600" />}
                      {item.mode === '江海直达' && <Ship className="w-3 h-3 text-teal-600" />}
                      {item.mode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-800 font-medium max-w-xs truncate" title={item.cargo}>
                    {item.cargo}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {item.containerNo} <span className="text-[10px] text-slate-400">({item.teu} TEU)</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <div className="flex items-center gap-1 text-[11px]">
                      <span>{item.origin}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-emerald-700 font-medium">{item.transshipNode}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span>{item.destination}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{item.carrier}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{item.eta}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      item.status === '班列在途'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : item.status === '港区装卸中'
                        ? 'bg-sky-50 text-sky-700 border-sky-200/60'
                        : item.status === '已签收交付'
                        ? 'bg-slate-100 text-slate-600 border-slate-200/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(item)}
                      className="px-2.5 py-1 rounded-lg text-emerald-700 hover:bg-emerald-50 font-medium text-xs cursor-pointer"
                    >
                      跟踪节点
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer for Node Tracking */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#07c160]" />
                多式联运在途轨迹追踪 - {selectedOrder.orderNo}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded-lg"
              >
                关闭
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>货物：</strong>{selectedOrder.cargo}</p>
              <p><strong>集装箱号：</strong>{selectedOrder.containerNo} ({selectedOrder.teu} TEU)</p>
              <p><strong>全程路线：</strong>{selectedOrder.origin} &rarr; {selectedOrder.transshipNode} &rarr; {selectedOrder.destination}</p>
              <div className="pt-2">
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>当前运力执行进度</span>
                  <span>{selectedOrder.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#07c160] rounded-full transition-all duration-300"
                    style={{ width: `${selectedOrder.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 bg-[#07c160] text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
