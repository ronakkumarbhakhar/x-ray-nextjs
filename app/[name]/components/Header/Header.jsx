'use client';

import { forwardRef, useState } from "react";
import './Header.css';
import logo from './static/logo.svg';
import logoText from './static/logoText.svg';
import Image from "next/image";
function Header(props,ref){
    const [change, setChange] = useState(true);
    return (
        <section ref={ref} className="header">
            <div className="logo-container">
                <div className="logo">
                    <Image src={logo} alt="logo" />
                    <Image src={logoText} alt="Spring Money" />
                </div>
            </div>
            <div className="category">
            {props.children}
            </div>
        </section>
    );
};
export default forwardRef(Header);