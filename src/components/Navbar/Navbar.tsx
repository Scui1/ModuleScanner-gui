import * as React from 'react';
import './Navbar.css';

interface NavbarProps {
  navigationButtons: JSX.Element[]
  customButtons: JSX.Element[]
}

const Navbar = (props: NavbarProps) => {

  return (
    <div className="Navbar">
      <div className="NavigationButtons">
        {props.navigationButtons.map(button => button)}
      </div>
      <div className="ActiveComponentButtons">
        {props.customButtons.map(button => button)}
      </div>
    </div>
  );
}

export default Navbar;
