import React, { useState } from "react";

// firebase
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const Search: React.FC<{ getFriends: (data: any) => void }> = ({
  getFriends,
}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState<boolean>(false);

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
          getFriends(doc.data());
        });
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
      />
    </div>
  );
};

export default Search;
