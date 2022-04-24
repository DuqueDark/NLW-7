import { useState } from "react";
import { createContext, ReactNode, useEffect } from "react";
import { api } from "../services/api";

interface User{
    id:string;
    name:string;
    login:string;
    avatar_url:string;
}

interface IOAuthContextData{
    user: User | null;
    signInUrl: string;
    signOut: () => void ;
}

interface IOAuthProvider{
    children: ReactNode;
}

interface IAuthResponse{
    token:string;
    user:{
        id:string;
        avatar_url:string;
        name:string;
        login:string;
    }
}

export const OAuthContext = createContext({} as IOAuthContextData);

export function OAuthProvider(props: IOAuthProvider){

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d9844b98efb3260a4b0e`;

    const [ user, setUser ] = useState<User | null>(null)

    async function signIn(gitHubCode: string){
        const response = await api.post<IAuthResponse>('/authenticate',{
            code: gitHubCode,
        });

        const { token, user } = response.data;

        localStorage.setItem('@doWhile:token', token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user)
    }

    function signOut(){
        setUser(null)
        localStorage.removeItem("@doWhile:token")
    }

    useEffect(()=>{
        const token  = localStorage.getItem('@doWhile:token')

        if(token){
            api.defaults.headers.common.authorization = `Bearer ${token}`;

            api.get<User>("/profile").then(response => {
                setUser(response.data)
            })
        }
    },[])

    useEffect(()=>{
        const url = window.location.href;
        const hashGitHubCode = url.includes("?code=");

        if(hashGitHubCode){
            const [urlWithoutCode, gitHubCode] = url.split('?code=');

            window.history.pushState({},"",urlWithoutCode);

            signIn(gitHubCode);
        }

    },[]);

    return (
        <OAuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </OAuthContext.Provider>
    )
}