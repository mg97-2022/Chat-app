// firebase
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

type googleAuth = {
  onError: (error: boolean) => void;
  onLoading: (load: boolean) => void;
};

const GoogleAuth = (props: googleAuth) => {
  const { onError, onLoading } = props;
  const navigate = useNavigate();

  const signinWithGoogle = async () => {
    onError(false);
    onLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });

      // check if this is the first time to log in with google to create node at userChats
      const response = await getDoc(doc(db, "userChats", result.user.uid));
      if (!response.exists()) {
        await setDoc(doc(db, "userChats", result.user.uid), {});
      }

      onLoading(false);
      navigate("/");
    } catch (error: any) {
      onError(true);
    }
  };
  return (
    <div className="google">
      <button onClick={signinWithGoogle} type="button">
        Log in with google
      </button>
    </div>
  );
};

export default GoogleAuth;
