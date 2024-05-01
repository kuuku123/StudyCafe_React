import React, { useState } from 'react'

const NavItem = ({icon,children}) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </a>
      {open && children}
    </li>
  );
}

export default NavItem