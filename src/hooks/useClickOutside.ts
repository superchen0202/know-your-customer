import { useEffect, useState } from 'react';

const useClickOutside = (domRef: React.RefObject<HTMLDivElement | null>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      if (!domRef.current) return;
      if (domRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [domRef]);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useClickOutside;
