import React, { useState } from "react";
import NavLink from "./NavLink";

const Nav = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleShowCollapsedMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const collapseMenuClassName = isCollapsed ? "menu" : "menu menu-opened";
    const hamburguerMenuClassName = isCollapsed ? "open-menu" : "open-menu open";
    const hamburguerMenuAriaLabel = isCollapsed ? "Open menu button" : "Close menu button";
    const menuIsExpanded = isCollapsed ? "" : "Close menu button";

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand-container">
                    <a className="navbar-brand" href="index.html" tabIndex="0" aria-label="Awa Boots Logo link">
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
                <ul className={collapseMenuClassName}>
                    <NavLink href={"/"} initialIsSelected={"selected"}>
                        Home
                    </NavLink>
                    <NavLink href={"/products"}>Products</NavLink>
                    <NavLink href={"/about"}>About Us</NavLink>
                    <NavLink href={"/contact"}>Contact Us</NavLink>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
