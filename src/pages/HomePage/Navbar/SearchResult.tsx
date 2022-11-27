import React, { useState } from "react";
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
import { userSliceActions } from "../../../store/user";

const SearchResult = () => {
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const SearchFriend = useAppSelector((state) => state.user.SearchFriend);

  const showMessagesHandler = async () => {
    setError(false);

    // check if there are messages between the two persons
    const uniqueIdForChat =
      user.uid > SearchFriend.uid
        ? user.uid + SearchFriend.uid
        : SearchFriend.uid + user.uid;

    try {
      const response = await getDoc(doc(db, "chats", uniqueIdForChat));

      if (!response.exists()) {
        // create new chat
        await setDoc(doc(db, "chats", uniqueIdForChat), { messages: [] });

        // update chat node at each user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [uniqueIdForChat + ".userInfo"]: {
            uid: SearchFriend.uid,
            displayName: SearchFriend.displayName,
            photoURL: SearchFriend.photoURL,
          },
          [uniqueIdForChat + ".date"]: serverTimestamp(),
          [uniqueIdForChat + ".lastMessage"]: {
            text: "",
          },
        });
        await updateDoc(doc(db, "userChats", SearchFriend.uid), {
          [uniqueIdForChat + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [uniqueIdForChat + ".date"]: serverTimestamp(),
          [uniqueIdForChat + ".lastMessage"]: {
            text: "",
          },
        });
      }
      // clear redux friend ( i will update users list in chats component )
      dispatch(userSliceActions.setSearchFriend(null));
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="chat" onClick={showMessagesHandler}>
      <img src={SearchFriend.photoURL} alt="" />
      <div>
        <span>{SearchFriend.displayName}</span>
      </div>
    </div>
  );
};

export default SearchResult;
