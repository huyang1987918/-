import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Store,
  CheckCircle2,
  Clock,
  RotateCcw,
  Plus,
  Search,
  Filter,
  Flame,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MallItem {
  id: string;
  skuNo: string;
  name: string;
  coopOrigin: string; // 产地合作社
  price: string;
  wholesaleMin: string;
  stock: number;
  salesMonth: number;
  rating: string;
  status: '热卖在售' | '爆品推荐' | '库存告急' | '下架归档';
}

export const MallOpsView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'wholesale' | 'audit' | 'suppliers'>('products');
  const [searchKey, setSearchKey] = useState('');

  const products: MallItem[] = [
    {
      id: 'ML-01',
      skuNo: 'GX-ORG-01',
      name: '赣南原产特级高山富硒脐橙 (果农直发特供)',
      coopOrigin: '赣州安远县供销果品专业合作社',
      price: '¥68.00 / 箱 (10斤)',
      wholesaleMin: '50 箱起批 (¥48.00/箱)',
      stock: 12400,
      salesMonth: 4890,
      rating: '4.98',
      status: '爆品推荐',
    },
    {
      id: 'ML-02',
      skuNo: 'GX-ORG-02',
      name: '鄱阳湖生态大闸蟹 尊享礼盒 (4公4母配工具姜茶)',
      coopOrigin: '九江共青城生态水产养殖合作社',
      price: '¥268.00 / 盒',
      wholesaleMin: '20 盒起批 (¥198.00/盒)',
      stock: 3500,
      salesMonth: 1820,
      rating: '4.95',
      status: '热卖在售',
    },
    {
      id: 'ML-03',
      skuNo: 'GX-ORG-03',
      name: '南丰蜜桔精装果 (传统老树贡桔 糖度14+)',
      coopOrigin: '抚州南丰县供销现代农业示范基地',
      price: '¥55.00 / 箱 (10斤)',
      wholesaleMin: '100 箱起批 (¥38.00/箱)',
      stock: 8200,
      salesMonth: 3410,
      rating: '4.92',
      status: '热卖在售',
    },
    {
      id: 'ML-04',
      skuNo: 'GX-ORG-04',
      name: '高山优质富硒生态丝苗米 (当季新米真空锁鲜)',
      coopOrigin: '宜春袁州供销绿色优质粮油基地',
      price: '¥78.00 / 袋 (10kg)',
      wholesaleMin: '50 袋起批 (¥58.00/袋)',
      stock: 450,
      salesMonth: 950,
      rating: '4.90',
      status: '库存告急',
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <ShoppingBag className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">供销农特产商城运营中心</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                B2B大宗集采批发
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              联动江西供销生鲜冷链网络，提供产地直采、大宗批发拼单、农超对接与冷链仓配一体化履约商城
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新线上供销商城交易流水与实时GMV')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>刷新交易</span>
          </button>
          <button
            onClick={() => alert('已打开新增供销爆品上架审批窗口')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>发布上架商品</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">今日大宗撮合GMV</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">¥248.6</span>
            <span className="text-xs text-slate-400">万元</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>集采单量 1,840 笔</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">入驻产地合作社</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Store className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">312</span>
            <span className="text-xs text-slate-400">家</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">覆盖全省绿色生态基地</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">在售供销特产SKU</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">1,820</span>
            <span className="text-xs text-slate-400">款</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">全程冷链保鲜直达</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">爆品满意度好评率</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">99.8%</span>
            <span className="text-xs text-slate-400">极高评价</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">正品防伪一物一码</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              供销自营与合作社商品
            </button>
            <button
              onClick={() => setActiveTab('wholesale')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'wholesale'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              大宗批发集采撮合单
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              上架资质与农残检测审核
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索商品名、合作社、货号..."
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
                <th className="py-2.5 px-3">商品货号</th>
                <th className="py-2.5 px-3">农特产商品名称</th>
                <th className="py-2.5 px-3">直采产地合作社</th>
                <th className="py-2.5 px-3">零售参考价</th>
                <th className="py-2.5 px-3">大宗集采阶梯价</th>
                <th className="py-2.5 px-3 text-right">可用现货库存</th>
                <th className="py-2.5 px-3 text-right">月销量</th>
                <th className="py-2.5 px-3">状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">
                    {p.skuNo}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800 flex items-center gap-1.5">
                    {p.status === '爆品推荐' && <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                    <span>{p.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{p.coopOrigin}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{p.price}</td>
                  <td className="py-2.5 px-3 font-mono font-medium text-emerald-700">{p.wholesaleMin}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                    {p.stock.toLocaleString()} 件
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    {p.salesMonth.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                      p.status === '爆品推荐'
                        ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                        : p.status === '热卖在售'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已打开商品【${p.name}】商城货架编辑与温控库存参数`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      货架管理
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
