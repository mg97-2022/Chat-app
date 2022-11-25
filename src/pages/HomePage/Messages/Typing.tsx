import React, { useCallback, useEffect, useState } from "react";
import attachImg from "../../../assets/images/attach.png";
import { useAppSelector } from "../../../hooks/hooks";
import { v4 as uuidv4 } from "uuid";

// firebase
import { storage, db } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const Typing = () => {
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const user = useAppSelector((state) => state.user.user);
  const friend = useAppSelector((state) => state.chat.friend);

  const sendMessagesHandler = useCallback(async () => {
    if (text === "" && img === null) return;
    const uniqueIdForChat =
      user.uid > friend.uid ? user.uid + friend.uid : friend.uid + user.uid;
    const chats = doc(db, "chats", uniqueIdForChat);
    // if the messages contains image, I will send it to storage then the url of it to db to update messages array
    if (img) {
      try {
        // upload img to firebase storage
        const storageRef = ref(storage, uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error: any) => {
            setError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // Atomically add a new region to the "regions" array field.
                await updateDoc(chats, {
                  messages: arrayUnion({
                    id: uuidv4(),
                    senderId: user.uid,
                    text,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } catch (error: any) {
        setError(true);
      }
    }
    // it the message only contains text, I will update messages array in db
    else if (text !== "") {
      await updateDoc(chats, {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }
    // update chat between two users to add the last message between them
    await updateDoc(doc(db, "userChats", user.uid), {
      [uniqueIdForChat + ".lastMessage"]: {
        text,
      },
      [uniqueIdForChat + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", friend.uid), {
      [uniqueIdForChat + ".lastMessage"]: {
        text,
      },
      [uniqueIdForChat + ".date"]: serverTimestamp(),
    });

    // empty input after each message
    setText("");
    setImg(null);
  }, [user, friend, img, text]);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Enter") {
        e.preventDefault();
        sendMessagesHandler();
      }
    };
    document.addEventListener("keypress", keyPressHandler);
    return () => {
      document.removeEventListener("keypress", keyPressHandler);
    };
  }, [sendMessagesHandler]);

  return (
    <div className="typing">
      <input
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
        type="text"
        placeholder="Type something..."
      />
      <div>
        <input
          onChange={(e) => setImg(e.currentTarget.files[0])}
          type="file"
          id="fileMessage"
        />
        <label htmlFor="fileMessage">
          <img src={attachImg} alt="" />
        </label>
        <button onClick={sendMessagesHandler}>send</button>
      </div>
    </div>
  );
};

export default Typing;
