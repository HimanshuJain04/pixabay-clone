import { Routes, Route } from "react-router-dom";
import { Home } from "./containers"
import { Header } from "./components"

function App() {
  return (
    <div className="flex w-screen h-screen flex-col justify-start items-center">

      {/* header */}
      <Header />

      {/* main */}
      <main className=" flex justify-center items-center h-full w-full">
        {/* routes */}
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
