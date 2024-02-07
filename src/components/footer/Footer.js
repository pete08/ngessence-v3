import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "../../app/routes.js";
// import ROUTES from "../../app/routes";

export default function Footer() {
    const [imageCount, setImageCount] = useState(5);
    
    useEffect(() => {
        const handleResize = () => {
        const screenWidth = window.innerWidth;
        console.log(`1. Footer.js: window.innerWidth: ${screenWidth}`);
        const imageWidth = 162; // Adjust this based on your image width
        const maxImages = Math.floor(screenWidth / (imageWidth));
        console.log(`2. Footer.js: maxImages: ${maxImages}`);
        setImageCount(Math.min(15, maxImages));
        };
    
        // Attach event listener for window resize
        window.addEventListener("resize", handleResize);
    
        // Call initially
        handleResize();
    
        // Cleanup event listener on component unmount
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    const iconList = [
        {title: "Mail", url: `mailto:...@gmail.com?subject=NGEssence Feedback/Question&body=Please Send To: ngessence.email@gmail.com`, src: `Icon_Mail_DblHlx.png`},
        {title: "Twitter", url: `https://www.twitter.com/ngessence`, src: `Icon_Twitter_DblHlx.png`},
        {title: "Github", url: `https://www.github.com/ngessence`, src: `Icon_Github_DblHlx.png`},
        {title: "Linkedin", url: `https://www.linkedin.com/ngessence`, src: `Icon_Linkedin_DblHlx.png`},
        {title: "FB", url: `https://www.facebook.com/ngessence`, src: `Icon_FB_DblHlx.png`},
        {title: "IG", url: `https://www.instagram.com/ngessence"`, src: `Icon_IG_DblHlx.png`},
        {title: "Repeating", url: ``, src: `Icon_Repeating_DblHlx.png`},
    ];

    function footerItems(idx) {
        const maxicons = (iconList.length-1);
        if (idx > maxicons) {
            return (
                <a href={iconList[maxicons][`url`]} title={iconList[maxicons][`title`]} target="_blank" rel="noreferrer">
                    <img
                    key={maxicons}
                    alt={`repeat-${maxicons}`}
                    src={`icons/${iconList[maxicons][`src`]}`}
                    width="160"
                    />
                </a>
            )
        } else {
            return (
                <a href={iconList[idx][`url`]} title={iconList[idx][`title`]} target="_blank" rel="noreferrer">
                    <img
                    key={idx}
                    alt={`repeat-${idx}`}
                    src={`icons/${iconList[idx][`src`]}`}
                    width="160"
                    />
                </a>
            )
        }
    }


    return (
        <div className="footer">
        {/* <div className="row"> */}
            <div className="twelve columns">
            {/* <div className="col-md-12"> */}
            {/* <div className="center"> */}
                {[...Array(imageCount)].map((_, index) => (
                    footerItems(index)
                ))}
            </div>
            {/* <br /> */}
            {/* <a href="/blog" title="Blog">Blog</a> |  */}
            <span>
            <NavLink to={ROUTES.sequencesRoute()}>
                    Sequences    |
            </NavLink>
            <a href="/about" title="About">    Help</a>    |
            <a href= "mailto:...@gmail.com?subject=NGEssence Feedback/Question&body=Please Send To: ngessence.email@gmail.com" title="Contact Us" target="_blank" rel="noreferrer">    Contact Us</a>    |
            <a href="/about" title="Twitter" target="_blank" rel="noreferrer">    Twitter</a>    |
            <a href="/about" title="Github" target="_blank" rel="noreferrer">    Github</a>    |
            <a href="/about" title="Linkedin" target="_blank" rel="noreferrer">    Linkedin</a>    |
            <a href="/about" title="FB" target="_blank" rel="noreferrer">    FB</a>    |
                © 2024 www.NGEssence.com
            </span>
            {/* </div> */}
        {/* </div> */}
        </div>
    );
};
    

//     return (
//         <div class="footer">
//             <div class="row">
//                 <div class="col-md-12">
//                     <div class="center">
//                         {/* <a href="https://www.mail.google.com" title="email" className="ngessence-footer__social-link"> */}
//                             <img alt="contact ngessence via email" src="icons/Icon_Mail_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.instagram.com/ngessence" title="instagram" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on Instagram" src="icons/Icon_IG_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.facebook.com/ngessence" title="facebook" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on Instagram" src="icons/Icon_FB_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.linkedin.com/ngessence" title="linkedin" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on linkedin" src="icons/Icon_Linkedin_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.twitter.com/ngessence" title="twitter" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on Instagram" src="icons/Icon_Twitter_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.twitter.com/ngessence" title="twitter" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on Instagram" src="icons/Icon_Twitter_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                         {/* <a href="https://www.twitter.com/ngessence" title="twitter" className="ngessence-footer__social-link"> */}
//                             <img alt="ngessence on Instagram" src="icons/Icon_Twitter_DblHlx.png" width="160"/>
//                         {/* </a> */}
//                     </div>
//                     <br />
//                     {/* <a href="/blog" title="Blog">Blog</a> |  */}
//                     <a href="/aboutit" title="About">Help</a>    |
//                     {/* <a href="/credits" title="Credits">Credits</a> |
//                     <a href="/privacy" title="Privacy">Privacy Policy</a> | */}
//                     <a href="/contact" title="Contact Us">    Contact Us</a>    |     
//                     <span>   © 2024 www.NGEssence.com</span>
//                 </div>
//             </div>
//         </div>
//     )
// };