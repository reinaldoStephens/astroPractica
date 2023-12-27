import React, { useState } from "react";
import NavLink from "./NavLink";

const pages = [
    {
        url: "/",
        label: "Inicio",
        selected: false,
    },
    {
        url: "/products",
        label: "Productos",
        selected: false,
    },
    // {
    //     url: "/about",
    //     label: "About",
    //     selected: false,
    // },
    {
        url: "/contact",
        label: "Contacto",
        selected: false,
    },
];

const Nav = ({ pathname }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleShowCollapsedMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const collapseMenuClassName = isCollapsed ? "menu" : "menu menu-opened";
    const hamburguerMenuClassName = isCollapsed ? "open-menu" : "open-menu open";
    const hamburguerMenuAriaLabel = isCollapsed ? "Open menu button" : "Close menu button";
    const menuIsExpanded = isCollapsed ? "false" : "true";

    pages.map((page) => {
        if (page.url === pathname) {
            page.selected = true;
        } else {
            page.selected = false;
        }
    });

    return (
        <>
            <nav className="navbar" role="navigation">
                <div className="navbar-brand-container">
                    <a className="navbar-brand" href="index.html" aria-label="Awa Boots Logo link" rel="noopener noreferrer">
                        <h1>
                            Awa<span className="text-gradient">Boots</span>
                        </h1>
                    </a>

                    <div
                        id="menu-button"
                        className={hamburguerMenuClassName}
                        role="button"
                        aria-label={hamburguerMenuAriaLabel}
                        onClick={handleShowCollapsedMenu}
                        aria-controls="menu-items"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>
                <ul
                    id="menu-items"
                    className={collapseMenuClassName}
                    aria-hidden="true"
                    tabIndex="-1"
                    role="menu"
                    aria-labelledby="menubutton"
                    aria-expanded={menuIsExpanded}
                >
                    <small id="menubutton" aria-hidden="true" hidden>
                        Awa Menu Links
                    </small>
                    {pages &&
                        pages.map((page) => {
                            return (
                                <li key={page.label}>
                                    <NavLink href={page.url} initialIsSelected={page.selected}>
                                        {page.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </>
    );
};

export default Nav;
