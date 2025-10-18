import React, { useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ProtectRoutes from "./components/ProtectRoutes";
import { useDispatch, useSelector } from "react-redux";
import { action as SignUpAction } from "./pages/SignUp";
import { action as LoginAction } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { isAuthReady, login } from "./app/features/userSlice";
import { auth } from "./firebase/config";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";
function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoutes user={user}>
          <MainLayout />
        </ProtectRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <CreateRecipe/>,
        },
        {
          path:"/recipe/:id",
          element:<RecipeDetails/>
        }
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <SignUp />,
      action: SignUpAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user?.displayName){
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
