import cam from "../../../assets/images/cam.png";
import add from "../../../assets/images/add.png";
import more from "../../../assets/images/more.png";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

export const handleName = (name: string) => {
  return name.slice(0, name.indexOf(" "))
}

const Topbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);


  return (
    <div className="top">
      <div className="left">
        <HiArrowNarrowLeft
          onClick={() => dispatch(uiSliceActions.showUsersList())}
        />
        <img src={user.photoURL} alt="" />
        <span>{handleName(user.displayName)}</span>
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
