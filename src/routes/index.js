import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SingIn from "../pages/SingIn";
import SingUp from "../pages/SingUp";

const Private = ({ Item }) => {
    const singned = false;

    return singned > 0 ? <Item /> : <SingIn />;
};


const RoutesApp = () => {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<Private Item={Home} />} />
                    <Route path="/singin" element={<SingIn />} />
                    <Route exact path="/singup" element={<SingUp />} />
                    <Route path="*" element={<SingIn />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

export default RoutesApp;