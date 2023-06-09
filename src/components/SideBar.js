import React from 'react'
import { forwardRef } from "react";
import LogoCompany from '../images/global-warming-logo.jpg'
import Button from './UI/Button';
import { Link, useLocation } from 'react-router-dom';

const SideBar = forwardRef(({ showNav, handleLinkClick }, ref) => {
  const location = useLocation();

  function handleButtonClick() {
    handleLinkClick();
  }

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src={LogoCompany} alt="company-logo" />
        </picture>
      </div>
      <div className="flex flex-col" onClick={handleButtonClick}>
        <Link to="/">
          <Button text={'Home'} active={location.pathname === '/'} />
        </Link>
        <Link to='/warming/temperature'>
          <Button text={'Temperature'} active={location.pathname === '/warming/temperature'} />
        </Link>
        <Link to='/warming/co2'>
          <Button text={'Co2'} active={location.pathname === '/warming/co2'} />
        </Link>
        <Link to='/warming/methane'>
          <Button text={'Methane'} active={location.pathname === '/warming/methane'} />
        </Link>
        <Link to='/warming/nitrous-oxide'>
          <Button text={'Nitrous'} active={location.pathname === '/warming/nitrous-oxide'} />
        </Link>
        <Link to='/warming/arctic'>
          <Button text={'Artic Polar'} active={location.pathname === '/warming/arctic'} />
        </Link>
      </div>
    </div>
  );
});

export default SideBar