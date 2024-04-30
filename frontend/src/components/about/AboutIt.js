import React from "react";
// import '../../index.css';

export default function About() {
    return (
        <section>
            <div className="welcomeContent">Hello and Welcome to NGEssence!</div><br />
            <section className="center">
            <div className="aboutContent">
                <h4>Purpose</h4>
                <p>This site formats/processes sequencing files for use with Next Gen sequencing. First, <b>upload</b> raw sequencing file(s). Then select <b>RUN BBDUK TRIM</b> on each file you'd like to process. Finally, <b>download</b> the final processed/formatted sequencing file(s) prepared for Next Gen sequencing (e.g. Illumina). Periodically the site will permanently delete any uploaded files. You may also select <b>remove</b> to delete uploaded and processed file. <br />
                </p>
                <h5>Benefit</h5><p>Circumvent downloading and running separate software <em>(BBTools)</em> in your terminal.</p><br />
                <h4>How Site Works</h4>
                <p>
                    This site runs using BBDuk program, part of BBMap, sourced from the Joint Genome Institute (JGI), part of the U.S. Dept of Energy (DOE) Office of Science User Facility.<br /> BBMap is a multithread bioinformatics tool designed to analyze DNA and RNA sequence data. <br />BBDuk filters, trims, or masks reads with kmer matches to an artifact/contaminant file. <br/>
                </p><br />
                <h4>Offline Equivalent</h4> 
                <p>
                    Equivalent terminal command using BBDuk's adapter-trimming option:
                    <br />
                    <div className="cmdBashScript">&nbsp;&nbsp;&nbsp;&nbsp;`$ bbduk.sh in=reads.fq out=clean.fq ref=adapters.fa ktrim=r k=23 mink=11 hdist=1 tpe tbo`</div>
                    
                    <br />
                    See more sequence processing options <em>(using terminal)</ em> in the <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk User Guide</a>.
                    <br/>
                    
                </p><br />
                <h4>Sources</h4>
                <p>
                    <ul>
                        <li><a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk User Guide</a></li>
                        <li><a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/" target="_blank" rel="noreferrer">BBTools Information Page</a>: to gain info on BBDuk and other tools</li>
                        <li><a href="https://sourceforge.net/projects/bbmap/" target="_blank" rel="noreferrer"> BBMap</a>: to download BBDuk tool and utilize through terminal </li>
                        <li>Author: <a href="https://sourceforge.net/u/brian-jgi/profile/" target="_blank" rel="noreferrer"> Brian Bushnell </a> </li>
                        
                    </ul>
                </p>
            </div>
            </section>
        </section>
    );
}
