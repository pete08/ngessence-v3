import React from "react";
// import '../../index.css';

export default function About() {
    return (
        <section>
            <div className="welcomeContent">Hello and Welcome to NGEssence!</div><br />
            <section className="center">
            <div className="aboutContent">
                <h3>Purpose</h3>
                <p>
                    This site formats/processes sequencing files for use with Next Gen sequencing using a specific software normally ran locally: BBMap &#62; BBTools &#62; BBDuk. “<b>Duk</b>” stands for <b>D</b>econtamination <b>U</b>sing <b>K</b>mers. BBDuk was developed to combine most common data-quality-related trimming, filtering, and masking operations into a single high-performance tool. 
                <br /> <br />
                    To use this site to process your sequence files: First, <b>Upload</b> raw sequencing file(s). Then select <b>RUN BBDUK TRIM</b> on each file you'd like to process. Finally, <b>Download</b> the final processed/formatted sequencing file(s) prepared for Next Gen sequencing (e.g. Illumina). Periodically, the site will permanently delete any uploaded and/or processed files. You may also select <b>remove</b> to delete uploaded and processed files. <br />
                </p><br />
                <h5>Benefit</h5><p>This site allows users the ease of running BBDuk without having to download and run separate software. Use this site to circumvent downloading and running bash script found within <em>BBTools</em>.</p><br />
                <h3>How Site Works</h3>
                <p>
                    This site runs using BBDuk program sourced from the Joint Genome Institute (JGI), part of the U.S. Dept of Energy (DOE) Office of Science User Facility.
                    <br /> <br />
                    BBTools is a suite of multithreaded bioinformatics tools designed to analyze DNA and RNA sequence data. <br />BBDuk filters, trims, or masks reads with kmer matches to an artifact/contaminant file. <br/>
                </p><br />
                <h3>Offline Equivalent</h3> 
                <p>
                    This site executes the following equivalent terminal command using BBDuk's adapter-trimming option:
                    <br />
                    <div className="cmdBashScript">&nbsp;&nbsp;&nbsp;&nbsp;`$ bbduk.sh in=reads.fq out=clean.fq ref=adapters.fa ktrim=r k=23 mink=11 hdist=1 tpe tbo`</div>
                    
                    <br />
                    If you are interested in other BBDuk uses see more sequence processing options <em>(using terminal)</ em> in the <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk User Guide</a>.
                    <br/>
                    
                </p><br />
                <h3>Sources</h3>
                <p>
                    <ul>
                        <li><b>User Guide:</b> <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk</a></li>
                        <li><b>Information Page:</b> <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/" target="_blank" rel="noreferrer">BBTools</a> to gain information on BBDuk and other tools</li>
                        <li><b>Download <a href="https://sourceforge.net/projects/bbmap/" target="_blank" rel="noreferrer">BBMap</a></b>: To gain acccess to the BBDuk tool and execute locally through terminal </li>
                        <li><b>BBMap Authored By:</b> <a href="https://sourceforge.net/u/brian-jgi/profile/" target="_blank" rel="noreferrer"> Brian Bushnell </a> </li>
                        <li><b>Questions:</b> If you have any questions about this site please reach out through the "<b>Contact Us</b>" link below. I'll get back as soon as I can. I created this site to help make life easier for anyone in need of processing sequence files. This project has helped me develop and hone my skills in the following web development areas and frameworks: React, Express, Redux State, API Methods, CSS, Testing, IDE, Git and Github, Docker Images and Containers, AWS ECR, AWS S3, and AWS App Runner, etc. Thanks for looking! Excited to hear from you and feel free to provide any comments or feedback!  </li>                        
                    </ul>
                </p>
            </div>
            </section>
        </section>
    );
}
