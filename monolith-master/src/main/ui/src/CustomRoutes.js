import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import LandingPage from "./containers/LandingPage";
import Profile from "./components/Profile/Profile";
import CreateParty from "./components/CreateParty/CreateParty"
import Details from "./components/Details/Details";

function CustomRoutes() {
  //get the current route path
  const pathname = useLocation().pathname;

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<LandingPage pathname={pathname} />}
        ></Route>
        <Route
          path="/signup"
          element={<LandingPage pathname={pathname} />}
        ></Route>
     
       
        <Route path="/" element={<Homepage pathname={pathname} />}>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="create" element={<CreateParty />}></Route>
          <Route path="detail/:userId/:partyId" element={<Details />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRoutes;
