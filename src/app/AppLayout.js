import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes.js";
// import ROUTES from "./routes";
import Footer from "../components/footer/Footer.js";
// import Footer from "../components/footer/Footer";


// import Header from "../../header.js";

export default function AppLayout() {
    return (
        <div>
            <div className="wrapper">
                <NavLink to={ROUTES.sequencesRoute()} >
                    <div className="box-navigate">
                    Sequences
                    </div>
                </NavLink>
                <NavLink to={ROUTES.newSequenceRoute()} >
                    <div className="box-navigate">
                    New Sequence
                    </div>
                </NavLink>
                <NavLink to={ROUTES.about()}>
                    <div className="box-navigate">
                    About
                    </div>  
                </NavLink>
            </div>
            <hr className="header"/>
            {/* <div className="container">
                <div className="four columns header-nav">
                <NavLink to={ROUTES.sequencesRoute()} >
                    <div className="button">
                        Sequences
                    </div>
                </NavLink>
                </div>
                <div className="four columns header-nav">
                <NavLink to={ROUTES.newSequenceRoute()} >
                    <div className="button">
                        New Sequence
                    </div>
                </NavLink>
                </div>
                <div className="four columns header-nav">
                <NavLink to={ROUTES.about()}>
                    <div className="button">
                        About
                    </div>  
                </NavLink>
                </div>
            </div> */}
            <Outlet/>
            <hr className="footer"/>
            <Footer />
        </div>
    );
}