import React, { useState } from "react";

const NavLink = ({ children, href, initialIsSelected, onMouseEnter }) => {
    const [isSelected, setIsSelected] = useState(initialIsSelected);

    return (
        <>
            <li onMouseEnter={onMouseEnter}>
                <a href={href} className={initialIsSelected} tabIndex={0}>
                    {children}
                </a>
            </li>
        </>
    );
};

export default NavLink;
