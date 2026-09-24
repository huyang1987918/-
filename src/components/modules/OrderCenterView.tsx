import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Boxes,
  Split,
  ChevronRight,
  Eye,
  RefreshCw,
  Download,
  X,
  Calendar,
  Layers,
  MapPin,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface OrderItem {
  id: string;
  orderNo: string;
  channel: '天猫超市' | '京东生鲜' | '美团优选' | '供销云商城' | '企业直采';
  customerName: string;
  customerPhone: string;
  address: string;
  park: string;
  warehouseName: string;
  items: { sku: string; name: string; count: number; unit: string; tempZone: string }[];
  totalAmount: number;
  status: '待分仓' | '波次拣选中' | '已交运' | '已签收' | '异常拦截';
  abnormalReason?: string;
  createTime: string;
  priority: '高' | '中' | '普通';
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderNo: 'SO-20260920-8901',
    channel: '京东生鲜',
    customerName: '华东生鲜供应链运营中心',
    customerPhone: '13811223344',
    address: '上海市嘉定区丰登路688号普陀分拨中心',
    park: '江西供销产业园',
    warehouseName: '冷库A',
    items: [
      { sku: 'SKU-09842', name: '赣南特级早熟蜜桔 (5kg装)', count: 400, unit: '箱', tempZone: '冷藏(2~6℃)' },
      { sku: 'SKU-09844', name: '生鲜冷冻土鸡 (三黄鸡整只)', count: 150, unit: '箱', tempZone: '冷库(-18℃)' },
    ],
    totalAmount: 42800.0,
    status: '波次拣选中',
    createTime: '2026-09-20 00:45:12',
    priority: '高',
  },
  {
    id: 'ord-2',
    orderNo: 'SO-20260920-8902',
    channel: '美团优选',
    customerName: '南昌社区团购前置集配站',
    customerPhone: '13977889900',
    address: '江西省南昌市青山湖区昌东工业园A栋',
    park: '流程园区',
    warehouseName: '流程一仓',
    items: [
      { sku: 'SKU-09843', name: '高山无公害生态香菇 (真空装)', count: 800, unit: '袋', tempZone: '常温干仓' },
    ],
    totalAmount: 15600.0,
    status: '已交运',
    createTime: '2026-09-20 00:32:05',
    priority: '中',
  },
  {
    id: 'ord-3',
    orderNo: 'SO-20260920-8903',
    channel: '企业直采',
    customerName: '深圳特区深供现代物流枢纽',
    customerPhone: '13612345678',
    address: '广东省深圳市龙岗区平湖物流基地3号库',
    park: '赣州冷链产业园',
    warehouseName: '赣州5号自动化立体库',
    items: [
      { sku: 'SKU-09845', name: '赣南脐橙原浆冷冻纯汁 (20kg桶装)', count: 120, unit: '桶', tempZone: '深冷(-25℃)' },
    ],
    totalAmount: 68400.0,
    status: '待分仓',
    createTime: '2026-09-20 00:15:30',
    priority: '高',
  },
  {
    id: 'ord-4',
    orderNo: 'SO-20260920-8904',
    channel: '供销云商城',
    customerName: '九江高校后勤集采集配处',
    customerPhone: '13566778899',
    address: '江西省九江市濂溪区前进东路551号',
    park: '九江共青城产业园',
    warehouseName: '九江云仓集配中心',
    items: [
      { sku: 'SKU-09846', name: '江西优质双季晚米 (25kg袋装)', count: 300, unit: '袋', tempZone: '常温干仓' },
      { sku: 'SKU-09847', name: '生态土鸡蛋 (30枚特护装)', count: 200, unit: '盒', tempZone: '恒温(15~20℃)' },
    ],
    totalAmount: 29800.0,
    status: '已签收',
    createTime: '2026-09-19 22:10:48',
    priority: '普通',
  },
  {
    id: 'ord-5',
    orderNo: 'SO-20260920-8905',
    channel: '天猫超市',
    customerName: '武汉华中冷链中心仓',
    customerPhone: '13799001122',
    address: '湖北省武汉市东西湖区金银潭生鲜枢纽',
    park: '萍乡现代物流港',
    warehouseName: '萍乡医药恒温冷链仓',
    items: [
      { sku: 'SKU-09844', name: '生鲜冷冻土鸡 (三黄鸡整只)', count: 600, unit: '箱', tempZone: '冷库(-18℃)' },
    ],
    totalAmount: 51000.0,
    status: '异常拦截',
    abnormalReason: '指定履约仓冷库实时温控浮动，触发安全温控拦截规则',
    createTime: '2026-09-19 23:18:14',
    priority: '高',
  },
  {
    id: 'ord-6',
    orderNo: 'SO-20260920-8906',
    channel: '天猫超市',
    customerName: '长沙生鲜冷链批发行',
    customerPhone: '13822334455',
    address: '湖南省长沙市雨花区红星农副产品大市场',
    park: '萍乡现代物流港',
    warehouseName: '8#常温配运库',
    items: [
      { sku: 'SKU-09842', name: '赣南特级早熟蜜桔 (5kg装)', count: 260, unit: '箱', tempZone: '冷藏(2~6℃)' },
    ],
    totalAmount: 18200.0,
    status: '波次拣选中',
    createTime: '2026-09-20 00:50:00',
    priority: '中',
  },
];

export const OrderCenterView: React.FC = () => {
  const { selectedPark, addLiveLog, subSidebarItem } = useApp();
  const [activeTab, setActiveTab] = useState<'sales' | 'work' | 'exceptions' | 'rules'>('sales');

  React.useEffect(() => {
    if (subSidebarItem === 'order_list') setActiveTab('sales');
    else if (subSidebarItem === 'in_out_order') setActiveTab('work');
    else if (subSidebarItem === 'abnormal_order') setActiveTab('exceptions');
    else if (subSidebarItem === 'routing_rules') setActiveTab('rules');
  }, [subSidebarItem]);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New order form state
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerPhone: '',
    channel: '供销云商城' as OrderItem['channel'],
    park: '江西供销产业园',
    address: '',
    productName: '赣南特级早熟蜜桔 (5kg装)',
    count: 100,
    price: 68,
  });

  // Filter orders by park, search, channel
  const filteredOrders = orders.filter(item => {
    if (selectedPark !== '所有园区' && item.park !== selectedPark) return false;
    if (channelFilter !== 'ALL' && item.channel !== channelFilter) return false;
    if (searchTerm) {
      const match =
        item.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.items.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!match) return false;
    }
    if (activeTab === 'exceptions' && item.status !== '异常拦截') return false;
    return true;
  });

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const inPickingCount = orders.filter(o => o.status === '波次拣选中').length;
  const inTransitCount = orders.filter(o => o.status === '已交运').length;
  const exceptionCount = orders.filter(o => o.status === '异常拦截').length;
  const totalSalesAmount = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // One-click intelligent split simulation
  const handleAutoSplit = () => {
    const pending = orders.filter(o => o.status === '待分仓');
    if (pending.length === 0) {
      alert('当前没有待分仓的订单。所有订单均已分发或在作业中！');
      return;
    }

    setOrders(prev =>
      prev.map(o =>
        o.status === '待分仓'
          ? { ...o, status: '波次拣选中', warehouseName: o.warehouseName || '自动化立库A区' }
          : o
      )
    );

    addLiveLog({
      type: 'order',
      level: 'success',
      text: `OMS智能拆单引擎批量完成 ${pending.length} 笔订单路由，已自动生成WMS波次拣选任务`,
      park: selectedPark,
    });
  };

  // Handle release exception order
  const handleReleaseException = (orderId: string) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: '波次拣选中', abnormalReason: undefined }
          : o
      )
    );
    addLiveLog({
      type: 'order',
      level: 'info',
      text: `异常订单已人工放行并转入出库作业，重试路由成功`,
      park: selectedPark,
    });
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => (prev ? { ...prev, status: '波次拣选中', abnormalReason: undefined } : null));
    }
  };

  // Create new order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.address) {
      alert('请填写客户姓名与详细收货地址');
      return;
    }

    const created: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNo: `SO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      channel: newOrder.channel,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone || '13800000000',
      address: newOrder.address,
      park: newOrder.park,
      warehouseName: '智能推荐履约仓',
      items: [
        {
          sku: 'SKU-NEW',
          name: newOrder.productName,
          count: Number(newOrder.count),
          unit: '件',
          tempZone: '冷藏(2~6℃)',
        },
      ],
      totalAmount: Number(newOrder.count) * Number(newOrder.price),
      status: '待分仓',
      createTime: new Date().toLocaleString(),
      priority: '高',
    };

    setOrders([created, ...orders]);
    setIsCreateOpen(false);
    addLiveLog({
      type: 'order',
      level: 'info',
      text: `新录入销售订单【${created.orderNo}】，金额 ¥${created.totalAmount}，已进入OMS分仓路由池`,
      park: created.park,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                订单中心 (OMS - Order Management System)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                全渠道履约
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              汇聚多渠道电商与大宗直采订单，支持智能分仓拆单、波次合并及异常拦截追踪 · 当前园区：{selectedPark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoSplit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/30 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <Split className="w-3.5 h-3.5" />
            一键智能拆单路由
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#07c160] hover:bg-[#06ad56] text-white rounded-xl text-xs font-medium shadow-xs shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            新建销售单
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <span className="text-slate-400 text-[11px]">今日订单总数</span>
          <div className="text-xl font-bold font-mono text-slate-800 mt-1">{totalOrdersCount} 单</div>
          <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 环比昨日 +18.4%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <span className="text-slate-400 text-[11px]">拣选作业中</span>
          <div className="text-xl font-bold font-mono text-[#07c160] mt-1">{inPickingCount} 单</div>
          <div className="text-[10px] text-slate-400 mt-1">AGV立体仓拣选中</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <span className="text-slate-400 text-[11px]">干线运输在途</span>
          <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">{inTransitCount} 单</div>
          <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1">全网冷链正常控温</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs">
          <span className="text-slate-400 text-[11px]">异常拦截</span>
          <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">{exceptionCount} 单</div>
          <div className="text-[10px] text-rose-500 mt-1">需人工复核放行</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-slate-400 text-[11px]">今日成交总金额</span>
          <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-300 mt-1">
            ¥{(totalSalesAmount / 10000).toFixed(2)} 万
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-300 mt-1">BMS自动化对账率 98%</div>
        </div>
      </div>

      {/* Main Container: Tabs + Filter Toolbar + Data Table */}
      <div className="bg-white dark:bg-[#1e1f20] rounded-2xl border border-slate-200/70 dark:border-[#3c4043] shadow-2xs overflow-hidden">
        {/* Sub Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-[#282a2c] flex items-center justify-between bg-slate-50/40 dark:bg-[#18191b]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'sales'
                  ? 'border-[#07c160] text-[#07c160] bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              销售订单池 ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'work'
                  ? 'border-[#07c160] text-[#07c160] bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              出入库作业单 (ASN/出库单)
            </button>
            <button
              onClick={() => setActiveTab('exceptions')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'exceptions'
                  ? 'border-rose-500 text-rose-600 bg-white dark:bg-[#1e1f20] dark:text-rose-400 dark:border-rose-500'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              异常拦截中心 ({exceptionCount})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'border-[#07c160] text-[#07c160] bg-white dark:bg-[#1e1f20] dark:text-[#4ade80] dark:border-[#4ade80]'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#9aa0a6] dark:hover:text-[#f1f3f4]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              智能拆单路由规则
            </button>
          </div>

          <div className="text-[11px] text-slate-400 dark:text-[#80868b]">
            已同步OMS数据引擎
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3.5 bg-slate-50/20 dark:bg-[#1e1f20] border-b border-slate-100 dark:border-[#282a2c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#07c160]" />
              <input
                type="text"
                placeholder="搜索单号、客户、商品名..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8.5 pr-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-[#07c160] dark:focus:border-[#4ade80] text-slate-800 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] w-56 transition-colors"
              />
            </div>

            <select
              value={channelFilter}
              onChange={e => setChannelFilter(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#282a2c] border border-slate-200 dark:border-[#3c4043] rounded-xl text-xs focus:outline-none focus:border-[#07c160] dark:focus:border-[#4ade80] text-slate-700 dark:text-[#e3e3e3] cursor-pointer transition-colors"
            >
              <option value="ALL">全部渠道来源</option>
              <option value="天猫超市">天猫超市</option>
              <option value="京东生鲜">京东生鲜</option>
              <option value="美团优选">美团优选</option>
              <option value="供销云商城">供销云商城</option>
              <option value="企业直采">企业直采</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const csv = '订单号,客户,金额,状态,创建时间\n' + orders.map(o => `${o.orderNo},${o.customerName},${o.totalAmount},${o.status},${o.createTime}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `OMS_Orders_${Date.now()}.csv`;
                link.click();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              导出清单
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'rules' ? (
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-emerald-50/60 border border-emerald-200/70 p-4 rounded-2xl flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#07c160] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">OMS 自动化拆单与多仓路由规则配置</h4>
                <p className="text-slate-500 mt-1">
                  系统依据收货省市区经纬度、各园区当前可用冷库/干仓库容、库存保质期批次（先进先出 FIFO）、运费成本最低原则，实时计算最优履约仓。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-2">
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">规则 1: 华东沿海优先路由</span>
                <h5 className="font-semibold text-slate-800">上海/浙江/江苏直配</h5>
                <p className="text-slate-500 text-[11px]">匹配【江西供销产业园】冷库A与干仓A，干线冷链直发，预计18小时达。</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-2">
                <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">规则 2: 大湾区保税直达</span>
                <h5 className="font-semibold text-slate-800">深圳/广州/东莞南向</h5>
                <p className="text-slate-500 text-[11px]">优先匹配【赣州冷链产业园】自动化立体库与保税专仓，通过深赣快线转运。</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200/70 bg-white space-y-2">
                <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">规则 3: 湘鄂中西部快速响应</span>
                <h5 className="font-semibold text-slate-800">武汉/长沙/株洲枢纽</h5>
                <p className="text-slate-500 text-[11px]">匹配【萍乡现代物流港】，2小时快速完成出库上车，实现当日配次日达。</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-200/70">
                  <th className="py-3 px-4">订单号</th>
                  <th className="py-3 px-3">渠道平台</th>
                  <th className="py-3 px-3">客户/收件人</th>
                  <th className="py-3 px-3">履约园区 / 仓位</th>
                  <th className="py-3 px-3">商品清单与规格</th>
                  <th className="py-3 px-3 text-right">金额 (元)</th>
                  <th className="py-3 px-3 text-center">状态</th>
                  <th className="py-3 px-3">创建时间</th>
                  <th className="py-3 px-4 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      没有符合筛选条件的订单记录
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(item => (
                    <tr
                      key={item.id}
                      className="hover:bg-emerald-50/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedOrder(item)}
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-[#07c160]">
                        {item.orderNo}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                          {item.channel}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">{item.customerName}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{item.address}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-800 font-medium">{item.park}</div>
                        <div className="text-[11px] text-slate-400">{item.warehouseName}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          {item.items.map((it, idx) => (
                            <div key={idx} className="text-slate-700 text-[11px] flex items-center gap-1.5">
                              <span className="font-medium">{it.name}</span>
                              <span className="text-slate-400 font-mono">x {it.count}{it.unit}</span>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded">{it.tempZone}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                        ¥{item.totalAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.status === '待分仓'
                              ? 'bg-slate-50 text-slate-700 border-slate-200'
                              : item.status === '波次拣选中'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                              : item.status === '已交运'
                              ? 'bg-teal-50 text-teal-700 border-teal-200/60'
                              : item.status === '已签收'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                              : 'bg-rose-50 text-rose-700 border-rose-200/60'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        {item.createTime}
                      </td>
                      <td className="py-3 px-4 text-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedOrder(item)}
                            className="p-1 rounded-lg text-slate-400 hover:text-[#07c160] hover:bg-emerald-50 transition-colors"
                            title="查看履约全链路追踪"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {item.status === '异常拦截' && (
                            <button
                              onClick={() => handleReleaseException(item.id)}
                              className="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-medium"
                            >
                              审核放行
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail & OWTB Full Lifecycle Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
            {/* Header */}
            <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">订单履约详情与OWTB全景</h3>
                  <span className="font-mono text-xs text-[#07c160]">{selectedOrder.orderNo}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
              {/* Status Alert Banner */}
              {selectedOrder.status === '异常拦截' && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">拦截预警原因：</span>
                    <p className="mt-0.5 text-[11px]">{selectedOrder.abnormalReason}</p>
                    <button
                      onClick={() => handleReleaseException(selectedOrder.id)}
                      className="mt-2.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      解除拦截并重新调度分仓
                    </button>
                  </div>
                </div>
              )}

              {/* Basic customer info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">收件客户:</span>
                  <span className="font-semibold text-slate-800">{selectedOrder.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">联系电话:</span>
                  <span className="font-mono text-slate-800">{selectedOrder.customerPhone}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400 shrink-0">收件地址:</span>
                  <span className="text-slate-700 text-right">{selectedOrder.address}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400">来源渠道:</span>
                  <span className="font-semibold text-[#07c160]">{selectedOrder.channel}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800 text-xs">订购商品与控温要求</h4>
                <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden bg-white">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{it.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          {it.sku} · 建议储位: {it.tempZone}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-800">{it.count} {it.unit}</div>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">库存充足</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OWTB Full Lifecycle Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#07c160]" />
                  OWTB 全链路履约生命周期追踪
                </h4>

                <div className="space-y-3 pl-3 border-l-2 border-emerald-200">
                  <div className="relative pl-3">
                    <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-[#07c160]" />
                    <div className="font-semibold text-slate-800">1. OMS 接收订单并验核库存</div>
                    <div className="text-[11px] text-slate-400">{selectedOrder.createTime} · 全网自动校验</div>
                  </div>

                  <div className="relative pl-3">
                    <div className="absolute -left-[19px] top-0.5 w-3 h-3 rounded-full bg-[#07c160]" />
                    <div className="font-semibold text-slate-800">2. 智能分仓路由已下发</div>
                    <div className="text-[11px] text-slate-400">分配至园区：{selectedOrder.park}（{selectedOrder.warehouseName}）</div>
                  </div>

                  <div className="relative pl-3">
                    <div className={`absolute -left-[19px] top-0.5 w-3 h-3 rounded-full ${
                      selectedOrder.status !== '待分仓' ? 'bg-[#07c160]' : 'bg-slate-300'
                    }`} />
                    <div className="font-semibold text-slate-800">3. WMS 仓储波次拣选与AGV组托</div>
                    <div className="text-[11px] text-slate-400">
                      {selectedOrder.status !== '待分仓' ? '已完成库位复核与自动缠膜' : '等待波次汇总下发'}
                    </div>
                  </div>

                  <div className="relative pl-3">
                    <div className={`absolute -left-[19px] top-0.5 w-3 h-3 rounded-full ${
                      selectedOrder.status === '已交运' || selectedOrder.status === '已签收' ? 'bg-teal-600' : 'bg-slate-300'
                    }`} />
                    <div className="font-semibold text-slate-800">4. TMS 冷链干线装载与在途追踪</div>
                    <div className="text-[11px] text-slate-400">
                      {selectedOrder.status === '已交运' || selectedOrder.status === '已签收'
                        ? '运力车次 TMS-408 · 全程温控-18.4℃'
                        : '等待装车配载'}
                    </div>
                  </div>

                  <div className="relative pl-3">
                    <div className={`absolute -left-[19px] top-0.5 w-3 h-3 rounded-full ${
                      selectedOrder.status === '已签收' ? 'bg-emerald-600' : 'bg-slate-300'
                    }`} />
                    <div className="font-semibold text-slate-800">5. 签收确权与 BMS 自动出账</div>
                    <div className="text-[11px] text-slate-400">
                      {selectedOrder.status === '已签收' ? '已完成电子回单签名，自动转入月结对账单' : '待末端交付确权'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-800">
                订单总计: ¥{selectedOrder.totalAmount.toFixed(2)}
              </span>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 bg-[#07c160] hover:bg-[#06ad56] text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <h3 className="font-semibold text-slate-800 text-sm">新建销售订单 (OMS)</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">客户姓名/单位 *</label>
                  <input
                    type="text"
                    required
                    placeholder="如：华东果品直营仓"
                    value={newOrder.customerName}
                    onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">联系电话 *</label>
                  <input
                    type="text"
                    required
                    placeholder="11位手机号"
                    value={newOrder.customerPhone}
                    onChange={e => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">销售渠道</label>
                  <select
                    value={newOrder.channel}
                    onChange={e => setNewOrder({ ...newOrder, channel: e.target.value as OrderItem['channel'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-white"
                  >
                    <option value="供销云商城">供销云商城</option>
                    <option value="天猫超市">天猫超市</option>
                    <option value="京东生鲜">京东生鲜</option>
                    <option value="美团优选">美团优选</option>
                    <option value="企业直采">企业直采</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">优选履约园区</label>
                  <select
                    value={newOrder.park}
                    onChange={e => setNewOrder({ ...newOrder, park: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-white"
                  >
                    <option value="江西供销产业园">江西供销产业园</option>
                    <option value="赣州冷链产业园">赣州冷链产业园</option>
                    <option value="萍乡现代物流港">萍乡现代物流港</option>
                    <option value="九江共青城产业园">九江共青城产业园</option>
                    <option value="流程园区">流程园区</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">详细收货地址 *</label>
                <input
                  type="text"
                  required
                  placeholder="省/市/区/详细路名门牌"
                  value={newOrder.address}
                  onChange={e => setNewOrder({ ...newOrder, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">商品名</label>
                  <input
                    type="text"
                    value={newOrder.productName}
                    onChange={e => setNewOrder({ ...newOrder, productName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">数量</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.count}
                    onChange={e => setNewOrder({ ...newOrder, count: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">单价 (元)</label>
                  <input
                    type="number"
                    min={1}
                    value={newOrder.price}
                    onChange={e => setNewOrder({ ...newOrder, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-[#07c160] focus:outline-none bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#07c160] hover:bg-[#06ad56] text-white rounded-xl font-medium shadow-xs shadow-emerald-500/20"
                >
                  确认提交订单
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
