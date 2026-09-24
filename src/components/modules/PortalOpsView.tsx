import React, { useState } from 'react';
import {
  Globe,
  FileText,
  Megaphone,
  HelpCircle,
  Eye,
  Plus,
  RotateCcw,
  Search,
  CheckCircle2,
  Calendar,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PortalArticle {
  id: string;
  title: string;
  category: '招商资讯' | '园区通知' | '惠企政策' | '行业动态';
  author: string;
  views: number;
  status: '已发布' | '草稿' | '已下架';
  publishDate: string;
  isTop: boolean;
}

export const PortalOpsView: React.FC = () => {
  const { selectedPark } = useApp();
  const [activeTab, setActiveTab] = useState<'articles' | 'policies' | 'broadcast' | 'inquiries'>('articles');
  const [searchKey, setSearchKey] = useState('');

  const articles: PortalArticle[] = [
    {
      id: 'ART-01',
      title: '关于2026年江西供销生鲜冷链骨干网智能月台全时段开放预约的通知',
      category: '园区通知',
      author: '园区运营中心',
      views: 3420,
      status: '已发布',
      publishDate: '2026-09-20',
      isTop: true,
    },
    {
      id: 'ART-02',
      title: '国家冷链物流骨干基地中央预算内专项资金申报补贴指南解读',
      category: '惠企政策',
      author: '政策法规科',
      views: 5890,
      status: '已发布',
      publishDate: '2026-09-18',
      isTop: true,
    },
    {
      id: 'ART-03',
      title: '赣州冷链国际物流港南向多式联运大通道招商推介简报',
      category: '招商资讯',
      author: '招商合作部',
      views: 2840,
      status: '已发布',
      publishDate: '2026-09-15',
      isTop: false,
    },
    {
      id: 'ART-04',
      title: '全省农产品冷链物流仓储标准化建设推进会实录',
      category: '行业动态',
      author: '综合办公室',
      views: 1960,
      status: '已发布',
      publishDate: '2026-09-12',
      isTop: false,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100/80 shadow-xs">
            <Globe className="w-5 h-5 text-[#07c160]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">园区门户运营中心</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                对外数字化门户
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              统一管理智慧园区对外门户网站、招商引资推介大厅、政府惠企申报直通车与重要通知广播
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('已刷新智慧门户前端页面缓存与最新访客量统计')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>刷新门户</span>
          </button>
          <button
            onClick={() => alert('已打开门户文章/政策撰写富文本编辑器')}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>发布门户内容</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">门户月度总访问量 (PV)</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800">128.4</span>
            <span className="text-xs text-slate-400">万次</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">日均活跃客商 4,200+</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">在办惠企政策项目</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600">18</span>
            <span className="text-xs text-slate-400">项</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">累计争取扶持 1,200万元</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">通知公告全网触达</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Megaphone className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600">100%</span>
            <span className="text-xs text-slate-400">覆盖</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">短信+移动协同端推送</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">企业在线咨询解决率</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-[#07c160]">99.5%</span>
            <span className="text-xs text-slate-400">高满意</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">2小时内极速答复</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              门户文章与资讯列表
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'policies'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              惠企政策申报专区
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'broadcast'
                  ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 hover:bg-slate-100/70'
              }`}
            >
              园区应急与营商公告广播
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索资讯标题、政策名称..."
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
                <th className="py-2.5 px-3">文章标题</th>
                <th className="py-2.5 px-3">发布专栏</th>
                <th className="py-2.5 px-3">撰写发布人</th>
                <th className="py-2.5 px-3 text-right">浏览量 (PV)</th>
                <th className="py-2.5 px-3">发布日期</th>
                <th className="py-2.5 px-3">发布状态</th>
                <th className="py-2.5 px-3 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map(art => (
                <tr key={art.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-800 flex items-center gap-2 max-w-md truncate">
                    {art.isTop && (
                      <span className="px-1.5 py-0.2 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-200">
                        置顶
                      </span>
                    )}
                    <span title={art.title}>{art.title}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{art.author}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    {art.views.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                    {art.publishDate}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {art.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => alert(`已预览文章【${art.title}】的门户端展示效果`)}
                      className="px-2.5 py-1 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      预览
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
