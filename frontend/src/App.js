import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/index";
import Signin from "./Components/Authpage/signin";
import Signup from "./Components/Authpage/signup";

import { AuthContextProvider } from "./context/AuthContext";
import Mycontact from "./Pages/contact";
import EditModel from "./Pages/Home/edit";
import ContactModel from "./Pages/Home/Contactmodel";
import { ToastContextProvider } from "./context/ToastContext";

const App = () => {
  return (
    <AuthContextProvider>
      <ToastContextProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Signin />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycontacts" element={<Mycontact />} />
          <Route path="/create-contact" element={<ContactModel />} />
          <Route path="/edit/:id" element={<EditModel />} />
        </Routes>
      </ToastContextProvider>
    </AuthContextProvider>
  );
};

export default App;
