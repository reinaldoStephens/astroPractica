import React from "react";

const NavLink = ({ children, href, initialIsSelected }) => {
    return (
        <>
            <a role="menuitem" href={href} aria-selected={`${initialIsSelected}`} aria-label={`${children} Link`}>
                {children}
            </a>
        </>
    );
};

export default NavLink;
