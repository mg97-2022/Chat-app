import Message from "./Message";

export type messageProp = {
  id: string;
  text: string;
  senderId: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  img: string;
};

type messagesProps = {
  messages: messageProp[];
};

const UserMessages = (props: messagesProps) => {
  return (
    <div className="userMessages">
      {props.messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  );
};

export default UserMessages;
