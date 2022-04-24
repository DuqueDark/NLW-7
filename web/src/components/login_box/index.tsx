import { useContext } from "react";
import { VscGithubInverted } from "react-icons/vsc"
import { OAuthContext } from "../../context/oauth_provider";

import style from "./style.module.scss";

export function LoginBox(){

    const { signInUrl } = useContext(OAuthContext);

    return(
        <div className={ style.loginBoxWrapper }>
            <strong> Join and share your message</strong>
            <a href={signInUrl} className={ style.signInWithGithub }>
                <VscGithubInverted size={24}/>
                Join on Github
            </a>
        </div>
    );
};