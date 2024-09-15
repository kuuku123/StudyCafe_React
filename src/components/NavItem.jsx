import React, { useState } from 'react'

const NavItem = ({icon,children}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </div>
      {open && children}
    </div>
  );
}

export default NavItem