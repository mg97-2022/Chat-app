import { useAppDispatch } from "../../../hooks/hooks";
import { chatSliceActions } from "../../../store/chat";
import { uiSliceActions } from "../../../store/ui";

const Chat = ({ friend }) => {
  const dispatch = useAppDispatch();

  const showMessagesHandler = async () => {
    // used to show messages part in mobile
    dispatch(uiSliceActions.hideList());
    dispatch(chatSliceActions.updateFriend(friend.userInfo));
  };
  return (
    <div className="chat" onClick={showMessagesHandler}>
      <img src={friend.userInfo.photoURL} alt="" />
      <div>
        <span>{friend.userInfo.displayName}</span>
        {/* {friend.lastMessage.text !== null && <span>{friend.lastMessage.text}</span>} */}
      </div>
    </div>
  );
};

export default Chat;
