import React from "react";
import * as C from "./styles";

const Button = () => ({ Text, onclick, Type = "button" }) => {
    return (
        <C.Button type={Type} onClick={onclick}>
            {Text}
        </C.Button>
    );
};

export default Button;