import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  ClipboardList,
  Boxes,
  Truck,
  Receipt,
  Compass,
  Wrench,
  Leaf,
  ShieldCheck,
  Building2,
  Settings,
  Database,
  Globe,
  ShoppingBag,
  History,
  ChevronRight,
  ChevronDown,
  Search,
  PanelLeftClose,
  PanelLeft,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopNavModule } from '../../types';

interface SubMenuItem {
  id: string;
  label: string;
  tabTitle: string;
  module: TopNavModule;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'rose' | 'slate';
}

interface MainMenuItem {
  id: string;
  title: string;
  module: TopNavModule;
  icon: React.ComponentType<{ className?: string }>;
  subItems: SubMenuItem[];
}

interface MenuCategory {
  categoryTitle: string;
  items: MainMenuItem[];
}

export const SubSidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    subSidebarItem,
    setSubSidebarItem,
    openTab,
    selectedPark,
    currentRole,
    roles,
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    work_center: true,
    warehouse: true,
  });

  // Exactly matching the 4 Categories and 15 Menu Items from reference attachment:
  const menuCategories: MenuCategory[] = [
    {
      categoryTitle: '工作中心与驾驶舱',
      items: [
        {
          id: 'work_center',
          title: '工作中心',
          module: 'work_center',
          icon: LayoutGrid,
          subItems: [
            { id: 'realtime_cockpit', label: '综合运行数据大屏', tabTitle: '工作中心 - 实时大屏', module: 'work_center', badge: 'Live', badgeColor: 'emerald' },
            { id: 'owtb_pipeline', label: 'OWTB履约全景链路', tabTitle: 'OWTB履约全景', module: 'work_center' },
            { id: 'temp_alerts', label: '冷链温湿度遥测中心', tabTitle: '冷链温湿监测', module: 'work_center', badge: '4 库', badgeColor: 'emerald' },
            { id: 'fleet_radar', label: '在途运力北斗雷达', tabTitle: '在途运力监控', module: 'work_center', badge: '6 车', badgeColor: 'emerald' },
            { id: 'ops_board', label: '全景运营深度分析', tabTitle: '运营分析看板', module: 'operation' },
          ],
        },
      ],
    },
    {
      categoryTitle: '供应链协同 (OTWB)',
      items: [
        {
          id: 'fulfillment',
          title: '履约中心',
          module: 'fulfillment',
          icon: ClipboardList,
          subItems: [
            { id: 'order_list', label: '全渠道销售订单池', tabTitle: '销售订单池', module: 'fulfillment', badge: '6 笔', badgeColor: 'emerald' },
            { id: 'in_out_order', label: '出入库作业单 (ASN)', tabTitle: '出入库作业单', module: 'fulfillment' },
            { id: 'routing_rules', label: '智能分仓路由规则', tabTitle: '智能分仓路由', module: 'fulfillment' },
            { id: 'abnormal_order', label: '异常拦截预警中心', tabTitle: '异常拦截中心', module: 'fulfillment', badge: '1 单', badgeColor: 'rose' },
          ],
        },
        {
          id: 'warehouse',
          title: '仓储管理',
          module: 'warehouse',
          icon: Boxes,
          subItems: [
            { id: 'warehouse_mgmt', label: '仓库管理与台账', tabTitle: '仓库管理', module: 'warehouse', badge: '16 库', badgeColor: 'emerald' },
            { id: 'wh_cold_chain', label: '冷链温控库区群', tabTitle: '冷库设施台账', module: 'warehouse', badge: '5 库', badgeColor: 'emerald' },
            { id: 'wh_agv_auto', label: 'AGV自动化立体库', tabTitle: '自动化立体库', module: 'warehouse', badge: '3 库', badgeColor: 'emerald' },
            { id: 'visual_3d', label: '3D库容数字孪生', tabTitle: '3D库容可视化', module: 'warehouse' },
            { id: 'inventory_mgmt', label: '实时库存与安全水位', tabTitle: '实时库存管理', module: 'inventory', badge: '142万件', badgeColor: 'emerald' },
          ],
        },
        {
          id: 'transport',
          title: '运输管理',
          module: 'transport',
          icon: Truck,
          subItems: [
            { id: 'transport_monitor', label: '在途冷链车辆遥测', tabTitle: '在途车辆监控', module: 'transport', badge: '在途 6 辆', badgeColor: 'emerald' },
            { id: 'dispatch_board', label: '智能装载派车池', tabTitle: '智能派车调度', module: 'transport' },
            { id: 'carrier_score', label: '承运商绩效考核', tabTitle: '承运商考评', module: 'transport' },
          ],
        },
        {
          id: 'settlement',
          title: '计费结算',
          module: 'settlement',
          icon: Receipt,
          subItems: [
            { id: 'billing_summary', label: '仓储计费汇总账单', tabTitle: '仓储计费账单', module: 'settlement', badge: '5 笔', badgeColor: 'emerald' },
            { id: 'freight_check', label: '冷链干线运费对账', tabTitle: '干线运费对账', module: 'settlement' },
            { id: 'billing_rules', label: '自动化计费矩阵规则', tabTitle: '计费规则引擎', module: 'settlement' },
          ],
        },
      ],
    },
    {
      categoryTitle: '园区物联与现场运营',
      items: [
        {
          id: 'multimodal',
          title: '多式联运',
          module: 'multimodal',
          icon: Compass,
          subItems: [
            { id: 'mm_orders', label: '公铁水联运运单池', tabTitle: '多式联运运单池', module: 'multimodal', badge: '在途', badgeColor: 'emerald' },
            { id: 'mm_yard', label: '枢纽集装箱堆场态势', tabTitle: '集装箱堆场态势', module: 'multimodal', badge: '1,280 TEU', badgeColor: 'emerald' },
            { id: 'mm_schedule', label: '班列与船期时刻表', tabTitle: '班列与船期', module: 'multimodal' },
          ],
        },
        {
          id: 'field_service',
          title: '现场服务',
          module: 'field_service',
          icon: Wrench,
          subItems: [
            { id: 'fs_dock', label: '月台与泊位实时看板', tabTitle: '智能装卸月台', module: 'field_service', badge: '42 月台', badgeColor: 'emerald' },
            { id: 'fs_weigh', label: '无人值守智能地磅流水', tabTitle: '智能地磅称重', module: 'field_service', badge: '318 车', badgeColor: 'emerald' },
            { id: 'fs_forklift', label: '场内叉车与AGV派工', tabTitle: '场内叉车调度', module: 'field_service' },
          ],
        },
        {
          id: 'property_energy',
          title: '物业能源',
          module: 'property_energy',
          icon: Leaf,
          subItems: [
            { id: 'pe_overview', label: '重点高耗能设备监测', tabTitle: '能耗设备监测', module: 'property_energy', badge: 'COP 3.6', badgeColor: 'emerald' },
            { id: 'pe_solar', label: '光储微电网削峰填谷', tabTitle: '光伏与储能微网', module: 'property_energy', badge: '自给45%', badgeColor: 'emerald' },
            { id: 'pe_submeter', label: '租户分户智能电表水表', tabTitle: '租户分户计量', module: 'property_energy' },
          ],
        },
        {
          id: 'service_collab',
          title: '服务协同',
          module: 'service_collab',
          icon: ShieldCheck,
          subItems: [
            { id: 'sc_tickets', label: '协同工单与维保派工池', tabTitle: '协同维保工单', module: 'service_collab', badge: '6 在办', badgeColor: 'amber' },
            { id: 'sc_gate', label: '安防道闸车牌识别流水', tabTitle: '智能道闸监控', module: 'service_collab', badge: '1,492 车', badgeColor: 'emerald' },
            { id: 'sc_emergency', label: '应急预案与安全演练', tabTitle: '应急安全指挥', module: 'service_collab' },
          ],
        },
        {
          id: 'merchant_lease',
          title: '招商租赁',
          module: 'merchant_lease',
          icon: Building2,
          subItems: [
            { id: 'ml_contracts', label: '在册租约合同清单', tabTitle: '租约合同管理', module: 'merchant_lease', badge: '出租率92%', badgeColor: 'emerald' },
            { id: 'ml_assets', label: '房源与档口招商资产图', tabTitle: '房源招商资产', module: 'merchant_lease' },
            { id: 'ml_tenants', label: '入驻商户信用档案', tabTitle: '入驻商户档案', module: 'merchant_lease', badge: '148 家', badgeColor: 'emerald' },
          ],
        },
      ],
    },
    {
      categoryTitle: '系统与综合管理',
      items: [
        {
          id: 'system_mgmt',
          title: '系统管理',
          module: 'system_mgmt',
          icon: Settings,
          subItems: [
            { id: 'rbac', label: '角色权限矩阵配置', tabTitle: '角色权限矩阵', module: 'system_mgmt', badge: '6 角色', badgeColor: 'emerald' },
            { id: 'user_list', label: '用户账号管理', tabTitle: '用户账号管理', module: 'system_mgmt', badge: '6 人', badgeColor: 'emerald' },
            { id: 'data_scope', label: '数据范围与脱敏', tabTitle: '数据范围管理', module: 'system_mgmt' },
            { id: 'audit_log', label: '平台安全审计日志', tabTitle: '平台安全审计', module: 'system_mgmt' },
          ],
        },
        {
          id: 'master_data',
          title: '主数据',
          module: 'master_data',
          icon: Database,
          subItems: [
            { id: 'md_sku', label: '全域SKU物料字典', tabTitle: 'SKU物料字典', module: 'master_data', badge: '1.4万种', badgeColor: 'emerald' },
            { id: 'md_partners', label: '客商往来单位档案', tabTitle: '客商单位档案', module: 'master_data', badge: '624 家', badgeColor: 'emerald' },
            { id: 'md_facilities', label: '物理仓房资产台账', tabTitle: '仓房资产台账', module: 'master_data', badge: '86 处', badgeColor: 'emerald' },
            { id: 'md_rules', label: '编码与批次规则', tabTitle: '编码规则配置', module: 'master_data' },
          ],
        },
        {
          id: 'portal_ops',
          title: '门户运营',
          module: 'portal_ops',
          icon: Globe,
          subItems: [
            { id: 'po_articles', label: '门户文章与资讯列表', tabTitle: '门户资讯内容', module: 'portal_ops', badge: '128万PV', badgeColor: 'emerald' },
            { id: 'po_policies', label: '惠企政策申报专区', tabTitle: '惠企政策申报', module: 'portal_ops', badge: '18 项', badgeColor: 'emerald' },
            { id: 'po_broadcast', label: '园区应急与营商公告', tabTitle: '公告广播中心', module: 'portal_ops' },
          ],
        },
        {
          id: 'mall_ops',
          title: '商城运营',
          module: 'mall_ops',
          icon: ShoppingBag,
          subItems: [
            { id: 'mo_products', label: '供销自营与合作社商品', tabTitle: '商城特产商品', module: 'mall_ops', badge: '1,820 款', badgeColor: 'emerald' },
            { id: 'mo_wholesale', label: '大宗批发集采撮合单', tabTitle: '大宗撮合订单', module: 'mall_ops', badge: '¥248万', badgeColor: 'emerald' },
            { id: 'mo_audit', label: '上架资质与农残检测', tabTitle: '商品上架审核', module: 'mall_ops' },
          ],
        },
        {
          id: 'trace_audit',
          title: '追溯审计',
          module: 'trace_audit',
          icon: History,
          subItems: [
            { id: 'ta_trace', label: '一物一码追溯流水池', tabTitle: '一物一码追溯', module: 'trace_audit', badge: '1,894万件', badgeColor: 'emerald' },
            { id: 'ta_blockchain', label: '区块链温湿度存证节点', tabTitle: '区块链温控存证', module: 'trace_audit', badge: '存证合规', badgeColor: 'emerald' },
            { id: 'ta_audit', label: '系统操作安全审计日志', tabTitle: '系统操作日志', module: 'trace_audit' },
          ],
        },
      ],
    },
  ];

  // Helper to test if item or its alias is active
  const isModuleActive = (itemModule: TopNavModule, itemId: string) => {
    if (activeModule === itemModule || activeModule === itemId) return true;
    if (itemId === 'work_center' && (activeModule === 'cockpit' || activeModule === 'operation')) return true;
    if (itemId === 'fulfillment' && activeModule === 'order') return true;
    if (itemId === 'system_mgmt' && activeModule === 'user_center') return true;
    return false;
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleMainItemClick = (item: MainMenuItem) => {
    // If not expanded, expand it
    setExpandedMenus(prev => ({
      ...prev,
      [item.id]: true,
    }));

    setActiveModule(item.module);
    const firstSub = item.subItems[0];
    if (firstSub) {
      setSubSidebarItem(firstSub.id);
      openTab({
        id: item.module,
        title: firstSub.tabTitle || item.title,
        module: item.module,
        subModule: firstSub.id,
      });
    } else {
      openTab({
        id: item.module,
        title: item.title,
        module: item.module,
      });
    }
  };

  const handleSubItemClick = (sub: SubMenuItem) => {
    setActiveModule(sub.module);
    setSubSidebarItem(sub.id);
    openTab({
      id: sub.module,
      title: sub.tabTitle,
      module: sub.module,
      subModule: sub.id,
    });
  };

  // Filter items if searching
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return menuCategories;
    const q = searchQuery.toLowerCase().trim();

    return menuCategories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            item.title.toLowerCase().includes(q) ||
            item.subItems.some(sub => sub.label.toLowerCase().includes(q))
        ),
      }))
      .filter(cat => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-14' : 'w-56'
      } bg-white dark:bg-[#1e1f20] border-r border-slate-200/80 dark:border-[#282a2c] flex flex-col select-none shrink-0 h-full text-xs transition-all duration-200 shadow-[1px_0_2px_rgba(0,0,0,0.015)]`}
    >
      {/* Top Header: Clean collapse toggle & menu bar aligned with TabBar h-9 (no redundant logo/title) */}
      <div className="h-9 border-b border-slate-200/70 dark:border-[#282a2c] flex items-center justify-between px-2.5 shrink-0 bg-slate-50/70 dark:bg-[#18191b]">
        {!isCollapsed && (
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-[#f1f3f4] font-semibold text-xs tracking-tight">
            <Layers className="w-3.5 h-3.5 text-[#07c160] dark:text-[#4ade80]" />
            <span>系统功能导航</span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? '展开菜单' : '收起菜单'}
          className={`p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-[#f1f3f4] hover:bg-slate-200/50 dark:hover:bg-[#282a2c] transition-colors cursor-pointer shrink-0 ${
            isCollapsed ? 'mx-auto' : ''
          }`}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4 text-slate-500 dark:text-[#9aa0a6]" /> : <PanelLeftClose className="w-4 h-4 text-slate-500 dark:text-[#9aa0a6]" />}
        </button>
      </div>

      {/* Search Input when expanded */}
      {!isCollapsed && (
        <div className="p-2 border-b border-slate-100 dark:border-[#282a2c] bg-slate-50/30 dark:bg-[#18191b]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#07c160] dark:text-[#4ade80]" />
            <input
              type="text"
              placeholder="搜索系统菜单与功能..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-6 py-1 bg-white dark:bg-[#282a2c] border border-slate-200/80 dark:border-[#3c4043] rounded-lg text-xs focus:outline-none focus:border-[#07c160] dark:focus:border-[#4ade80] text-slate-700 dark:text-[#f1f3f4] placeholder:text-slate-400 dark:placeholder:text-[#80868b] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-[#f1f3f4] text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Menu Categories List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-3.5 scrollbar-thin">
        {filteredCategories.map((cat, catIdx) => (
          <div key={`cat-${catIdx}`} className="space-y-1">
            {/* Category Title Header */}
            {!isCollapsed && (
              <div className="px-2 pt-1 text-[11px] font-semibold text-slate-500 dark:text-[#9aa0a6] tracking-wider">
                {cat.categoryTitle}
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-0.5">
              {cat.items.map(item => {
                const Icon = item.icon;
                const active = isModuleActive(item.module, item.id);
                const isExpanded = !!expandedMenus[item.id] || searchQuery.length > 0;

                return (
                  <div key={item.id} className="space-y-0.5">
                    {/* Main Menu Item */}
                    <button
                      onClick={() => {
                        handleMainItemClick(item);
                        toggleMenu(item.id);
                      }}
                      title={item.title}
                      className={`group w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-slate-100 dark:bg-[#282a2c] text-slate-900 dark:text-[#f1f3f4] font-semibold'
                          : 'text-slate-600 dark:text-[#c4c7c5] hover:bg-slate-50 dark:hover:bg-[#282a2c]/60 hover:text-slate-900 dark:hover:text-[#f1f3f4]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            active ? 'text-[#07c160] dark:text-[#4ade80]' : 'text-slate-400 dark:text-[#80868b] group-hover:text-[#07c160] dark:group-hover:text-[#4ade80]'
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate text-xs">{item.title}</span>
                        )}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center">
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-slate-400 dark:text-[#80868b] transition-transform duration-150 ${
                              isExpanded ? 'rotate-90 text-slate-600 dark:text-[#c4c7c5]' : ''
                            }`}
                          />
                        </div>
                      )}
                    </button>

                    {/* Submenu Items */}
                    {!isCollapsed && isExpanded && item.subItems && item.subItems.length > 0 && (
                      <div className="pl-6 pr-1 py-0.5 space-y-0.5">
                        {item.subItems.map(sub => {
                          const isSubActive = active && subSidebarItem === sub.id;

                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubItemClick(sub)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer text-[11px] ${
                                isSubActive
                                  ? 'bg-emerald-50 dark:bg-emerald-500/15 text-[#07c160] dark:text-[#4ade80] font-semibold border border-emerald-200/60 dark:border-emerald-500/30 shadow-2xs'
                                  : 'text-slate-500 dark:text-[#9aa0a6] hover:bg-slate-100/70 dark:hover:bg-[#282a2c] hover:text-slate-800 dark:hover:text-[#f1f3f4]'
                              }`}
                            >
                              <span className="truncate">{sub.label}</span>
                              {sub.badge && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium border ml-1 shrink-0 ${
                                  sub.badgeColor === 'rose'
                                    ? 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30'
                                    : sub.badgeColor === 'amber'
                                    ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-[#fbbf24] border-amber-200 dark:border-amber-500/30'
                                    : 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-[#4ade80] border-emerald-200/60 dark:border-emerald-500/30'
                                }`}>
                                  {sub.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Info */}
      {!isCollapsed && (
        <div className="p-2 border-t border-slate-100 dark:border-[#282a2c] bg-slate-50/70 dark:bg-[#18191b] text-[11px] text-slate-500 dark:text-[#9aa0a6] flex items-center justify-between">
          <span className="truncate text-slate-500 dark:text-[#9aa0a6]">园区: {selectedPark}</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/15 text-[#07c160] dark:text-[#4ade80] border border-emerald-200/60 dark:border-emerald-500/30 text-[10px] font-medium font-mono">
            {roles.find(r => r.id === currentRole)?.name}
          </span>
        </div>
      )}
    </aside>
  );
};
