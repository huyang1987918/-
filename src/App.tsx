import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { SubSidebar } from './components/layout/SubSidebar';
import { WarehouseView } from './components/warehouse/WarehouseView';
import { RealtimeDashboard } from './components/dashboard/RealtimeDashboard';
import { AnalyticsCenter } from './components/dashboard/AnalyticsCenter';
import { UserPermissionCenter } from './components/rbac/UserPermissionCenter';
import { InventoryView } from './components/inventory/InventoryView';
import { OrderCenterView } from './components/modules/OrderCenterView';
import { TransportCenterView } from './components/modules/TransportCenterView';
import { SettlementCenterView } from './components/modules/SettlementCenterView';
import { ProductCenterView } from './components/modules/ProductCenterView';
import { ParkCenterView } from './components/modules/ParkCenterView';
import { MultimodalView } from './components/modules/MultimodalView';
import { FieldServiceView } from './components/modules/FieldServiceView';
import { PropertyEnergyView } from './components/modules/PropertyEnergyView';
import { ServiceCollabView } from './components/modules/ServiceCollabView';
import { MerchantLeaseView } from './components/modules/MerchantLeaseView';
import { MasterDataView } from './components/modules/MasterDataView';
import { PortalOpsView } from './components/modules/PortalOpsView';
import { MallOpsView } from './components/modules/MallOpsView';
import { TraceAuditView } from './components/modules/TraceAuditView';
import { GenericModuleView } from './components/modules/GenericModuleView';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { Shield, Sparkles, Activity, Sun, Moon } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTabId, activeModule, subSidebarItem, currentRole, roles, setCurrentRole, theme, toggleTheme } = useApp();

  // Render view depending on active tab and module
  const renderContent = () => {
    // 1. User Permission Center / System Management (RBAC)
    if (
      activeTabId === 'system_mgmt' ||
      activeModule === 'system_mgmt' ||
      activeTabId === 'user_center' ||
      activeModule === 'user_center' ||
      subSidebarItem === 'rbac' ||
      subSidebarItem === 'user_list' ||
      subSidebarItem === 'data_scope'
    ) {
      return <UserPermissionCenter />;
    }

    // 2. Comprehensive Operations Analytics Center (OWTB BI & Charts)
    if (
      activeTabId === 'operation' ||
      activeModule === 'operation' ||
      subSidebarItem === 'ops_board' ||
      subSidebarItem === 'owtb_pipeline'
    ) {
      return <AnalyticsCenter />;
    }

    // 2.1 Work Center / Real-time Cockpit (Live Telemetry)
    if (
      activeTabId === 'work_center' ||
      activeModule === 'work_center' ||
      activeTabId === 'cockpit' ||
      activeModule === 'cockpit' ||
      subSidebarItem === 'realtime_cockpit' ||
      subSidebarItem === 'temp_alerts'
    ) {
      return <RealtimeDashboard />;
    }

    // 3. Inventory / Virtual Warehouse / Water Level / 3D Visualization
    if (subSidebarItem === 'virtual_wh') {
      return <InventoryView mode="virtual" />;
    }
    if (subSidebarItem === 'water_level') {
      return <InventoryView mode="water_level" />;
    }
    if (subSidebarItem === 'visual_3d') {
      return <InventoryView mode="visual" />;
    }
    if (activeTabId === 'procurement' || activeModule === 'inventory' || subSidebarItem === 'inventory_mgmt') {
      return <InventoryView mode="inventory" />;
    }

    // 4. OMS (Fulfillment / Order Center)
    if (
      activeTabId === 'fulfillment' ||
      activeModule === 'fulfillment' ||
      activeTabId === 'order' ||
      activeModule === 'order'
    ) {
      return <OrderCenterView />;
    }

    // 5. TMS (Transport Center)
    if (activeTabId === 'transport' || activeModule === 'transport') {
      return <TransportCenterView />;
    }

    // 6. BMS (Billing & Settlement Center)
    if (activeTabId === 'settlement' || activeModule === 'settlement') {
      return <SettlementCenterView />;
    }

    // 7. Product Center
    if (activeTabId === 'product' || activeModule === 'product') {
      return <ProductCenterView />;
    }

    // 8. Park Center
    if (activeTabId === 'park' || activeModule === 'park') {
      return <ParkCenterView />;
    }

    // 9. Multimodal (多式联运)
    if (activeTabId === 'multimodal' || activeModule === 'multimodal') {
      return <MultimodalView />;
    }

    // 10. Field Service (现场服务)
    if (activeTabId === 'field_service' || activeModule === 'field_service') {
      return <FieldServiceView />;
    }

    // 11. Property & Energy (物业能源)
    if (activeTabId === 'property_energy' || activeModule === 'property_energy') {
      return <PropertyEnergyView />;
    }

    // 12. Service Collaboration (服务协同)
    if (activeTabId === 'service_collab' || activeModule === 'service_collab') {
      return <ServiceCollabView />;
    }

    // 13. Merchant & Leasing (招商租赁)
    if (activeTabId === 'merchant_lease' || activeModule === 'merchant_lease') {
      return <MerchantLeaseView />;
    }

    // 14. Master Data (主数据)
    if (activeTabId === 'master_data' || activeModule === 'master_data') {
      return <MasterDataView />;
    }

    // 15. Portal Operations (门户运营)
    if (activeTabId === 'portal_ops' || activeModule === 'portal_ops') {
      return <PortalOpsView />;
    }

    // 16. Mall Operations (商城运营)
    if (activeTabId === 'mall_ops' || activeModule === 'mall_ops') {
      return <MallOpsView />;
    }

    // 17. Traceability & Audit (追溯审计)
    if (activeTabId === 'trace_audit' || activeModule === 'trace_audit') {
      return <TraceAuditView />;
    }

    // Default: Warehouse Management View (The primary screen from user's attachment screenshot!)
    return <WarehouseView />;
  };

  const currentRoleName = roles.find(r => r.id === currentRole)?.name || currentRole;

  return (
    <div className="flex flex-col h-screen w-full bg-[#f0f2f5] dark:bg-[#131314] overflow-hidden text-[#1f1f1f] dark:text-[#f1f3f4] text-xs">
      {/* 1. Top Navigation Bar matching screenshot */}
      <Header />

      {/* 2. Main Workspace: Left Sub-sidebar directly below Header + Right Column (TabBar + Content Area) */}
      <div className="flex flex-1 overflow-hidden">
        <SubSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TabBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#f0f2f5] dark:bg-[#131314]">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Notification Drawer (for top 99+ bell) */}
      <NotificationDrawer />

      {/* Bottom Floating Quick Toolbar (Permissions & Dark Mode) */}
      <div className="fixed bottom-3 right-4 z-40 bg-white/95 dark:bg-[#1e1f20]/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80 dark:border-[#3c4043] px-3.5 py-1.5 flex items-center gap-2.5 text-xs text-slate-800 dark:text-[#f1f3f4]">
        {/* Dark Mode Switch */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? '切换为浅色日间模式' : '切换为深色夜间模式'}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#282a2c] hover:bg-[#333538] text-amber-300'
              : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
          }`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3 h-3 text-amber-300" />
              <span>深色</span>
            </>
          ) : (
            <>
              <Moon className="w-3 h-3 text-indigo-500" />
              <span>浅色</span>
            </>
          )}
        </button>

        <div className="w-px h-3.5 bg-slate-200 dark:bg-[#3c4043]" />

        <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#9aa0a6] font-medium">
          <Shield className="w-3.5 h-3.5 text-amber-500" />
          <span>权限切换:</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentRole('super_admin')}
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
              currentRole === 'super_admin'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-[#c4c7c5] hover:bg-slate-100 dark:hover:bg-[#282a2c]'
            }`}
          >
            超级管理员
          </button>
          <button
            onClick={() => setCurrentRole('warehouse_operator')}
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
              currentRole === 'warehouse_operator'
                ? 'bg-[#07c160] text-white shadow-2xs'
                : 'text-slate-600 dark:text-[#c4c7c5] hover:bg-slate-100 dark:hover:bg-[#282a2c]'
            }`}
          >
            仓储专管员
          </button>
          <button
            onClick={() => setCurrentRole('visitor')}
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
              currentRole === 'visitor'
                ? 'bg-slate-700 dark:bg-slate-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-[#c4c7c5] hover:bg-slate-100 dark:hover:bg-[#282a2c]'
            }`}
          >
            只读访客
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
