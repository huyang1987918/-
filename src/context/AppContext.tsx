import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TopNavModule,
  TabItem,
  UserRole,
  RoleConfig,
  UserAccount,
  WarehouseItem,
  LiveLogEvent,
  ThemeMode,
} from '../types';
import {
  INITIAL_ROLES,
  INITIAL_USERS,
  INITIAL_WAREHOUSES,
  INITIAL_LOG_EVENTS,
  ALL_PERMISSIONS,
} from '../mock/data';

interface AppContextType {
  // Navigation & Tabs
  activeModule: TopNavModule;
  setActiveModule: (module: TopNavModule) => void;
  tabs: TabItem[];
  activeTabId: string;
  openTab: (tab: Omit<TabItem, 'closable'> & { closable?: boolean }) => void;
  closeTab: (tabId: string) => void;
  setActiveTabId: (tabId: string) => void;
  subSidebarItem: string;
  setSubSidebarItem: (item: string) => void;
  selectedPark: string;
  setSelectedPark: (park: string) => void;

  // RBAC & Permissions
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserAccount;
  setCurrentUser: (user: UserAccount) => void;
  roles: RoleConfig[];
  setRoles: React.Dispatch<React.SetStateAction<RoleConfig[]>>;
  updateRolePermissions: (roleId: UserRole, permissionIds: string[]) => void;
  users: UserAccount[];
  addUser: (user: Omit<UserAccount, 'id' | 'lastLogin'>) => void;
  updateUser: (id: string, updates: Partial<UserAccount>) => void;
  hasPermission: (permissionId: string) => boolean;

  // Warehouse data
  warehouses: WarehouseItem[];
  addWarehouse: (item: Omit<WarehouseItem, 'id' | 'index'>) => void;
  updateWarehouse: (id: string, updates: Partial<WarehouseItem>) => void;
  deleteWarehouse: (id: string) => void;

  // Real-time live dashboard state
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  liveLogs: LiveLogEvent[];
  addLiveLog: (log: Omit<LiveLogEvent, 'id' | 'timestamp'>) => void;
  liveStats: {
    todayOrders: number;
    pendingFulfillment: number;
    interceptedOrders: number;
    totalStockPieces: number;
    warehouseLoadRate: number;
    inboundRate: number; // 件/分
    outboundRate: number; // 件/分
    inTransitVehicles: number;
    onTimeDeliveryRate: number;
    todaySettlementYuan: number;
    lastTickTime: string;
  };

  // Notifications
  notificationCount: number;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  clearNotifications: () => void;

  // Theme (Dark / Light mode)
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeModule, setActiveModule] = useState<TopNavModule>('warehouse');
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: 'operation', title: '运营看板', module: 'operation', closable: true },
    { id: 'cockpit', title: '数据看板', module: 'cockpit', closable: true },
    { id: 'procurement', title: '采购计划', module: 'inventory', closable: true },
    { id: 'warehouse', title: '仓库管理', module: 'warehouse', subModule: 'warehouse_mgmt', closable: true },
    { id: 'product', title: '商品管理', module: 'product', closable: true },
    { id: 'user_center', title: '组织管理', module: 'user_center', subModule: 'rbac', closable: true },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('warehouse');
  const [subSidebarItem, setSubSidebarItem] = useState<string>('warehouse_mgmt');
  const [selectedPark, setSelectedPark] = useState<string>('所有园区');

  // Theme (Dark / Light) state with localStorage persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('smart_park_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('smart_park_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // RBAC State
  const [roles, setRoles] = useState<RoleConfig[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USERS[0]);

  // Keep currentUser role synchronized when currentRole changes
  useEffect(() => {
    setCurrentUser(prev => ({
      ...prev,
      role: currentRole,
    }));
  }, [currentRole]);

  // Permission checking helper
  const hasPermission = (permissionId: string): boolean => {
    const roleConfig = roles.find(r => r.id === currentRole);
    if (!roleConfig) return false;
    return roleConfig.permissions.includes(permissionId);
  };

  const updateRolePermissions = (roleId: UserRole, permissionIds: string[]) => {
    setRoles(prev =>
      prev.map(r => (r.id === roleId ? { ...r, permissions: permissionIds } : r))
    );
  };

  const addUser = (user: Omit<UserAccount, 'id' | 'lastLogin'>) => {
    const newUser: UserAccount = {
      ...user,
      id: `u-${Date.now()}`,
      lastLogin: '刚刚创建',
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<UserAccount>) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
  };

  // Warehouses
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>(INITIAL_WAREHOUSES);

  const addWarehouse = (item: Omit<WarehouseItem, 'id' | 'index'>) => {
    const newWh: WarehouseItem = {
      ...item,
      id: `wh-${Date.now()}`,
      index: warehouses.length + 1,
    };
    setWarehouses(prev => [newWh, ...prev]);
    addLiveLog({
      type: 'warehouse',
      level: 'success',
      text: `新仓库【${newWh.name}】已成功录入，归属【${newWh.park}】，容量 ${newWh.totalCapacity} m³`,
      park: newWh.park,
    });
  };

  const updateWarehouse = (id: string, updates: Partial<WarehouseItem>) => {
    setWarehouses(prev => prev.map(w => (w.id === id ? { ...w, ...updates } : w)));
  };

  const deleteWarehouse = (id: string) => {
    setWarehouses(prev => {
      const filtered = prev.filter(w => w.id !== id);
      return filtered.map((w, idx) => ({ ...w, index: idx + 1 }));
    });
  };

  // Live streaming & real-time simulation
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [liveLogs, setLiveLogs] = useState<LiveLogEvent[]>(INITIAL_LOG_EVENTS);
  const [liveStats, setLiveStats] = useState({
    todayOrders: 18492,
    pendingFulfillment: 342,
    interceptedOrders: 12,
    totalStockPieces: 1429800,
    warehouseLoadRate: 78.5,
    inboundRate: 420,
    outboundRate: 580,
    inTransitVehicles: 142,
    onTimeDeliveryRate: 99.2,
    todaySettlementYuan: 3842500,
    lastTickTime: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
  });

  const addLiveLog = (log: Omit<LiveLogEvent, 'id' | 'timestamp'>) => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    const newLog: LiveLogEvent = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: time,
    };
    setLiveLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  // Real-time ticker effect
  useEffect(() => {
    if (!isStreaming) return;

    const timer = setInterval(() => {
      const nowTime = new Date().toLocaleTimeString('zh-CN', { hour12: false });
      const orderDelta = Math.floor(Math.random() * 4) + 1;
      const inboundDelta = Math.floor(Math.random() * 9) - 4;
      const outboundDelta = Math.floor(Math.random() * 11) - 5;
      const priceDelta = Math.floor(Math.random() * 1200) + 300;

      setLiveStats(prev => ({
        ...prev,
        todayOrders: prev.todayOrders + orderDelta,
        inboundRate: Math.max(350, Math.min(520, prev.inboundRate + inboundDelta)),
        outboundRate: Math.max(480, Math.min(680, prev.outboundRate + outboundDelta)),
        totalStockPieces: prev.totalStockPieces + (inboundDelta > 0 ? 12 : -8),
        todaySettlementYuan: prev.todaySettlementYuan + priceDelta,
        lastTickTime: nowTime,
      }));

      // Random dynamic live event every ~8-12 seconds
      if (Math.random() > 0.65) {
        const sampleParks = ['流程园区', '江西供销产业园', '赣州冷链产业园', '萍乡现代物流港', '九江共青城产业园'];
        const p = sampleParks[Math.floor(Math.random() * sampleParks.length)];
        const types: ('order' | 'warehouse' | 'transport' | 'billing')[] = ['order', 'warehouse', 'transport', 'billing'];
        const t = types[Math.floor(Math.random() * types.length)];

        let txt = '';
        let lvl: 'info' | 'warning' | 'success' = 'info';

        if (t === 'order') {
          txt = `【${p}】收到新的出库调拨单 #${Math.floor(100000 + Math.random() * 900000)}，自动触发AGV立体货架拣选`;
          lvl = 'info';
        } else if (t === 'warehouse') {
          txt = `【${p}】生鲜保鲜库完成自动化温度校准，当前维持恒温 -18.5℃`;
          lvl = 'success';
        } else if (t === 'transport') {
          txt = `干线冷藏车【赣B·${Math.floor(1000 + Math.random() * 9000)}F】已进入【${p}】道闸系统，指派至14号月台卸货`;
          lvl = 'info';
        } else {
          txt = `【${p}】生成自动化装卸运费结算凭证，应付金额 ¥${(Math.random() * 5000 + 1000).toFixed(2)}`;
          lvl = 'success';
        }

        addLiveLog({
          type: t,
          level: lvl,
          text: txt,
          park: p,
        });
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [isStreaming]);

  // Notifications
  const [notificationCount, setNotificationCount] = useState<number>(99);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  // Tab management
  const openTab = (tab: Omit<TabItem, 'closable'> & { closable?: boolean }) => {
    setTabs(prev => {
      const exists = prev.find(t => t.id === tab.id);
      if (exists) return prev;
      return [...prev, { ...tab, closable: tab.closable !== false }];
    });
    setActiveTabId(tab.id);
    setActiveModule(tab.module);
    if (tab.subModule) {
      setSubSidebarItem(tab.subModule);
    }
  };

  const closeTab = (tabId: string) => {
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId && filtered.length > 0) {
        const next = filtered[filtered.length - 1];
        setActiveTabId(next.id);
        setActiveModule(next.module);
        if (next.subModule) setSubSidebarItem(next.subModule);
      }
      return filtered;
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeModule,
        setActiveModule,
        tabs,
        activeTabId,
        openTab,
        closeTab,
        setActiveTabId,
        subSidebarItem,
        setSubSidebarItem,
        selectedPark,
        setSelectedPark,
        currentRole,
        setCurrentRole,
        currentUser,
        setCurrentUser,
        roles,
        setRoles,
        updateRolePermissions,
        users,
        addUser,
        updateUser,
        hasPermission,
        warehouses,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
        isStreaming,
        setIsStreaming,
        liveLogs,
        addLiveLog,
        liveStats,
        notificationCount,
        isNotificationOpen,
        setIsNotificationOpen,
        clearNotifications,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
