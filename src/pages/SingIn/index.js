import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { Link, usenavigate } from "react-router-dom";



const SingIn = () => {
    const { singIn } = useAuth();
    const navigate = usenavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email | !senha) {
            setError("Preencha todos os campos");
            return;
        }

        const res = singIn(email, senha);

        if (res) {
            setError(res);
            return;
        };

        navigate("/home");
    };

    return (
        <C.Container>
            <C.Label>Sistema de Login</C.Label>
            <C.Content>
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onclick={handleLogin} />
                <C.LabelSingUp>
                    Não tem uma conta?
                    <C.Strong>
                    <Link to="/singup">&nbsp;Cadastre-se</Link></C.Strong> 
                </C.LabelSingUp>
            </C.Content>
        </C.Container>
        
    );
};


export default SingIn;