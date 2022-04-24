import { useContext } from "react";
import style from "./App.module.scss";
import { LoginBox } from "./components/login_box";
import { MessageList } from "./components/message_list";
import { OAuthContext } from "./context/oauth_provider";
import { SendMessageFrom } from "./components/send_message_form";

//!! = identifier null
export function App() {

  const { user } = useContext(OAuthContext)

  return (
    <main className={ `${style.contentWrapper} ${!!user ? style.contentSigned : '' }` }>
      <MessageList/>
      { !!user ? <SendMessageFrom /> : <LoginBox/> }
    </main>
  );
};
