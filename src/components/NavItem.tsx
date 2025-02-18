import React, { useEffect, useRef, useState } from "react";
import { NavItem_style } from "./Component_style";

const NavItem = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
