import React from "react";
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <div className="logo-stripes">
                        <div className="logo-stripe"></div>
                        <div className="logo-stripe"></div>
                    </div>
                    OBD II Dashboard
                </div>
                <div className="car-badge">Mazda 3</div>
            </div>
            <div className="header-right">
                <div className="avatar">MM</div>
            </div>
        </header>
    );
}

export default Header;
