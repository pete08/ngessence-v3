import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import Header from "../../header";
import Footer from "../../footer";


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
            <hr />
            <Outlet/>
        </div>
    );
}