import React, { useState, useEffect, Fragment } from 'react'
import { Transition } from "@headlessui/react";

import TopBar from './TopBar'
import SideBar from './SideBar'

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 640) {
      setIsMobile(true)
      setShowNav(false)
    } else {
      setIsMobile(false)
      setShowNav(true)
    }
  }

  function handleLinkClick() {
    if (window.innerWidth <= 640) return setShowNav(false);
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleResize)
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition as={Fragment} show={showNav} enter="transform transition duration-[400ms]" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform duration-[400ms] transition ease-in-out" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
        <SideBar showNav={showNav} handleLinkClick={handleLinkClick} />
      </Transition>
      <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""}`}>
        <div className="px-4 md:px-16">
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout