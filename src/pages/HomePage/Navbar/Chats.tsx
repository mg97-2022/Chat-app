import React from "react";
import Chat from "./Chat";

const Chats: React.FC<{ friends: any }> = ({ friends }) => {

  return (
    <div className="chats">
      {!friends.displayName && <p>Found no users</p>}
      {friends.displayName && <Chat friend={friends} />}
      
    </div>
  );
};

export default Chats;
