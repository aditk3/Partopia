
import "./eventCards.css";
import { getUserId, parseDate } from "../../utils/Utilities";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/default-party-img.jpg";



function EventCards(props) {
  const navigate = useNavigate();
  const partyId = props.partyId;

  const checkToken = () => {
    if(sessionStorage.getItem("token")) {
      // console.log(props)
      return(
        <div className="card-buttons">
          {
            props.pathName === "details" ? <button className="details-button" style={{visibility:"hidden"}}></button> : <button className="details-button" onClick={() => {navigate(`/detail/${getUserId()}/${props.party.id}`)}}>Details</button>
          }
          {
            renderAttendingButton()
          }
        </div>
      );
    }
  }

  const leave = (event) => {

  }




  const renderAttendingButton = () => {
    if(checkAttendingParting()) {
      return (<button className="attendance-leave-button" onClick={(event) => props.leave(event, props.partyId) }>Leave</button>);
    }
    else if(checkOwnerParty()) {
      return (<button className="attendance-leave-button" >Edit</button>);
    }
    else{
      return (<button className="attendance-button" onClick={ (event) => props.attend(event, props.partyId) }>Attend</button>)
    }

  }

  const checkAttendingParting = () => {
    if(props.userParties) {
      for(let i = 0; i < props.userParties.length; i = i + 1 ) {
          if(props.party.id === props.userParties[i].id) {
            return true;
          }
      }
    }
  }

  const checkOwnerParty = () => {
    if(props.userParties) {
      for(let i = 0; i < props.userParties.length; i = i + 1 ) {
        if(getUserId() === props.party.host) {
          return true;
        }
      }
    }
  }

  return (
    <div className="card">
      <div className="imageDiv">
        <img
          src={props.party.img ? props.party.img : image}
          alt="Avatar"
        />
        <div className="eventWrapper">
          {" "}
          <label className="eventTitle">{props.party.partyName}</label>
        </div>
      </div>
      <div className="container">
        <div className="dateandlocation">
          <div className="date">
            <p>{parseDate(props.party.startDate)}</p>
          </div>
          <div className="location">
            <p>{props.party.location}</p>
          </div>
        </div>
        <div className="time">
          <p>{props.party.startTime}</p>
        </div>

        <div className="Description">
          <p>
            {props.party.description ? props.party.description : "Join this amazing party!!!"}
          </p>
        </div>
        {checkToken()}
      </div>
    </div>
  );
}

export default EventCards;
