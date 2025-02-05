import { createContext, Dispatch, useReducer } from "react";
import { action, User, UserType } from "./components/User";
import LoginUser from './components/Login/LoginUser'
import store from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./Router";
import Footer from "./components/Footer";

export const UserContext = createContext<[UserType, Dispatch<action>]>([{} as UserType, () => {}]);

const AppProvider=()=>{
    const [user, userDispatch] = useReducer(User, {} as UserType);
    return (
      <>
        <UserContext value={[user, userDispatch]}>
          <Provider store={store}>
            <LoginUser />
            <RouterProvider router={router} />
          </Provider>
        </UserContext>
        <Footer/>

      </>
    )
}
export default AppProvider