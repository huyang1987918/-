export type TopNavModule =
  // 1. 工作中心与驾驶舱
  | 'work_center'     // 工作中心
  | 'cockpit'         // 驾驶舱
  | 'operation'       // 运营看板
  // 2. 供应链协同 (OTWB)
  | 'fulfillment'     // 履约中心 (OMS)
  | 'order'           // 订单中心 (alias)
  | 'warehouse'       // 仓储管理 (WMS)
  | 'transport'       // 运输管理 (TMS)
  | 'settlement'      // 计费结算 (BMS)
  | 'inventory'       // 采销库存
  | 'product'         // 商品中心
  | 'park'            // 园区中心
  // 3. 园区物联与现场运营
  | 'multimodal'      // 多式联运
  | 'field_service'   // 现场服务
  | 'property_energy' // 物业能源
  | 'service_collab'  // 服务协同
  | 'merchant_lease'  // 招商租赁
  // 4. 系统与综合管理
  | 'system_mgmt'     // 系统管理
  | 'user_center'     // 用户中心 (alias)
  | 'master_data'     // 主数据
  | 'portal_ops'      // 门户运营
  | 'mall_ops'        // 商城运营
  | 'trace_audit';    // 追溯审计

export interface TabItem {
  id: string;
  title: string;
  module: TopNavModule;
  subModule?: string;
  closable?: boolean;
}

export type UserRole = 'super_admin' | 'ops_manager' | 'warehouse_operator' | 'transport_dispatcher' | 'billing_auditor' | 'visitor';

export interface Permission {
  id: string;
  name: string;
  category: 'dashboard' | 'warehouse' | 'order' | 'transport' | 'billing' | 'user';
  description: string;
}

export interface RoleConfig {
  id: UserRole;
  name: string;
  badgeColor: string;
  description: string;
  permissions: string[];
}

export interface UserAccount {
  id: string;
  username: string;
  realName: string;
  avatar: string;
  phone: string;
  department: string;
  role: UserRole;
  parkScope: string[]; // ['all'] or specific parks
  status: 'active' | 'disabled';
  lastLogin: string;
}

export interface WarehouseItem {
  id: string;
  index: number;
  name: string;
  park: string;
  imageUrl?: string;
  status: '启用(默认)' | '停用' | '维护中';
  type: '前置仓' | '中心仓' | '区域干线仓' | '保税仓';
  serviceType: string;
  category: '干仓' | '冷库' | '常温配送库' | '恒温恒湿仓' | '自动化立库';
  isVirtual: '实体(默认)' | '虚拟仓';
  area: number; // 仓库面积 (㎡)
  totalCapacity: number; // 仓储总容量 (m³)
  availableCapacity: number; // 仓储可用容量 (m³)
  contactName: string;
  contactPhone: string;
  region: string;
  landArea: number; // 仓库占地面积
  usableArea: number; // 仓库可用面积
  maxVolume?: number; // 仓库总容量
}

export interface RealtimeMetric {
  title: string;
  code: 'O' | 'W' | 'T' | 'B';
  primaryValue: string | number;
  unit: string;
  subLabel1: string;
  subValue1: string;
  subLabel2: string;
  subValue2: string;
  trend: 'up' | 'down';
  changeRate: string;
  statusColor: string;
}

export interface LiveLogEvent {
  id: string;
  timestamp: string;
  type: 'order' | 'warehouse' | 'transport' | 'alert' | 'billing';
  level: 'info' | 'warning' | 'success' | 'danger';
  text: string;
  park: string;
}

export type ThemeMode = 'light' | 'dark';
