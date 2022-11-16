import React from "react";
import Chat from "./Chat";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";

const Chats = () => {
  const user = useAppSelector((state) => state.user.user);

  // const userLogged = useSelector(state: RootState => state.user.user)
  return (
    <div className="chats">
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </div>
  );
};

export default Chats;
