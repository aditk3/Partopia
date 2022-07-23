import React, { useState, useEffect } from "react";
import "./homepage.css";
import EventCards from "../eventCards/EventCards";
import Filters from "../filters/Filters"
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import UnAuthNav from "../unAuthNav/unAuthNav";
import AuthNav from "../AuthNav/AuthNav";
import axios from "axios";
import { getUserId } from "../../utils/Utilities";



function Homepage({pathname}) {
  let navigate = useNavigate();
  const location = useLocation();

  const [parties, setParties] = useState([]);
  const [userParties, setUserParties] = useState([]);

  useEffect( () => {

    axios.get("http://localhost:8080/party").then(res => {
      if(res.status === 200) {
        setParties(res.data)
      }
    })


    const currUserId = getUserId();
    if(currUserId) {
      axios.get(`http://localhost:8080/user/${currUserId}`).then(res => {
        if(res.status === 200) {
          setUserParties(res.data.parties)
        }
      })
    }
    
  }, [location])

  const attend = (event, partyId) => {
    
      axios.post(`http://localhost:8080/party/${partyId}/${getUserId()}`, {} ,{ headers: {"token" :  sessionStorage.getItem("token") }})
          .then((res) => {
            if (res.status === 200) {
              setUserParties(userParties.concat(res.data))
            } 
          });
  }

  const leave = (event, partyId) => {

    axios.delete(`http://localhost:8080/party/${partyId}/${getUserId()}` ,{ headers: {"token" :  sessionStorage.getItem("token") }})
        .then((res) => {

            if (res.status === 200) {
              console.log("yes")


                for (let i=userParties.length -1; i>=0; i--){
                            if(res.data.id === userParties[i]['id']){
                                setUserParties(userParties.filter((value)=>value!=userParties[i]))

                            }
                }




          }

        });
  }


  const signUp = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  const renderNav = () => {
    let token = sessionStorage.getItem("token");

    if (token) {
      return(<AuthNav pathname={pathname} />);
    } else {
      return(<UnAuthNav login={login} signUp={signUp} />);
    }
  };



  const renderPosts = () => {
        if(pathname === "/") {
      return (
        <div className="ParentFilterAndEvent">

        <div className="filters">
        <Filters/>
        </div>

         <div className="eventCards">
        <div className="parentevent">
          
          {
          
            parties.map(party => {
              return <div className="item" key={party.id}><EventCards partyId={party.id} attend={attend} leave={leave} party={party} userParties={userParties} /></div>
            })
          } 

          
        </div>
      </div>
        </div>
      );
    }
  }

  return (
    <div>
      <span className="home" onClick={() => {navigate("/")}}>Partopia</span>
      {renderNav()}

      {renderPosts()}
      

     <Outlet />

    </div>
  );
}

export default Homepage;
