'use client';

import './Footer.css';

function Footer(props){
    return (
        <section className="Footer">
            <div className="Footer-content">
                Financial X-Ray Report
            </div>
            <div className="Footer-number">
                {props.pageNo}
            </div>
        </section>
    );
};
export default Footer;