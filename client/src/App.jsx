import { Routes, Route } from "react-router-dom";
import { Home } from "./containers"
import { Header, Loader } from "./components"
import { useEffect } from "react";
import { firebaseAuth } from "./config/firebase.config";
import { createNewUser } from "./sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userAction";
import { useState } from "react";

function App() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((result) => {

      if (result) {
        createNewUser(result?.providerData?.[0])
          .then(() => {
            dispatch(SET_USER(result?.providerData?.[0]));
          });
      }
    })
    setIsLoading(false);

  }, []);


  return (
    <div className="flex overflow-x-hidden w-screen min-h-screen flex-col justify-start items-center">

      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            {/* header */}
            <Header />

            {/* main */}
            <main className=" flex justify-center items-center h-full  w-full">
              {/* routes */}
              <Routes>
                <Route path="/*" element={<Home />} />
              </Routes>

            </main>
          </>
        )
      }


    </div>
  );
}

export default App;
