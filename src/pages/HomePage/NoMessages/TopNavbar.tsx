import { HiArrowNarrowLeft } from "react-icons/hi";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { uiSliceActions } from "../../../store/ui";

export const handleName = (name: string) => {
  return name.slice(0, name.indexOf(" "))
}

const TopNavbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const friend = useAppSelector(state=>state.chat.friend)

  return (
    <div className="top">
      <div className="left">
        <HiArrowNarrowLeft
          onClick={() => dispatch(uiSliceActions.showList())}
        />
      </div>
    </div>
  );
};

export default TopNavbar;
