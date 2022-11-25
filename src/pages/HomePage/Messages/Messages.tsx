import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../hooks/hooks";
import Topbar from "./Topbar";
import Typing from "./Typing";
import UserMessages from "./UserMessages";
// firebase
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const user = useAppSelector((state) => state.user.user);
  const friend = useAppSelector((state) => state.chat.friend);

  const updateChat = useCallback(() => {
    const uniqueIdForChat =
      user.uid > friend.uid ? user.uid + friend.uid : friend.uid + user.uid;
    onSnapshot(doc(db, "chats", uniqueIdForChat), (doc) => {
      setMessages(doc.data().messages);
    });
  }, [user, friend]);

  useEffect(() => {
    user !== null && friend !== null && updateChat();
  }, [user, friend, updateChat]);

  return (
    <div className="messages">
      <Topbar />
      <UserMessages messages={messages} />
      <Typing />
    </div>
  );
};

export default Messages;
