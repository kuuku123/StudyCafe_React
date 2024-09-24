import React, { useEffect, useRef, useState } from "react";

const NavItem = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return() => {
      console.log("will unmount")
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[])

  return (
    <div ref={dropdownRef}>
      <div className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </div>
      {open && children}
    </div>
  );
};

export default NavItem;
