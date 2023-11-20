import React, { useState } from "react";
import NavLink from "./NavLink";

const Nav = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isOnLeave, setIsOnLeave] = useState(false);
    const [isOnHover, setIsOnHover] = useState({
        width: "0px",
        height: "0px",
        top: "0px",
        left: "0px",
        isDisplayed: false,
    });

    const handleShowCollapsedMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleIsOnLeave = () => {
        setIsOnLeave(true);
    };

    const handleIsOnHover = (event) => {
        const { width, height, top, left } = event.target.getBoundingClientRect();
        setIsOnHover({ width, height, top, left, isDisplayed: true });
        setIsOnLeave(false);
    };

    const collapseMenuClassName = isCollapsed ? "menu" : "menu menu-opened";
    const hamburguerMenuClassName = isCollapsed ? "open-menu" : "open-menu open";
    const hamburguerMenuAriaLabel = isCollapsed ? "Open menu button" : "Close menu button";

    const menuBackDropStyle = isOnHover.isDisplayed
        ? {
              left: `${isOnHover.left}px`,
              top: `${isOnHover.top}px`,
              width: `${isOnHover.width}px`,
              height: `${isOnHover.height}px`,
          }
        : {};

    const menuBackDropClassName = isOnHover.isDisplayed && !isOnLeave ? "menu-backdrop-visible" : "menu-backdrop-hidden";

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand-container">
                    <a className="navbar-brand" href="index.html">
                        <h1>
                            Awa<span className="text-gradient">Boots</span>
                        </h1>
                    </a>

                    <div
                        className={hamburguerMenuClassName}
                        role="button"
                        aria-label={hamburguerMenuAriaLabel}
                        onClick={handleShowCollapsedMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>
                <ul className={collapseMenuClassName} onMouseLeave={handleIsOnLeave}>
                    <NavLink id="test" href={"/"} onMouseEnter={handleIsOnHover} initialIsSelected={"selected"}>
                        Home
                    </NavLink>
                    <NavLink href={"/shop"} onMouseEnter={handleIsOnHover}>
                        Shop
                    </NavLink>
                    <NavLink href={"/about"} onMouseEnter={handleIsOnHover}>
                        About Us
                    </NavLink>
                    <NavLink href={"/contact"} onMouseEnter={handleIsOnHover}>
                        Contact Us
                    </NavLink>
                </ul>
            </nav>

            <div aria-hidden="true" id="menu-backdrop" style={menuBackDropStyle} className={menuBackDropClassName}></div>
        </>
    );
};

export default Nav;
