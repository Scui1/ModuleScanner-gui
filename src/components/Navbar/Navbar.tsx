import * as React from 'react';
import './Navbar.css';

interface NavbarProps {
  customButtons: JSX.Element[]
}

const Navbar = (props: NavbarProps) => {

  return (
    <div className="Navbar">
      <div className="ActiveComponentButtons">
        {props.customButtons.map(button => button)}
      </div>
    </div>
  );
}

export default Navbar;
