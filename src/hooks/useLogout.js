import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { logout } from "../app/features/userSlice";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _logout = async () => {
    try {
         await signOut(auth);
        dispatch(logout()); 
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
};
