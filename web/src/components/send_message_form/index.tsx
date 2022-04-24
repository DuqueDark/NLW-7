import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import style from "./style.module.scss"
import { OAuthContext } from "../../context/oauth_provider";
import { api } from "../../services/api";

export function SendMessageFrom(){

    const { user, signOut } = useContext(OAuthContext);

    const [ message, setMessage ] = useState('');

    async function handleSendMessage(event: FormEvent){
        event.preventDefault();

        if(!message.trim()){
            return;
        }

        await api.post('create-message',{ message });

        setMessage("")
    }

    return(
        <div className={ style.sendMessageFormWrapper }>
            <button onClick={signOut} className={ style.signOutButton }>
                <VscSignOut size={ 32 }/>
            </button>

            <header className={ style.userInformation }>
                <div className={ style.userImage }>
                    <img src={ user?.avatar_url } alt={ user?.name } />
                </div>
                <strong className={ style.userName }>{ user?.name }</strong>
                <span className={ style.userGitHub }>
                    <VscGithubInverted size={ 16 }/>
                    { user?.login }
                </span>

                <form onSubmit={ handleSendMessage } className={ style.sendMessageForm }>
                    <label htmlFor="message">Message</label>
                    <textarea 
                        name="message" 
                        id="message" 
                        placeholder="How is your expectancy for event?"
                        cols={36}
                        onChange={ event => setMessage(event.target.value) }
                        value={ message } />
                    <button type="submit">Send Message</button>
                </form>
            </header>
        </div>
    );
}
