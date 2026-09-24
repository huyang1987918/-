import React from 'react';
import { ShoppingCart, Truck, Receipt, Package, Building2, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface GenericModuleViewProps {
  moduleType: 'order' | 'transport' | 'settlement' | 'product' | 'park';
}

export const GenericModuleView: React.FC<GenericModuleViewProps> = ({ moduleType }) => {
  const { selectedPark, liveStats, openTab } = useApp();

  const configs = {
    order: {
      title: '订单中心 (OMS - Order Management System)',
      subtitle: '支持全渠道销售订单汇聚、智能拆单、分仓路由与逆向退换货全生命周期监控',
      icon: ShoppingCart,
      stats: [
        { label: '今日累计下单', val: `${liveStats.todayOrders.toLocaleString()} 单`, rate: '+14.2%', color: 'text-[#07c160]' },
        { label: '已完成发运', val: `${Math.floor(liveStats.todayOrders * 0.92).toLocaleString()} 单`, rate: '92.0%', color: 'text-teal-600' },
        { label: '分仓调度中', val: `${liveStats.pendingFulfillment} 单`, rate: '待作业', color: 'text-amber-600' },
        { label: '异常拦截', val: `${liveStats.interceptedOrders} 单`, rate: '高优核实', color: 'text-rose-600' },
      ],
      sampleItems: [
        { id: 'SO-20260919-0921', customer: '江西绿色农产品电商专营', park: '江西供销产业园', items: '精选高山蜜桔 500箱', status: '已出库交运', time: '23:32' },
        { id: 'SO-20260919-0922', customer: '华东冷链生鲜商超直供', park: '赣州冷链产业园', items: '赣南脐橙原浆 1,200件', status: '月台复核拣选中', time: '23:28' },
        { id: 'SO-20260919-0923', customer: '萍乡现代社区团购', park: '萍乡现代物流港', items: '恒温保鲜有机蔬菜 350箱', status: '运力配载完成', time: '23:20' },
        { id: 'SO-20260919-0924', customer: '共青城高校后勤保障', park: '九江共青城产业园', items: '冷冻调理禽肉 800箱', status: 'AGV立体仓调拨中', time: '23:15' },
      ]
    },
    transport: {
      title: '运输中心 (TMS - Transportation Management System)',
      subtitle: '干线跨省调度、冷链在途温湿度GPS追踪、装载率优化与多式联运管控',
      icon: Truck,
      stats: [
        { label: '在途运输车次', val: `${liveStats.inTransitVehicles} 辆`, rate: '全部在线', color: 'text-[#07c160]' },
        { label: '交付准时达率', val: `${liveStats.onTimeDeliveryRate}%`, rate: '达标优', color: 'text-teal-600' },
        { label: '干线平均装载率', val: '87.4%', rate: '+3.1%', color: 'text-emerald-600' },
        { label: '待调度运力池', val: '28 辆', rate: '备车充裕', color: 'text-purple-600' },
      ],
      sampleItems: [
        { id: 'TMS-TRK-8810', customer: '冷藏重卡 赣C·9821A', park: '江西供销产业园 → 上海普陀分拨', items: '温度 -18.6℃ · 正常', status: '在途已行驶 340km', time: '23:34' },
        { id: 'TMS-TRK-8811', customer: '恒温箱式车 赣B·4429F', park: '赣州冷链基地 → 深圳福田农批', items: '温度 2.4℃ · 正常', status: '已进入高速服务区', time: '23:29' },
        { id: 'TMS-TRK-8812', customer: '高栏重卡 赣J·1209B', park: '萍乡现代物流港 → 武汉东西湖仓', items: '装载率 94% · 正常', status: '干线巡航时速 82km/h', time: '23:22' },
      ]
    },
    settlement: {
      title: '结算中心 (BMS - Billing Management System)',
      subtitle: '全自动仓储租赁费、操作装卸费、干线运费按规则自动化计费、对账与核销',
      icon: Receipt,
      stats: [
        { label: '今日累计结算额', val: `¥${(liveStats.todaySettlementYuan / 10000).toFixed(2)} 万`, rate: '自动计提', color: 'text-purple-600' },
        { label: '本月待出账单', val: '¥1,429.5 万', rate: '月结账期', color: 'text-[#07c160]' },
        { label: '已对账核销', val: '96.2%', rate: '审批顺畅', color: 'text-teal-600' },
        { label: '待复核异常单', val: '3 笔', rate: '需人工审核', color: 'text-amber-600' },
      ],
      sampleItems: [
        { id: 'BMS-INV-2026-001', customer: '江西供销现代物流有限公司', park: '江西供销产业园', items: '冷链租赁月费 + 自动化装卸', status: '¥128,450.00 (已确认)', time: '23:30' },
        { id: 'BMS-INV-2026-002', customer: '赣州冷链智能供应链合伙企业', park: '赣州冷链产业园', items: '保税备货中转仓储计费', status: '¥86,920.00 (待财务复核)', time: '23:18' },
        { id: 'BMS-INV-2026-003', customer: '萍乡干线城配联营车队', park: '萍乡现代物流港', items: '干线跨省运费里程核销', status: '¥45,200.00 (已支付凭证)', time: '23:05' },
      ]
    },
    product: {
      title: '商品中心 (Master Product Catalog)',
      subtitle: '全域SKU基础档案、物料条码、温控品类标识、规格毛重与保质期预警',
      icon: Package,
      stats: [
        { label: '在册SKU总数', val: '14,890 种', rate: '+12 种/日', color: 'text-[#07c160]' },
        { label: '冷链控温商品', val: '3,420 种', rate: '严格温控', color: 'text-teal-600' },
        { label: '临期预警SKU', val: '8 种', rate: '已触发临期折价', color: 'text-amber-600' },
        { label: '无条码拦截', val: '0', rate: '全部合规', color: 'text-emerald-600' },
      ],
      sampleItems: [
        { id: 'SKU-09842', customer: '赣南特级早熟蜜桔 (5kg礼盒装)', park: '生鲜果品 · 控温 2-6℃', items: '6901234567890', status: '正常流通中', time: '23:25' },
        { id: 'SKU-09843', customer: '高山无公害生态香菇 (真空干燥)', park: '干货菌菇 · 常温干仓', items: '6901234567891', status: '正常流通中', time: '23:20' },
        { id: 'SKU-09844', customer: '优质生鲜冷冻土鸡 (三黄鸡整只)', park: '冷冻肉禽 · 冷库 -18℃', items: '6901234567892', status: '临期警戒 (还剩15天)', time: '23:10' },
      ]
    },
    park: {
      title: '园区中心 (Logistics Park Network)',
      subtitle: '多园区基础设施资产分布、冷库机组运作工况与月台进出通道道闸监控',
      icon: Building2,
      stats: [
        { label: '接入物流园区', val: '7 个', rate: '全覆盖', color: 'text-teal-600' },
        { label: '智能化月台', val: '148 个', rate: '自动导引', color: 'text-[#07c160]' },
        { label: '冷链制冷机组', val: '34 组', rate: '100% 运行', color: 'text-emerald-600' },
        { label: 'AGV立体库位', val: '28,000 个', rate: '自动化', color: 'text-purple-600' },
      ],
      sampleItems: [
        { id: 'PARK-01', customer: '江西供销产业园 (核心枢纽基地)', park: '江西省南昌市 / 赣州市', items: '占地 420亩 · 仓储面积 18.2万㎡', status: '正常运行 (负荷 75.6%)', time: '23:34' },
        { id: 'PARK-02', customer: '赣州冷链产业园 (跨境与南向通道)', park: '江西省赣州市经开区', items: '占地 260亩 · 自动化立库 6.5万m³', status: '正常运行 (负荷 81.7%)', time: '23:30' },
        { id: 'PARK-03', customer: '萍乡现代物流港 (湘赣中转枢纽)', park: '江西省萍乡市安源区', items: '占地 180亩 · 常温与冷链配送中心', status: '正常运行 (负荷 67.1%)', time: '23:22' },
      ]
    }
  }[moduleType];

  const Icon = configs.icon;

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">{configs.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{configs.subtitle}</p>
          </div>
        </div>

        <button
          onClick={() => openTab({ id: 'warehouse', title: '仓库管理', module: 'warehouse' })}
          className="text-xs px-3.5 py-1.5 bg-emerald-50/70 hover:bg-emerald-100/70 text-[#07c160] border border-emerald-200/60 rounded-xl transition-colors font-medium cursor-pointer"
        >
          返回仓库管理主表 &rarr;
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {configs.stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs hover:shadow-xs transition-shadow">
            <span className="text-xs text-slate-400">{stat.label}</span>
            <div className={`text-2xl font-bold font-mono mt-1 ${stat.color}`}>{stat.val}</div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 pt-2 border-t border-slate-100">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              <span>状态: {stat.rate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sample operational list */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h4 className="font-semibold text-slate-800 text-xs">实时业务流转流水</h4>
          <span className="text-[11px] text-slate-400">已结合园区权限筛选: {selectedPark}</span>
        </div>
        <div className="divide-y divide-slate-100">
          {configs.sampleItems.map(item => (
            <div key={item.id} className="p-3.5 flex items-center justify-between hover:bg-emerald-50/30 text-xs transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px]">
                  {item.id}
                </span>
                <div>
                  <div className="font-semibold text-slate-800">{item.customer}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.park} · {item.items}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-700 font-medium">{item.status}</span>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
