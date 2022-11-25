import cam from "../../../assets/images/cam.png";
import add from "../../../assets/images/add.png";
import more from "../../../assets/images/more.png";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

export const handleName = (name: string) => {
  return name.includes(" ") ? name.slice(0, name.indexOf(" ")) : name;
};

const Topbar = () => {
  const dispatch = useAppDispatch();
  const friend = useAppSelector((state) => state.chat.friend);

  return (
    <div className="top">
      <div className="left">
        <HiArrowNarrowLeft
          onClick={() => dispatch(uiSliceActions.showList())}
        />
        <img src={friend.photoURL} alt="" />
        <span>{handleName(friend.displayName)}</span>
      </div>
      <div>
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
      </div>
    </div>
  );
};

export default Topbar;
