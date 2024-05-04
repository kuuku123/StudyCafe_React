import React, { useState } from 'react'

const NavItem = ({icon,children}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {open && children}
    </div>
  );
}

export default NavItem