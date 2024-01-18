import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";


export default function AppLayout() {
    return (
        <div>

            <div class="wrapper">
                <div class="box">
                <NavLink to={ROUTES.sequencesRoute()} >
                    Sequences
                </NavLink>
                </div>
                <div class="box">
                    <NavLink to={ROUTES.newSequenceRoute()} >
                New Sequence
                </NavLink>
                </div>
                <div class="box">
                    <NavLink to={ROUTES.about()}>
                        About
                    </NavLink>
                </div>  
            </div>
            {/* <div class="box a">
                <NavLink to={ROUTES.sequencesRoute()} >
                    Sequences
                </NavLink>
            </div>
            <div class="box b">
                <NavLink to={ROUTES.newSequenceRoute()} >
                    New Sequence
                </NavLink>
            </div>
            <div class="box c">
                <NavLink to={ROUTES.about()}>
                    About
                </NavLink>
            </div>
            <div class="box d">D</div>
            </div>


            <nav className="wrapper">
                <ul>
                <li>
                <div className="box">
                    <NavLink to={ROUTES.sequencesRoute()} >
                    Sequences
                    </NavLink>
                </div>
                </li>
                <li>
                    <NavLink to={ROUTES.newSequenceRoute()} >
                    New Sequence
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.about()}>
                        About
                    </NavLink>
                </li>

                </ul>
            </nav> */}
            <Outlet/>
        </div>
    );
}