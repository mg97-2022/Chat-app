import { useAppSelector } from "../../hooks/hooks";
import Messages from "./Messages/Messages";
import Navbar from "./Navbar/Navbar";
import NoMessages from "./NoMessages/NoMessages";

const HomePage = () => {
  const friend = useAppSelector((state) => state.chat.friend);
  return (
    <div className="homePage">
      <div className="content">
        <Navbar />
        {friend !== null && <Messages />}
        {friend === null && <NoMessages />}
      </div>
    </div>
  );
};

export default HomePage;
