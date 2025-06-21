import React from 'react';
import Toast from './Toast';
import { useStore } from '../store/useStore';

/**
 * Toast 컨테이너 컴포넌트
 * 화면 우상단에 Toast들을 표시하고 Zustand 스토어와 직접 연결됩니다
 */
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer; 