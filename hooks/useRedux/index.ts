import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store";

const useRedux = () => {
  const dispatch: AppDispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  return { app, dispatch };
};

export { useRedux };
