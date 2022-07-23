import { useNavigate } from "react-router-dom";
import { logoutService } from "../../service/UserService";
import "./AuthNav.css"

export default function AuthNav({pathname}) {
  let navigate = useNavigate();
  
  const createParty = () => {
    navigate("/create");
  };

  const profile = () => {
      navigate("/profile")
  }

  const logout = () => {
      logoutService();
      navigate("/")
  }

  const isNotProfilePage = () => {
    if(pathname !== "/profile") {
      return (
        <div className="child ">
        <button className="profile-button button" onClick={profile}>
          Profile
        </button>
      </div>
      );
    }
  }

  const isNotCreatePage = () => {
    if(pathname !== '/create') {
    return (
      <button className="create-party-button button" onClick={createParty}>
          Create Party
        </button>  
    );
    }
  }

  return (
    <div className="parent">
      {isNotProfilePage()}
      <div className="child">
        {isNotCreatePage()}    
      </div>
      <div className="child">
        <button className="logout-button button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
