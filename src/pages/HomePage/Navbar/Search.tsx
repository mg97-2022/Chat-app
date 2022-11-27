import React, { useState, useEffect, useCallback } from "react";

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

  const searchUserHandler = useCallback(async () => {
    setError(false);
    // search for users in database
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", enteredValue));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError(true);
      }
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
  }, [dispatch, enteredValue, user]);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Enter") {
        e.preventDefault();
        searchUserHandler();
      }
    };
    document.addEventListener("keypress", keyPressHandler);
    return () => {
      document.removeEventListener("keypress", keyPressHandler);
    };
  }, [searchUserHandler]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="enter friend name"
        onChange={(e) => {
          setEnteredValue(e.currentTarget.value);
          setError(false);
        }}
        value={enteredValue}
      />
      {error && <p>please enter a valid name</p>}
    </div>
  );
};

export default Search;
