import React, { ReactNode, useEffect, useRef, useState } from "react";
import { NavItem_style } from "./Component_style";

interface NavItemProps {
  icon: ReactNode;
  children?: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("will unmount");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavItem_style ref={dropdownRef}>
      <div className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </div>
      {open && children}
    </NavItem_style>
  );
};

export default NavItem;
