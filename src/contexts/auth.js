import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const singin = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));

        const hasUser = usersStorage?.filter((user) => user.email === email && user.password === password);

        if (hasUser?.lenght) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({ email, token }));
                setUser({ email, password });
                return;
            } else {
                return "Email ou senha inválidos";
            }
        } else {
            return "Usuário não encontrado";
        }
    };



    const singup = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db")) || [];

        const hasUser = usersStorage?.filter((user) => user.email === email);

        if (hasUser?.length) {
            return "Usuário já cadastrado";
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, { email, password }];
        } else {
            newUser = [{ email, password }];
        }

        localStorage.setItem("users_db", JSON.stringify(newUser));
        
        return;
    };

    const singout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };
            
    return <AuthContext.Provider
    value={{ user, signed: !!user, singin, singout ,singup }}>
        {children}
        </AuthContext.Provider>;

};