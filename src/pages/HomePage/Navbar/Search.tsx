import React, { useState } from "react";

// firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { userSliceActions } from "../../../store/user";

const Search = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const searchUserHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      // search for users in database
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", "==", enteredValue));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.uid !== user.uid) {
            dispatch(userSliceActions.setSearchFriend(doc.data()));
          }
        });
        setEnteredValue("");
      } catch (error) {
        setError(true);
      }
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find a user"
        onChange={(e) => setEnteredValue(e.currentTarget.value)}
        onKeyDown={searchUserHandler}
        value={enteredValue}
      />
    </div>
  );
};

export default Search;
