import React from "react";

const NavLink = ({ children, href, initialIsSelected }) => {
    return (
        <>
            <a
                role="menuitem"
                href={href}
                aria-selected={`${initialIsSelected}`}
                aria-label={`${children} Link`}
                rel="noopener noreferrer"
            >
                {children}
            </a>
        </>
    );
};

export default NavLink;
