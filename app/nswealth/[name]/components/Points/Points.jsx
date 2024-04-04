'use client';

import { forwardRef,useRef } from 'react';
import './Points.css'

function Points(props,ref) {
    return (  
        <div ref={ref} className="content-container">
                <div className="content-heading">
                    {props.heading}
                </div>
                <ul className="content">
                    {props.data}
                </ul>
            </div>
    );
}

export default forwardRef(Points);