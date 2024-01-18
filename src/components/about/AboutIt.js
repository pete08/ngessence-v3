import React from "react";
// import '../../index.css';

export default function About() {
    return (
        <section>
            <div className="welcomeContent">Hello and Welcome to NGEssence!</div>
            <section className="center">
            <div className="aboutContent">
                <p>This website contains BBTool's bbduk program directly obtained from <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/"> JGI's DOE Office of Science User Facility's BBTools</a>.</p>
                <h3>BBTools</h3>
                <p>
                    BBTools is a suite of fast, multithreaed buoinformativs tools designed for analysis of DNA and RNA sequence data.
                    </p>
                <h3>BBDuk</h3>
                <p>
                    This site has built in the bbduk tool to process users' uploadded sequence files. Credit is provided to DOE office of science user facility. See its <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/">BBDuk Guide</a>.
                    <br/>
                    In this website you can upload raw sequencing files, process files using bbduk, then download the processed sequencing file to prepare users files to be sent for Next Gen sequencing (e.g. Illumina).
                </p>
                <h3>Adapter Trimming</h3> 
                <p>
                    This website utilizes bbduk's adapted trimming option, see explanation in DOE's <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/">BBDuk Guide's usage examples</a>. 
                    <br/><br/>
                    <div className="cmdBashScript">`bbduk.sh in=reads.fq out=clean.fq ref=adapters.fa ktrim=r k=23 mink=11 hdist=1 tpe tbo`</div>
                </p>
                <hr/>
            </div>
            </section>

            <footer className="ngessence-footer" >
            <div className="ngessence-footer__content">
                <div  className="ngessence-footer__brand">
                    <img alt="ngessence logo" className="ngessence-footer__logo" width="32" src="favicon-32x32.png" />
                </div>

                       
                <div className="ngessence-footer__nav">
                    <ul className="ngessence-footer__nav_list">
                        <li><a href="https://github.com" className="ngessence-footer__social-link">
                            <img src="icons/iconmonstr-git-5-240(1).png" alt="github"
                            width="32"/>
                        </a></li>
                        
                        <li><a href="https://gmail.com" className="ngessence-footer__social-link">
                            <img src="icons/iconmonstr-gmail-5-240(1).png" alt="email" width="32"/>
                        </a></li>
                        
                        <li><a href="https://twitter.com/ngessence" className="ngessence-footer__social-link">
                            <img src="icons/iconmonstr-twitter-5-240(1).png" alt="ngessence on Twitter" width="32"/>
                        </a></li>
                        
                        <li><a href="https://www.facebook.com/ngessence" className="ngessence-footer__social-link">
                            <img alt="ngessence on Facebook" src="icons/iconmonstr-facebook-5-240(1).png" width="32"/>
                        </a></li>
                        
                        <li><a href="https://www.linkedin.com/company/ngessence" className="ngessence-footer__social-link">
                            <img alt="ngessence on LinkedIn" src="icons/iconmonstr-linkedin-5-240(1).png" width="32"/>
                        </a></li>
                        <li><a href="https://www.youtube.com/ngessence/" className="ngessence-footer__social-link"><img src="icons/iconmonstr-youtube-10-240(1).png" alt="ngessence on youtube" width="32"/>
                        </a></li>
                    </ul>
                </div>
                    <p className="ngessence-footer__copyright">© 2024 NGEssence, Inc.</p>
            </div>
            </footer>
        </section>
    );
}
