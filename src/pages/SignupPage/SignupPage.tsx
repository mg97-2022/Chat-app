import React, { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/addAvatar.png";
// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import GoogleAuth from "../../components/GoogleAuth";

const SignupPage = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const enteredName = useRef<HTMLInputElement>(null);
  const enteredEmail = useRef<HTMLInputElement>(null);
  const enteredPassword = useRef<HTMLInputElement>(null);
  const enteredImg: any = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const displayName = enteredName.current!.value;
    const email = enteredEmail.current!.value;
    const password = enteredPassword.current!.value;
    const img = enteredImg.current!.files[0];

    try {
      setIsLoading(true);

      // user sign up
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // upload img to firebase storage
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error: any) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user data (name and image) located in firebase
            await updateProfile(user.user, {
              displayName,
              photoURL: downloadURL,
            });

            //make list of users
            await setDoc(doc(db, "users", user.user.uid), {
              uid: user.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            // make a new chats for each user in database
            await setDoc(doc(db, "userChats", user.user.uid), {});
            navigate("/");
          });
        }
      );
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const googleErrorHandler = (err) => {
    setError(err)
  }
  const googleLoadingHandler = (load) => {
    setIsLoading(load)
  }

  return (
    <div className="formContainer">
      <div className="content">
        <h2>let's chat</h2>
        <span>Register</span>
        <form onSubmit={submitHandler}>
          <input ref={enteredName} required type="text" placeholder="name" />
          <input ref={enteredEmail} required type="email" placeholder="email" />
          <input
            ref={enteredPassword}
            required
            type="password"
            placeholder="password"
          />
          <input ref={enteredImg} type="file" id="file" />
          <label className="fileUpload" htmlFor="file">
            <img src={img} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {isLoading && <p>loading</p>}
        </form>
        <GoogleAuth onError={googleErrorHandler} onLoading={googleLoadingHandler} />
        <p>
          You don't have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
