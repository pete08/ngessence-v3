import React from "react";
// import '../../index.css';

export default function About() {
    return (
        <section>
            <div className="welcomeContent">Hello and Welcome to NGEssence!</div>
            <section className="center">
            <div className="aboutContent">
                <p>This website utilizes BBTool's <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk</a> program sourced from <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/" target="_blank" rel="noreferrer"> JGI's DOE Office of Science User Facility's BBTools</a>. Credit is provided to DOE office of science user facility. See its <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk Guide</a>.
                </p>
                <h4>BBDuk</h4>
                <p>
                    This site recreates BBDuk to allow processing without downloading and running BBTools in your terminal This site formats and processes uploaded sequence files using BBDuk. Firstly, upload raw sequencing file(s). Then process file(s) using BBDuk. Next, you can download the processed/formatted sequencing file(s) prepared for Next Gen sequencing (e.g. Illumina).
                </p>
                <h4>Adapter Trimming</h4> 
                <p>
                    This website utilizes BBDuk's adapted trimming option, see explanation in DOE's <a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk Guide's usage examples</a>. 
                    <br/>
                    <br/>
                    <div className="cmdBashScript">&nbsp;&nbsp;&nbsp;&nbsp;`$ bbduk.sh in=reads.fq out=clean.fq ref=adapters.fa ktrim=r k=23 mink=11 hdist=1 tpe tbo`</div>
                </p>
                <h4>Source</h4>
                <p>
                    BBTools (part of larger BBMap suite) is a suite of fast, multithreaed bioinformatics tools designed for analysis of DNA and RNA sequence data.<br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    SourceForge <em>(open source software platform)</em> :&nbsp;&nbsp; Download<a href="https://sourceforge.net/projects/bbmap/" target="_blank" rel="noreferrer"> BBMap <em>(contains: BBTools , BBDuk)</em></a>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    BBDuk User Guide :&nbsp;&nbsp;<a href="https://jgi.doe.gov/data-and-tools/software-tools/bbtools/bb-tools-user-guide/bbduk-guide/" target="_blank" rel="noreferrer">BBDuk User Guide</a>
                    <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Author :&nbsp;&nbsp;<a href="https://sourceforge.net/u/brian-jgi/profile/" target="_blank" rel="noreferrer">Brian Bushnell</a>
                </p>
            </div>
            </section>
        </section>
    );
}
