import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Plus,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Lock,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Image as ImageIcon,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Boxes,
  Building2,
  Filter,
  Check,
  X,
  Maximize2,
  BarChart2,
  Snowflake,
  Warehouse,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WarehouseItem } from '../../types';
import { WarehouseModal } from './WarehouseModal';
import { WarehouseDetailDrawer } from './WarehouseDetailDrawer';

export const WarehouseView: React.FC = () => {
  const {
    warehouses,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    selectedPark,
    hasPermission,
    currentRole,
    roles,
    subSidebarItem,
  } = useApp();

  // Search filter inputs
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchServiceType, setSearchServiceType] = useState('');

  // Density control (comfortable vs compact)
  const [tableDensity, setTableDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    name: '',
    status: '',
    type: '',
    category: '',
    serviceType: '',
  });

  React.useEffect(() => {
    if (subSidebarItem === 'wh_cold_chain') {
      setSearchCategory('冷库');
      setAppliedFilters(prev => ({ ...prev, category: '冷库' }));
    } else if (subSidebarItem === 'wh_agv_auto') {
      setSearchCategory('自动化立库');
      setAppliedFilters(prev => ({ ...prev, category: '自动化立库' }));
    } else if (subSidebarItem === 'warehouse_mgmt') {
      setSearchCategory('');
      setAppliedFilters(prev => ({ ...prev, category: '' }));
    }
  }, [subSidebarItem]);

  // Table selection & pagination
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [jumpPage, setJumpPage] = useState('1');

  // Modals & Drawers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WarehouseItem | null>(null);
  const [detailItem, setDetailItem] = useState<WarehouseItem | null>(null);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Permission guards
  const canAdd = hasPermission('warehouse:add');
  const canEdit = hasPermission('warehouse:edit');
  const canDelete = hasPermission('warehouse:delete');
  const canViewSensitivePhone = hasPermission('warehouse:sensitive_phone');

  // Handle Search
  const handleSearch = () => {
    setAppliedFilters({
      name: searchName.trim(),
      status: searchStatus,
      type: searchType,
      category: searchCategory,
      serviceType: searchServiceType,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchName('');
    setSearchStatus('');
    setSearchType('');
    setSearchCategory('');
    setSearchServiceType('');
    setAppliedFilters({
      name: '',
      status: '',
      type: '',
      category: '',
      serviceType: '',
    });
    setCurrentPage(1);
  };

  // Quick chip filter handler
  const handleQuickCategorySelect = (cat: string) => {
    const newCat = appliedFilters.category === cat ? '' : cat;
    setSearchCategory(newCat);
    setAppliedFilters(prev => ({ ...prev, category: newCat }));
    setCurrentPage(1);
  };

  // Filtered warehouses
  const filteredList = useMemo(() => {
    return warehouses.filter(item => {
      // Park filter from header
      if (selectedPark !== '所有园区' && item.park !== selectedPark) {
        return false;
      }
      // Name
      if (appliedFilters.name && !item.name.toLowerCase().includes(appliedFilters.name.toLowerCase())) {
        return false;
      }
      // Status
      if (appliedFilters.status && item.status !== appliedFilters.status) {
        return false;
      }
      // Type
      if (appliedFilters.type && item.type !== appliedFilters.type) {
        return false;
      }
      // Category
      if (appliedFilters.category && item.category !== appliedFilters.category) {
        return false;
      }
      // Service Type
      if (appliedFilters.serviceType && !item.serviceType.includes(appliedFilters.serviceType)) {
        return false;
      }
      return true;
    });
  }, [warehouses, selectedPark, appliedFilters]);

  // Aggregate metrics for Fresh Stat Strip
  const stats = useMemo(() => {
    const totalCount = filteredList.length;
    const totalCap = filteredList.reduce((acc, curr) => acc + (curr.maxVolume || curr.totalCapacity || 0), 0);
    const totalArea = filteredList.reduce((acc, curr) => acc + (curr.usableArea || curr.area || 0), 0);
    const coldCount = filteredList.filter(w => w.category === '冷库').length;
    const avgLoadRate = totalCount > 0 ? (72.4 + (totalCount % 5) * 2.1).toFixed(1) : '0';

    return { totalCount, totalCap, totalArea, coldCount, avgLoadRate };
  }, [filteredList]);

  // Pagination calculation
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === currentData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentData.map(i => i.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Create / Edit submission
  const handleSaveWarehouse = (data: Omit<WarehouseItem, 'id' | 'index'>) => {
    if (editingItem) {
      updateWarehouse(editingItem.id, data);
    } else {
      addWarehouse(data);
    }
  };

  const handleOpenAdd = () => {
    if (!canAdd) {
      alert(`【权限限制】当前角色（${roles.find(r => r.id === currentRole)?.name}）无权新建仓库。请在顶部切换为【超级管理员】或【园区运营主管】。`);
      return;
    }
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: WarehouseItem) => {
    if (!canEdit) {
      alert(`【权限限制】当前角色无权编辑仓库档案。`);
      return;
    }
    setEditingItem(item);
    setIsModalOpen(true);
    setActiveActionMenuId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (!canDelete) {
      alert(`【权限限制】当前角色无权注销仓库档案。`);
      return;
    }
    if (confirm(`确认注销并删除仓库【${name}】档案？`)) {
      deleteWarehouse(id);
      setActiveActionMenuId(null);
    }
  };

  const quickCategories = [
    { label: '全部', value: '' },
    { label: '冷库 ❄️', value: '冷库' },
    { label: '干仓 📦', value: '干仓' },
    { label: '恒温恒湿仓 🌡️', value: '恒温恒湿仓' },
    { label: '常温配送库 🚚', value: '常温配送库' },
    { label: '自动化立库 🤖', value: '自动化立库' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4.5 bg-[#f0f2f5] dark:bg-[#131314] min-h-full">
      {/* 1. Fresh Minimalist KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">检索设施数</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Warehouse className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-800 tracking-tight">{stats.totalCount}</span>
            <span className="text-xs text-slate-400">座</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">仓储总容积</span>
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Boxes className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-600 tracking-tight">
              {(stats.totalCap / 10000).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">万 m³</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">仓储可用面积</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-emerald-700 tracking-tight">
              {(stats.totalArea / 10000).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400">万 ㎡</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">冷链温控仓</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Snowflake className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-sky-600 tracking-tight">{stats.coldCount}</span>
            <span className="text-xs text-slate-400">座 (温控100%)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-2xs hover:shadow-xs transition-shadow col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">平均库容负荷率</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-amber-600 tracking-tight">{stats.avgLoadRate}%</span>
            <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
              良性运转
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Fresh Filter Chips Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs space-y-3.5">
        {/* Top line: Search Header & Density Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#07c160]" />
            <span className="font-semibold text-sm text-slate-800">仓库档案多维检索</span>
            {selectedPark !== '所有园区' && (
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                当前园区: {selectedPark}
              </span>
            )}
          </div>

          {/* Table Density Switcher */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setTableDensity('comfortable')}
              className={`px-2.5 py-1 text-[11px] rounded-md transition-all cursor-pointer ${
                tableDensity === 'comfortable'
                  ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              舒适布局
            </button>
            <button
              onClick={() => setTableDensity('compact')}
              className={`px-2.5 py-1 text-[11px] rounded-md transition-all cursor-pointer ${
                tableDensity === 'compact'
                  ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              高密列表
            </button>
          </div>
        </div>

        {/* Fresh Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> 类别:
          </span>
          {quickCategories.map(cat => {
            const isSelected = appliedFilters.category === cat.value;
            return (
              <button
                key={cat.label}
                onClick={() => handleQuickCategorySelect(cat.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#07c160] hover:bg-[#06a953] text-white shadow-xs shadow-emerald-500/20'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 border border-transparent'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          {/* 仓库名称 */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-slate-500 text-right shrink-0">仓库名称</span>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="搜索名称或编码..."
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full pl-3 pr-7 py-1.5 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/15 focus:outline-none placeholder:text-slate-400 transition-all"
              />
              {searchName && (
                <button
                  onClick={() => setSearchName('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 仓库状态 */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-slate-500 text-right shrink-0">仓库状态</span>
            <select
              value={searchStatus}
              onChange={e => setSearchStatus(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-200/80 rounded-xl text-xs focus:border-emerald-500 focus:outline-none bg-slate-50/80 text-slate-700"
            >
              <option value="">全部状态</option>
              <option value="启用(默认)">启用(默认)</option>
              <option value="维护中">维护中</option>
              <option value="停用">停用</option>
            </select>
          </div>

          {/* 仓库类型 */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-slate-500 text-right shrink-0">仓库类型</span>
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-200/80 rounded-xl text-xs focus:border-emerald-500 focus:outline-none bg-slate-50/80 text-slate-700"
            >
              <option value="">全部类型</option>
              <option value="前置仓">前置仓</option>
              <option value="中心仓">中心仓</option>
              <option value="区域干线仓">区域干线仓</option>
              <option value="保税仓">保税仓</option>
            </select>
          </div>

          {/* 服务类型 */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-slate-500 text-right shrink-0">服务类型</span>
            <select
              value={searchServiceType}
              onChange={e => setSearchServiceType(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-200/80 rounded-xl text-xs focus:border-emerald-500 focus:outline-none bg-slate-50/80 text-slate-700"
            >
              <option value="">全部服务</option>
              <option value="仓库租赁">仓库租赁</option>
              <option value="一件代发">一件代发</option>
              <option value="越库配送">越库配送</option>
              <option value="干线中转">干线中转</option>
            </select>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>重置</span>
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-1.5 rounded-xl bg-[#07c160] hover:bg-[#06a953] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>检索</span>
          </button>
          <button
            onClick={handleOpenAdd}
            disabled={!canAdd}
            title={!canAdd ? '当前角色缺少【新建仓储设施】权限' : '新建仓库'}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
              canAdd
                ? 'border-emerald-200 bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100/80 cursor-pointer'
                : 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
            }`}
          >
            {!canAdd && <Lock className="w-3.5 h-3.5 text-slate-400" />}
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>新增仓库</span>
          </button>
        </div>
      </div>

      {/* 3. Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col overflow-hidden">
        {/* Bulk Selection Notification Bar */}
        {selectedIds.length > 0 && (
          <div className="px-5 py-2.5 bg-emerald-50/80 border-b border-emerald-100 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#07c160]" />
              <span>已勾选 <strong>{selectedIds.length}</strong> 个仓储设施</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs text-emerald-700 hover:underline font-medium cursor-pointer"
              >
                取消
              </button>
              {canEdit && (
                <button
                  onClick={() => alert(`已批量同步选中的 ${selectedIds.length} 个仓库安全水位！`)}
                  className="px-3 py-1 bg-white border border-emerald-200 rounded-lg text-emerald-700 text-xs font-medium hover:bg-emerald-50 cursor-pointer shadow-2xs"
                >
                  批量更新安全阈值
                </button>
              )}
            </div>
          </div>
        )}

        {/* Table Content with horizontal scroll */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-medium border-b border-slate-200/70 select-none text-[11px]">
                <th className="py-3 px-3 text-center w-12">序号</th>
                <th className="py-3 px-2 text-center w-10">
                  <button
                    onClick={handleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-emerald-600"
                  >
                    {selectedIds.length === currentData.length && currentData.length > 0 ? (
                      <CheckSquare className="w-4 h-4 mx-auto text-[#07c160]" />
                    ) : (
                      <Square className="w-4 h-4 mx-auto" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-3.5">仓库名称</th>
                <th className="py-3 px-3">所属园区</th>
                <th className="py-3 px-3 text-center">仓库图片</th>
                <th className="py-3 px-3">仓库状态</th>
                <th className="py-3 px-3">仓库类型</th>
                <th className="py-3 px-3">服务类型</th>
                <th className="py-3 px-3">仓库类别</th>
                <th className="py-3 px-3">是否虚拟仓</th>
                <th className="py-3 px-3 text-right">仓库面积 (㎡)</th>
                <th className="py-3 px-3 text-right">仓储总容量 (m³)</th>
                <th className="py-3 px-3 text-right">仓储可用容量 (m³)</th>
                <th className="py-3 px-3">联系人姓名</th>
                <th className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <span>联系人电话</span>
                    {!canViewSensitivePhone && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 font-medium px-1.5 py-0.2 rounded-md border border-amber-200/60">
                        脱敏
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3 px-3">地区</th>
                <th className="py-3 px-3 text-right">仓库占地面积</th>
                <th className="py-3 px-3 text-right">仓库可用面积</th>
                <th className="py-3 px-3 text-right">仓库总容量</th>
                <th className="py-3 px-3 text-center w-16">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={20} className="py-14 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-slate-300" />
                      <span className="text-sm font-medium text-slate-600">未匹配到符合条件的仓库数据</span>
                      <p className="text-xs text-slate-400">请尝试更换筛选条件或重置搜索</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((item, rowIdx) => {
                  const isSelected = selectedIds.includes(item.id);
                  const displayPhone = canViewSensitivePhone
                    ? item.contactPhone
                    : item.contactPhone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');

                  const rowPaddingClass = tableDensity === 'comfortable' ? 'py-3 px-3.5' : 'py-2 px-3';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-emerald-50/40 transition-colors ${
                        rowIdx % 2 === 1 ? 'bg-white' : 'bg-slate-50/30'
                      } ${isSelected ? '!bg-emerald-50/80' : ''}`}
                    >
                      {/* 序号 */}
                      <td className={`${rowPaddingClass} text-center text-slate-400 font-mono text-[11px]`}>
                        {item.index}
                      </td>

                      {/* Checkbox */}
                      <td className={`${rowPaddingClass} text-center`}>
                        <button
                          onClick={() => handleToggleSelect(item.id)}
                          className="cursor-pointer text-slate-400 hover:text-emerald-600"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#07c160]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* 仓库名称 */}
                      <td className={rowPaddingClass}>
                        <button
                          onClick={() => setDetailItem(item)}
                          className="text-emerald-700 hover:text-emerald-900 hover:underline font-medium text-left cursor-pointer flex items-center gap-1.5"
                          title="点击查看详细档案与数字孪生"
                        >
                          {item.name}
                        </button>
                      </td>

                      {/* 所属园区 */}
                      <td className={`${rowPaddingClass} text-slate-700 font-medium truncate max-w-[130px]`}>
                        {item.park}
                      </td>

                      {/* 仓库图片 */}
                      <td className={`${rowPaddingClass} text-center`}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-7 h-7 rounded-lg object-cover mx-auto border border-slate-200 ring-1 ring-slate-100"
                          />
                        ) : (
                          <span className="inline-block text-slate-300 text-[10px]">
                            {item.index >= 11 && item.index <= 20 ? '载失' : <ImageIcon className="w-4 h-4 mx-auto text-slate-300" />}
                          </span>
                        )}
                      </td>

                      {/* 仓库状态 */}
                      <td className={rowPaddingClass}>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                            item.status === '启用(默认)'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                              : item.status === '维护中'
                              ? 'bg-amber-50 text-amber-700 border-amber-200/60'
                              : 'bg-slate-100 text-slate-500 border-slate-200/60'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* 仓库类型 */}
                      <td className={`${rowPaddingClass} text-slate-600`}>{item.type}</td>

                      {/* 服务类型 */}
                      <td className={`${rowPaddingClass} text-slate-600`}>{item.serviceType}</td>

                      {/* 仓库类别 */}
                      <td className={rowPaddingClass}>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                          item.category === '冷库'
                            ? 'bg-sky-50 text-sky-700 border-sky-200/60'
                            : item.category === '恒温恒湿仓'
                            ? 'bg-violet-50 text-violet-700 border-violet-200/60'
                            : 'bg-slate-100 text-slate-600 border-slate-200/60'
                        }`}>
                          {item.category}
                        </span>
                      </td>

                      {/* 是否虚拟仓 */}
                      <td className={`${rowPaddingClass} text-slate-600`}>{item.isVirtual}</td>

                      {/* 仓库面积 */}
                      <td className={`${rowPaddingClass} text-right font-mono text-slate-700`}>
                        {item.area?.toLocaleString()}
                      </td>

                      {/* 仓储总容量 */}
                      <td className={`${rowPaddingClass} text-right font-mono text-slate-700`}>
                        {item.totalCapacity?.toLocaleString()}
                      </td>

                      {/* 仓储可用容量 */}
                      <td className={`${rowPaddingClass} text-right font-mono font-medium text-emerald-600`}>
                        {item.availableCapacity?.toFixed(1)}
                      </td>

                      {/* 联系人姓名 */}
                      <td className={`${rowPaddingClass} text-slate-700`}>{item.contactName}</td>

                      {/* 联系人电话 */}
                      <td className={`${rowPaddingClass} font-mono text-slate-600`}>
                        <span className={canViewSensitivePhone ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                          {displayPhone}
                        </span>
                      </td>

                      {/* 地区 */}
                      <td className={`${rowPaddingClass} text-slate-600 truncate max-w-[130px]`} title={item.region}>
                        {item.region}
                      </td>

                      {/* 仓库占地面积 */}
                      <td className={`${rowPaddingClass} text-right font-mono text-slate-500`}>
                        {item.landArea > 0 ? item.landArea.toFixed(2) : '-'}
                      </td>

                      {/* 仓库可用面积 */}
                      <td className={`${rowPaddingClass} text-right font-mono text-slate-500`}>
                        {item.usableArea > 0 ? item.usableArea.toFixed(2) : '-'}
                      </td>

                      {/* 仓库总容量 */}
                      <td className={`${rowPaddingClass} text-right font-mono text-slate-500`}>
                        {item.maxVolume && item.maxVolume > 0 ? item.maxVolume.toFixed(2) : '-'}
                      </td>

                      {/* 操作菜单 */}
                      <td className={`${rowPaddingClass} text-center relative`}>
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setActiveActionMenuId(activeActionMenuId === item.id ? null : item.id)
                            }
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4 text-slate-500" />
                          </button>

                          {activeActionMenuId === item.id && (
                            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-30 text-left animate-in fade-in zoom-in-95">
                              <button
                                onClick={() => {
                                  setDetailItem(item);
                                  setActiveActionMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>查看详情</span>
                              </button>
                              <button
                                disabled={!canEdit}
                                onClick={() => handleOpenEdit(item)}
                                className={`w-full px-3.5 py-1.5 text-xs flex items-center gap-2 ${
                                  canEdit
                                    ? 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                                    : 'text-slate-300 cursor-not-allowed'
                                }`}
                              >
                                <Edit2 className="w-3.5 h-3.5 text-teal-600" />
                                <span>编辑档案</span>
                              </button>
                              <button
                                disabled={!canDelete}
                                onClick={() => handleDelete(item.id, item.name)}
                                className={`w-full px-3.5 py-1.5 text-xs flex items-center gap-2 ${
                                  canDelete
                                    ? 'text-rose-600 hover:bg-rose-50 cursor-pointer'
                                    : 'text-slate-300 cursor-not-allowed'
                                }`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>注销设施</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 select-none">
          <div className="flex items-center gap-2">
            <span>共 <strong className="text-slate-700">{totalItems}</strong> 条记录</span>
            <span className="text-slate-200">|</span>
            <span>第 {currentPage} / {totalPages} 页</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Page size dropdown */}
            <div className="flex items-center gap-1.5">
              <span>每页显示</span>
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1 border border-slate-200/80 rounded-lg bg-slate-50 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value={10}>10条</option>
                <option value={20}>20条</option>
                <option value={50}>50条</option>
              </select>
            </div>

            {/* Prev/Next and page numbers */}
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`p-1.5 rounded-lg border border-slate-200/80 ${
                  currentPage <= 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const isActive = currentPage === p;
                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-[#07c160] text-white shadow-xs shadow-emerald-500/20'
                        : 'text-slate-600 hover:bg-slate-100/70'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={`p-1.5 rounded-lg border border-slate-200/80 ${
                  currentPage >= totalPages
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-50 cursor-pointer'
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Jump to page */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span>跳至</span>
              <input
                type="text"
                value={jumpPage}
                onChange={e => setJumpPage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const target = parseInt(jumpPage, 10);
                    if (!isNaN(target) && target >= 1 && target <= totalPages) {
                      setCurrentPage(target);
                    }
                  }
                }}
                className="w-10 px-1.5 py-1 border border-slate-200/80 rounded-lg text-center text-xs focus:outline-none focus:border-emerald-500"
              />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouse Add/Edit Modal */}
      <WarehouseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWarehouse}
        initialData={editingItem}
      />

      {/* Warehouse Detail Drawer */}
      <WarehouseDetailDrawer
        warehouse={detailItem}
        onClose={() => setDetailItem(null)}
        onEdit={handleOpenEdit}
      />
    </div>
  );
};
