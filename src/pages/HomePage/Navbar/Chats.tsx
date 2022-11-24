import React, { useEffect, useState } from "react";
import Chat from "./Chat";

// firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppSelector } from "../../../hooks/hooks";
import SearchResult from "./SearchResult";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const user = useAppSelector((state) => state.user.user);
  const SearchFriend = useAppSelector((state) => state.user.SearchFriend);

  // update chats when any change happens in database in userChats node
  useEffect(() => {
    const updateFriends = () => {
      onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setUsers(Object.entries(doc.data()));
      });
    };

    user !== null && updateFriends();

    return () => updateFriends();
  }, [user]);

  return (
    <div className="chats">
      <>
        {/* {users.length === 0 && <p>Found no users</p>} */}
        {SearchFriend !== null && <SearchResult />}
        {users.length !== 0 &&
          users.map((friend) => <Chat key={friend[0]} friend={friend[1]} />)}
      </>
    </div>
  );
};

export default Chats;
