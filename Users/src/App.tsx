
import LoginUser from './components/Login/LoginUser'
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { Provider } from 'react-redux'
import store from './store/store'
import AddRecipe  from './components/Recipes/RecipesList'
import RecipeList from './components/Recipes/RecipesList'
import { createContext, Dispatch, useReducer } from 'react'
import { action, User, UserType } from './components/User'


export const userContext = createContext<[UserType, Dispatch<action>]>([{} as UserType, () => { }]);

function App() {
  const [user, userDispatch] = useReducer(User, {} as UserType);

  return (
    <>
     <userContext.Provider value={[user, userDispatch]}>
    <Provider store={store}>
    <LoginUser/>
    <RouterProvider router={router} />
    </Provider>
    </userContext.Provider>
    </>
  )
}
export default App
