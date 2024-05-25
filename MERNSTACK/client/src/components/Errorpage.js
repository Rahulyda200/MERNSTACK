import React, { Fragment } from "react";
import { Link } from 'react-router-dom';



const Errorpage=()=>{
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                </div>
                <h2>we are sorry , page not found!</h2>
                <p className="mb-5">
                    The page you are looking for might have been removed had its name
                    changed or is temprorily unavialable.
                </p>
                <Link to="/">Back to Home Page</Link>
            </div>
        </  >
    )
}

export default Errorpage;