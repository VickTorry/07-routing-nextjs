'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const close = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back(); // fallback for intercepted route modals
    }
  }, [onClose, router]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [close]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" aria-label="Modal window" onClick={close}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={close}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
