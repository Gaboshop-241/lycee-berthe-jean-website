"use client";

import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function MobileNavDetails({
  menuAria,
  children,
}: {
  menuAria: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
        aria-label={menuAria}
        aria-expanded={isOpen}
        onClick={() => setOpenedOnPathname(isOpen ? null : pathname)}
      >
        <Menu size={22} strokeWidth={2.2} />
      </button>
      {isOpen ? (
        <div role="presentation" onClick={() => setOpenedOnPathname(null)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
