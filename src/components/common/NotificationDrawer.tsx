import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, ShieldAlert, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen, notificationCount, clearNotifications, liveLogs } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#07c160]" />
            <h3 className="font-semibold text-slate-800 text-sm">系统通知与异常预警</h3>
            {notificationCount > 0 && (
              <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                {notificationCount}+
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearNotifications}
              className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1"
              title="全部标为已读"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>清空</span>
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 text-xs flex-1">
          {/* High Priority Alerts */}
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 space-y-1">
            <div className="flex items-center justify-between text-rose-800 font-semibold">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                冷链温湿度越界告警
              </span>
              <span className="text-[10px] text-rose-500 font-mono">10分钟前</span>
            </div>
            <p className="text-rose-700 text-[11px] leading-relaxed">
              【全南二号仓（冷库）】制冷机组负荷达到 92%，库内实际温度升至 -15.2℃，请及时检查机组配电状态。
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
            <div className="flex items-center justify-between text-amber-800 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                仓储水位库存偏紧预警
              </span>
              <span className="text-[10px] text-amber-600 font-mono">25分钟前</span>
            </div>
            <p className="text-amber-700 text-[11px] leading-relaxed">
              【赣州5号自动化立体库】A区高位托盘利用率已达 89.5%，超过 85% 预设安全阀值，建议分流至 3#冷库。
            </p>
          </div>

          {/* Operational logs */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              实时业务日志动态
            </div>
            <div className="space-y-2">
              {liveLogs.slice(0, 8).map(log => (
                <div
                  key={log.id}
                  className="p-2.5 rounded border border-slate-200 bg-slate-50/60 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{log.timestamp}</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1 rounded">{log.park}</span>
                  </div>
                  <p className="text-slate-700 text-[11px]">{log.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="w-full py-1.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium text-xs transition-colors"
          >
            关闭预警面板
          </button>
        </div>
      </div>
    </div>
  );
};
