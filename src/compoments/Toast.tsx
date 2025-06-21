import React, { useEffect } from 'react';
import { Check, X, Plus, Minus } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info' | 'bookmark-add' | 'bookmark-remove';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

/**
 * 개별 Toast 컴포넌트
 */
const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  /**
   * Toast 타입별 아이콘 반환
   */
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      case 'bookmark-add':
        return <Plus className="w-5 h-5 text-green-400" />;
      case 'bookmark-remove':
        return <Minus className="w-5 h-5 text-orange-400" />;
      default:
        return <Check className="w-5 h-5 text-blue-400" />;
    }
  };

  /**
   * Toast 타입별 스타일 반환
   */
  const getStyles = () => {
    switch (toast.type) {
      case 'success':
      case 'bookmark-add':
        return 'border-green-500/50 bg-green-500/10';
      case 'error':
        return 'border-red-500/50 bg-red-500/10';
      case 'bookmark-remove':
        return 'border-orange-500/50 bg-orange-500/10';
      default:
        return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <div className={`
      relative flex items-start space-x-3 p-4 rounded-lg border backdrop-blur-sm
      animate-fade-in shadow-lg max-w-sm
      ${getStyles()}
    `}>
      {/* 아이콘 */}
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-sm text-gray-300 mt-1">
            {toast.message}
          </p>
        )}
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        aria-label="알림 닫기"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast; 