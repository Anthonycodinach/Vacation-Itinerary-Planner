import { useState } from 'react'
import './Header.css'
import bookIcon from './assets/Icons/book.svg';
import chevronIcon from './assets/Icons/chevron.svg'
import profileIcon from './assets/Icons/profile.svg'
import worldIcon from './assets/Icons/world.svg'
import mapIcon from './assets/Icons/map.svg'
import tripsIcon from './assets/Icons/trips.svg'
import cityIcon from './assets/Icons/city.svg'
import uvLogo from './assets/Icons/UV-Logo.png'

import { CSSTransition } from 'react-transition-group'


function Header() {

  return (
    <>
      <NavBar>
        <NavItem className='navItem' link='#' icon={bookIcon}></NavItem>
        <p className='navSubTitle'>Guides</p>
        <NavItem className='navItem isDropdown' className1='isDropdown' icon={worldIcon}>

            <DropdownMenu></DropdownMenu>

        </NavItem>
        <p className='navSubTitle'>Trips</p>
        <NavItem className='navItem' link="/signup" icon={profileIcon}></NavItem>
        <a className='navSubTitle'>Sign Up</a>

      </NavBar>
    </>
  );
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    if (props.title === "true") {
      return (
        <a href="#" className='isDropdown menuItem' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className='iconButton dropdownTitle isDropdown'>
            <img className='isDropdown' src={props.leftIcon}></img>
          </span>

          {props.children}
        </a>
      )
    }

    return (
      <a href="#" className='isDropdown menuItem' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='iconButton isDropdown'>
          <img className='isDropdown' src={props.leftIcon}></img>
        </span>

        {props.children}

        <span className='iconRight'>
          <img src={props.rightIcon}></img>
        </span>

      </a>
    )
  }

  return (
    <div className='dropdown isDropdown' style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >

        <div className='menu isDropdown'>
          <DropdownItem
            leftIcon={mapIcon}>
            <p className='isDropdown'>Plan a Trip</p>
          </DropdownItem>

          <DropdownItem
            leftIcon={tripsIcon}
            goToMenu='settings'>
            <p className='isDropdown'>Saved Trips</p>
          </DropdownItem>
        </div>


      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >

        <div className='menu isDropdown'>
          <DropdownItem
            leftIcon={chevronIcon}
            goToMenu='main'
            title="true">
            <h1 className='isDropdown'>Saved Trips</h1>
          </DropdownItem>
          <DropdownItem
            leftIcon={cityIcon}>
            <p className='isDropdown'>New York City</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={cityIcon}>
            <p className='isDropdown'>Miami</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={cityIcon}>
            <p className='isDropdown'>San Francisco</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={cityIcon}>
            <p className='isDropdown'>Chicago</p>
          </DropdownItem>
          <DropdownItem
            leftIcon={cityIcon}>
            <p className='isDropdown'>Atlanta</p>
          </DropdownItem>
        </div>


      </CSSTransition>
    </div>
  )
}

function NavBar(props) {
  return (
    <nav className='navBar'>
      <img className='whiteLogo' src={uvLogo}></img>
      <h1 className='navTitle'><a href='/'>Lifetimes</a></h1>
      <ul className='navBarNav'>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {

  const [open, setOpen] = useState(false);

  window.addEventListener("mousedown", (Event)=>{
    // console.log(Event.target)
    if (Event.target.className === 'isDropdown') {
      return
    } else if (Event.target.className === 'isDropdown menuItem'){
      return
    } else if (Event.target.className === 'dropdown isDropdown'){
      return
    } else if (Event.target.className === 'navItem isDropdown'){
      return
    } else if (Event.target.className === 'iconButton isDropdown'){
      return
    } else {
      setOpen(false);
    }
  });

  return (
    <li className={props.className}>
      <a href={props.link} className='iconButton' onClick={() => setOpen((prevState) => !prevState)}>
        <img className={props.className1} src={props.icon}></img>
      </a>

      {open && props.children}
    </li>
  )
}

export default Header
