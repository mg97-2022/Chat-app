import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

// firebase
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const Chat: React.FC<{ friend: any }> = ({ friend }) => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const showMessagesHandler = async () => {
    setError(false);
    dispatch(uiSliceActions.hideUsersList());

    // check if there are messages between the two persons
    const uniqueIdForChat =
      user.uid > friend.uid ? user.uid + friend.uid : friend.uid + user.uid;

    try {
      const response = await getDoc(doc(db, "chats", uniqueIdForChat));

      if (!response.exists()) {
        // create new chat
        await setDoc(doc(db, "chats", uniqueIdForChat), { messages: [] });

        // create chat node at each user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [uniqueIdForChat + ".userInfo"]: {
            uid: friend.uid,
            displayName: friend.displayName,
            photoURL: friend.photoURL,
          },
          [uniqueIdForChat + ".date"]: serverTimestamp(),
        });
      }
      await updateDoc(doc(db, "userChats", friend.uid), {
        [uniqueIdForChat + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [uniqueIdForChat + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="chat" onClick={showMessagesHandler}>
      {/* {error && <p>error</p>} */}
      <img src={friend.photoURL} alt="" />
      <div>
        <span>{friend.displayName}</span>
        <span>message from hima</span>
      </div>
    </div>
  );
};

export default Chat;
