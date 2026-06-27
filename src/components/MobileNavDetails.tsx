"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function MobileNavDetails({
  menuAria,
  closeMenuAria,
  children,
}: {
  menuAria: string;
  closeMenuAria: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const menuId = useId();
  const [openedOnPathname, setOpenedOnPathname] = useState<string | null>(null);
  const isOpen = openedOnPathname === pathname;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedOnPathname(null);
      }
    }

    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenedOnPathname(null);
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav" ref={ref}>
      <button
        type="button"
        aria-label={isOpen ? closeMenuAria : menuAria}
        aria-controls={menuId}
        aria-expanded={isOpen}
        onClick={() => setOpenedOnPathname(isOpen ? null : pathname)}
      >
        {isOpen ? (
          <X size={22} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <Menu size={22} strokeWidth={2.2} aria-hidden="true" />
        )}
      </button>
      {isOpen ? (
        <div
          className="mobile-menu-panel"
          id={menuId}
          onClick={() => setOpenedOnPathname(null)}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
