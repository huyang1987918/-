import React, { useState } from 'react';
import {
  Shield,
  Users,
  KeyRound,
  CheckCircle2,
  XCircle,
  Plus,
  Lock,
  Unlock,
  Eye,
  Building2,
  Check,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, UserAccount } from '../../types';
import { ALL_PERMISSIONS, INITIAL_PARKS } from '../../mock/data';

export const UserPermissionCenter: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    setCurrentUser,
    roles,
    updateRolePermissions,
    users,
    addUser,
    updateUser,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'users' | 'security'>('matrix');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    realName: '',
    phone: '',
    department: '赣州冷链运营处',
    role: 'warehouse_operator' as UserRole,
    parkScope: ['江西供销产业园'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    status: 'active' as 'active' | 'disabled',
  });

  const handleTogglePermission = (roleId: UserRole, permId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    let newPermissions: string[];
    if (role.permissions.includes(permId)) {
      newPermissions = role.permissions.filter(p => p !== permId);
    } else {
      newPermissions = [...role.permissions, permId];
    }

    updateRolePermissions(roleId, newPermissions);
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.username.trim() || !newUserForm.realName.trim()) {
      alert('请填写完整的账号名与真实姓名');
      return;
    }
    addUser(newUserForm);
    setIsAddUserModalOpen(false);
    setNewUserForm({
      username: '',
      realName: '',
      phone: '',
      department: '赣州冷链运营处',
      role: 'warehouse_operator',
      parkScope: ['江西供销产业园'],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      status: 'active',
    });
  };

  const handleSwitchLoginUser = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    alert(`已成功切换登录身份为【${user.realName}】（角色：${roles.find(r => r.id === user.role)?.name}）。权限与数据视图已即时同步！`);
  };

  return (
    <div className="p-4 md:p-6 space-y-5 bg-[#f8fafc] min-h-full">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-4 md:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#07c160] flex items-center justify-center border border-emerald-100">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
              用户权限控制中心 (RBAC 角色权限体系)
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                支持即时热生效
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              控制菜单访问权限、操作按钮权限（增删改）、敏感字段（如联系人明文手机号）脱敏保护以及多园区数据范围。
            </p>
          </div>
        </div>

        {/* Sub Navigation switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/60 text-xs">
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'matrix' ? 'bg-white text-emerald-700 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-[#07c160]" />
            <span>角色权限矩阵</span>
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'users' ? 'bg-white text-emerald-700 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#07c160]" />
            <span>用户账号列表 ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'security' ? 'bg-white text-emerald-700 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#07c160]" />
            <span>数据脱敏验证</span>
          </button>
        </div>
      </div>

      {/* Tab 1: RBAC Permission Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs overflow-hidden">
          <div className="p-4 md:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#07c160]" />
                全系统功能与数据权限对照矩阵 (可勾选动态授权)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                修改勾选状态后，拥有该角色的用户将立即获得或失去对应的菜单与操作权限。
              </p>
            </div>
            <div className="text-xs text-slate-500">
              当前全局预设角色：<strong className="text-slate-800">{roles.length}</strong> 个
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200/70 text-[11px]">
                  <th className="py-3 px-4 font-semibold w-56">权限项名称 / 编码</th>
                  <th className="py-3 px-4 font-semibold">权限说明</th>
                  {roles.map(r => (
                    <th key={r.id} className="py-3 px-3 text-center min-w-[110px]">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-slate-800">{r.name}</span>
                        {currentRole === r.id && (
                          <span className="mt-0.5 text-[10px] bg-[#07c160] text-white px-1.5 py-0.2 rounded-full font-normal">
                            当前身份
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ALL_PERMISSIONS.map(p => {
                  return (
                    <tr key={p.id} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-slate-800">
                        <div className="flex flex-col">
                          <span>{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 text-[11px]">{p.description}</td>
                      {roles.map(r => {
                        const hasThisPerm = r.permissions.includes(p.id);

                        return (
                          <td key={r.id} className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => handleTogglePermission(r.id, p.id)}
                              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                                hasThisPerm
                                  ? 'text-[#07c160] hover:bg-emerald-50'
                                  : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                              }`}
                              title={hasThisPerm ? '点击取消该权限' : '点击赋予该权限'}
                            >
                              {hasThisPerm ? (
                                <CheckCircle2 className="w-5 h-5 mx-auto text-[#07c160]" />
                              ) : (
                                <XCircle className="w-5 h-5 mx-auto" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: User Accounts List */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#07c160]" />
                系统员工与运维账号列表
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                支持管理员工所属园区数据隔离、修改角色及一键切换登录测试
              </p>
            </div>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#07c160] hover:bg-[#06a953] text-white rounded-xl text-xs font-medium flex items-center gap-1 shadow-xs shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新建员工账号</span>
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200/70 text-[11px]">
                  <th className="py-2.5 px-4 font-semibold">员工信息</th>
                  <th className="py-2.5 px-4 font-semibold">所属部门</th>
                  <th className="py-2.5 px-4 font-semibold">当前分配角色</th>
                  <th className="py-2.5 px-4 font-semibold">数据权限园区范围</th>
                  <th className="py-2.5 px-4 font-semibold">状态</th>
                  <th className="py-2.5 px-4 font-semibold">最近登录</th>
                  <th className="py-2.5 px-4 font-semibold text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => {
                  const isCurrent = currentUser.id === u.id;

                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-emerald-50/20 transition-colors ${
                        isCurrent ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={u.avatar}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-medium text-slate-800 flex items-center gap-1.5">
                              <span>{u.realName}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-[#07c160] text-white px-1.5 py-0.2 rounded-full font-normal">
                                  当前登录中
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">@{u.username}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">{u.department}</td>
                      <td className="py-2.5 px-4">
                        <select
                          value={u.role}
                          onChange={e =>
                            updateUser(u.id, { role: e.target.value as UserRole })
                          }
                          className="px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 focus:outline-none focus:border-emerald-500"
                        >
                          {roles.map(r => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {u.parkScope.includes('all') ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200/60">
                            全域所有园区
                          </span>
                        ) : (
                          <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg text-[11px]">
                            {u.parkScope.join(', ')}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] border ${
                            u.status === 'active'
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                              : 'text-slate-400 bg-slate-100 border-slate-200'
                          }`}
                        >
                          {u.status === 'active' ? '正常' : '已冻结'}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-400 font-mono text-[11px]">
                        {u.lastLogin}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleSwitchLoginUser(u)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 text-[#07c160] border border-emerald-200/60 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="切换为该用户身份以测试其真实权限"
                          >
                            <UserCheck className="w-3 h-3 text-[#07c160]" />
                            <span>体验登录</span>
                          </button>
                          <button
                            onClick={() =>
                              updateUser(u.id, {
                                status: u.status === 'active' ? 'disabled' : 'active',
                              })
                            }
                            className={`p-1 rounded-lg transition-colors ${
                              u.status === 'active'
                                ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={u.status === 'active' ? '冻结账号' : '解冻启用'}
                          >
                            {u.status === 'active' ? (
                              <Lock className="w-3.5 h-3.5" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Masking Demo */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs space-y-3">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#07c160]" />
              敏感数据脱敏保护演示 (联系人真实手机号)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              OWTB 平台严格遵循数据合规安全标准。当操作人员具备【敏感信息解密(明文电话)】权限时，仓库联系人电话可完整查看；当身份为访客或未授权角色时，系统自动执行
              <code className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md mx-1 font-mono text-[11px] border border-rose-200/60">
                133****3334
              </code>
              掩码脱敏。
            </p>

            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">当前测试身份:</span>
                <span className="font-semibold text-slate-800">
                  {roles.find(r => r.id === currentRole)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">是否拥有解密权限:</span>
                <span
                  className={`font-semibold ${
                    roles.find(r => r.id === currentRole)?.permissions.includes('warehouse:sensitive_phone')
                      ? 'text-[#07c160]'
                      : 'text-rose-600'
                  }`}
                >
                  {roles.find(r => r.id === currentRole)?.permissions.includes('warehouse:sensitive_phone')
                    ? '已授权 (显示明文)'
                    : '未授权 (强制脱敏)'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                <span className="text-slate-500">示例渲染效果:</span>
                <span className="font-mono font-bold text-slate-800">
                  {roles.find(r => r.id === currentRole)?.permissions.includes('warehouse:sensitive_phone')
                    ? '13333333334'
                    : '133****3334'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-2xs space-y-3">
            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#07c160]" />
              多园区数据权限隔离机制 (Data Scope)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              支持按行政园区划分数据归属。例如江西供销产业园的库管员仅能检索并处理江西供销所属仓库与订单，避免跨园区误操作或信息泄露。
            </p>

            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-2 text-xs">
              <div className="text-slate-800 font-medium">快捷切换测试提示：</div>
              <div className="text-slate-500 text-[11px] leading-relaxed">
                您可以在顶部右上方下拉框中自由切换【所有园区】、【江西供销产业园】或【赣州冷链产业园】，仓库管理列表及数据看板图表将实时随之过滤！
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#07c160]" />
                新增员工账号
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddUserSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">账号用户名</label>
                <input
                  type="text"
                  placeholder="例如: zhou_wms"
                  value={newUserForm.username}
                  onChange={e => setNewUserForm({ ...newUserForm, username: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">真实姓名</label>
                <input
                  type="text"
                  placeholder="例如: 周主管"
                  value={newUserForm.realName}
                  onChange={e => setNewUserForm({ ...newUserForm, realName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">所属部门</label>
                <input
                  type="text"
                  value={newUserForm.department}
                  onChange={e => setNewUserForm({ ...newUserForm, department: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">分配初始角色</label>
                <select
                  value={newUserForm.role}
                  onChange={e =>
                    setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })
                  }
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">数据权限园区</label>
                <select
                  value={newUserForm.parkScope[0]}
                  onChange={e => setNewUserForm({ ...newUserForm, parkScope: [e.target.value] })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="all">全域所有园区</option>
                  {INITIAL_PARKS.filter(p => p !== '所有园区').map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-1.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#07c160] hover:bg-[#06a953] text-white rounded-xl font-medium shadow-xs shadow-emerald-500/20 cursor-pointer"
                >
                  确认创建
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
