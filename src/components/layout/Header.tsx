import React, { useState } from 'react';
import {
  Boxes,
  Bell,
  ChevronDown,
  Activity,
  Shield,
  Check,
  Building2,
  Lock,
  LayoutGrid,
  ClipboardList,
  Truck,
  Receipt,
  Compass,
  Wrench,
  Leaf,
  ShieldCheck,
  Settings,
  Database,
  Globe,
  ShoppingBag,
  History,
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  Home,
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopNavModule } from '../../types';
import { INITIAL_PARKS } from '../../mock/data';

export const Header: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    openTab,
    selectedPark,
    setSelectedPark,
    currentRole,
    setCurrentRole,
    roles,
    currentUser,
    notificationCount,
    setIsNotificationOpen,
    isStreaming,
    setIsStreaming,
    liveStats,
    hasPermission,
    theme,
    toggleTheme,
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isParkMenuOpen, setIsParkMenuOpen] = useState(false);

  const navModules: {
    id: TopNavModule;
    label: string;
    tabTitle: string;
    subModule?: string;
    requiredPermission?: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }[] = [
    { id: 'work_center', label: '工作中心', tabTitle: '工作中心', subModule: 'realtime_cockpit', requiredPermission: 'cockpit:view', icon: LayoutGrid, iconColor: 'text-[#07c160]' },
    { id: 'fulfillment', label: '履约中心', tabTitle: '履约中心', subModule: 'order_list', requiredPermission: 'order:view', icon: ClipboardList, iconColor: 'text-[#07c160]' },
    { id: 'warehouse', label: '仓储管理', tabTitle: '仓库管理', subModule: 'warehouse_mgmt', requiredPermission: 'warehouse:view', icon: Boxes, iconColor: 'text-[#07c160]' },
    { id: 'transport', label: '运输管理', tabTitle: '运输管理', subModule: 'transport_monitor', requiredPermission: 'transport:dispatch', icon: Truck, iconColor: 'text-[#07c160]' },
    { id: 'settlement', label: '计费结算', tabTitle: '计费结算', subModule: 'billing_summary', requiredPermission: 'billing:view', icon: Receipt, iconColor: 'text-[#07c160]' },
    { id: 'multimodal', label: '多式联运', tabTitle: '多式联运', subModule: 'mm_orders', icon: Compass, iconColor: 'text-[#07c160]' },
    { id: 'field_service', label: '现场服务', tabTitle: '现场服务', subModule: 'fs_dock', icon: Wrench, iconColor: 'text-[#07c160]' },
    { id: 'property_energy', label: '物业能源', tabTitle: '物业能源', subModule: 'pe_overview', icon: Leaf, iconColor: 'text-[#07c160]' },
    { id: 'service_collab', label: '服务协同', tabTitle: '服务协同', subModule: 'sc_tickets', icon: ShieldCheck, iconColor: 'text-[#07c160]' },
    { id: 'merchant_lease', label: '招商租赁', tabTitle: '招商租赁', subModule: 'ml_contracts', icon: Building2, iconColor: 'text-[#07c160]' },
    { id: 'system_mgmt', label: '系统管理', tabTitle: '系统管理', subModule: 'rbac', requiredPermission: 'user:manage', icon: Settings, iconColor: 'text-[#07c160]' },
    { id: 'master_data', label: '主数据', tabTitle: '主数据', subModule: 'md_sku', icon: Database, iconColor: 'text-[#07c160]' },
    { id: 'portal_ops', label: '门户运营', tabTitle: '门户运营', subModule: 'po_articles', icon: Globe, iconColor: 'text-[#07c160]' },
    { id: 'mall_ops', label: '商城运营', tabTitle: '商城运营', subModule: 'mo_products', icon: ShoppingBag, iconColor: 'text-[#07c160]' },
    { id: 'trace_audit', label: '追溯审计', tabTitle: '追溯审计', subModule: 'ta_trace', icon: History, iconColor: 'text-[#07c160]' },
  ];

  const handleModuleClick = (module: typeof navModules[0]) => {
    // Check permission
    if (module.requiredPermission && !hasPermission(module.requiredPermission)) {
      alert(`【权限拦截】当前角色（${roles.find(r => r.id === currentRole)?.name}）无权访问【${module.label}】模块，请切换为更高权限角色（如超级管理员）。`);
      return;
    }

    setActiveModule(module.id);
    openTab({
      id: module.id === 'warehouse' ? 'warehouse' : module.id,
      title: module.tabTitle,
      module: module.id,
      subModule: module.subModule,
    });
  };

  const currentRoleObj = roles.find(r => r.id === currentRole);

  return (
    <header className="h-13 bg-white/95 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-4 sticky top-0 z-30 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Left: Brand / Title with WeChat Work Green Logo */}
      <div className="flex items-center gap-2.5 mr-4 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#07c160] to-[#059669] text-white flex items-center justify-center font-bold shadow-xs shadow-emerald-500/20">
          <Boxes className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[13px] text-slate-900 tracking-tight">
            智慧物流园区平台
          </span>
        </div>
      </div>

      {/* Center: Top Navigation Modules with Vivid Semantic Icons */}
      <nav className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none py-1">
        {navModules.map(item => {
          const isActive = activeModule === item.id;
          const isAllowed = !item.requiredPermission || hasPermission(item.requiredPermission);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleModuleClick(item)}
              title={!isAllowed ? '权限不足，无法访问' : item.label}
              className={`group relative px-3 py-1.5 text-xs font-medium transition-all rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs border border-emerald-200/60'
                  : isAllowed
                  ? 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                  : 'text-slate-400 opacity-60 hover:bg-slate-50 cursor-not-allowed'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-colors ${
                  isActive ? 'text-emerald-700' : isAllowed ? 'text-slate-500 group-hover:text-emerald-700' : 'text-slate-400'
                }`}
              />
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#07c160] inline-block animate-pulse" />
              )}
              {!isAllowed && <Lock className="w-3 h-3 text-slate-400 inline" />}
            </button>
          );
        })}
      </nav>

      {/* Right Action Bar (Fresh Chip Controls with Vivid Accent Icons) */}
      <div className="flex items-center gap-2 ml-3 shrink-0">
        {/* Live Stream Indicator & Pause/Play */}
        <button
          onClick={() => setIsStreaming(!isStreaming)}
          title={isStreaming ? '实时数据推送中 (点击暂停)' : '实时数据已暂停 (点击恢复)'}
          className={`hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isStreaming
              ? 'bg-emerald-50/80 text-emerald-700 border-emerald-200/70 hover:bg-emerald-100/70 shadow-2xs'
              : 'bg-slate-100/80 text-slate-600 border-slate-200/70 hover:bg-slate-200/70'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isStreaming ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
            }`}
          />
          <Activity className={`w-3.5 h-3.5 ${isStreaming ? 'text-emerald-600' : 'text-slate-500'}`} />
          <span>{isStreaming ? `实时 ${liveStats.lastTickTime}` : '推送暂停'}</span>
        </button>

        {/* Park Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsParkMenuOpen(!isParkMenuOpen);
              setIsRoleMenuOpen(false);
            }}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 bg-slate-50/80 border border-slate-200/70 px-3 py-1.5 rounded-full transition-all font-medium cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{selectedPark}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isParkMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                选择园区过滤
              </div>
              {INITIAL_PARKS.map(p => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPark(p);
                    setIsParkMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                    selectedPark === p ? 'text-emerald-700 font-semibold bg-emerald-50/70' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className={`w-3.5 h-3.5 ${selectedPark === p ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span>{p}</span>
                  </span>
                  {selectedPark === p && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick RBAC Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setIsRoleMenuOpen(!isRoleMenuOpen);
              setIsParkMenuOpen(false);
            }}
            title="点击快速切换权限角色进行测试"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-amber-50/80 text-amber-700 border-amber-200/70 hover:bg-amber-100/80 transition-all cursor-pointer shadow-2xs"
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>身份: {currentRoleObj?.name}</span>
            <ChevronDown className="w-3 h-3 text-amber-600/70" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 mb-1 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-800">RBAC 角色权限即时切换</div>
                <div className="text-[11px] text-slate-400">切换后界面按钮与数据权限将即时生效</div>
              </div>
              <div className="space-y-1">
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.id);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl transition-colors flex items-start gap-2 cursor-pointer ${
                      currentRole === r.id
                        ? 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/60'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Shield className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${currentRole === r.id ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <div className="flex-1">
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{r.name}</span>
                        {currentRole === r.id && (
                          <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-[#07c160] text-white">
                            当前使用
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {r.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle Button (Gemini Style) */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? '切换为浅色日间模式' : '切换为深色夜间模式'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#282a2c] text-[#e3e3e3] border-[#3c4043] hover:bg-[#333538] hover:text-white shadow-2xs'
              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 shadow-2xs'
          }`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] font-medium tracking-tight">深色模式</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-[11px] font-medium tracking-tight">浅色模式</span>
            </>
          )}
        </button>

        {/* Notification Bell with badge */}
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="relative p-2 rounded-full text-amber-500 hover:text-amber-600 hover:bg-amber-50/80 transition-colors cursor-pointer"
          title="系统异常与预警消息通知"
        >
          <Bell className="w-4.5 h-4.5 text-amber-500" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-xs leading-none">
              99+
            </span>
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200/70">
          <img
            src={currentUser.avatar}
            alt={currentUser.realName}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-100 shadow-2xs"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-medium text-slate-800 leading-tight">
              {currentUser.realName}
            </span>
            <span className="text-[10px] text-slate-400 leading-none">
              {currentUser.department.substring(0, 8)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
