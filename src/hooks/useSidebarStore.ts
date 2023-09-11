import { useDispatch, useSelector } from "react-redux";
import { onToggleSidebar } from "../store/slices";
import { RootState } from "../store/store";

export const useSidebarStore = () => {

  const { isSidebarOpen } = useSelector( (state: RootState) => state.sidebar );
  const dispatch = useDispatch();
  
  const toggleSidebar = () => { dispatch( onToggleSidebar() ) };

  return {

    // Properties
    isSidebarOpen,

    // Methods
    toggleSidebar

  }

}

