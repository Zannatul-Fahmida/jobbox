import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      }
      else{
        dispatch(toggleLoading())
      }
    });
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
