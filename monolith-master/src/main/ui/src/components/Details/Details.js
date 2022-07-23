import "./details.css"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCards from '../eventCards/EventCards';
import {getUserId} from "../../utils/Utilities";
import image from "../../assets/default-profile-img.jpg";



function Details (props) {

    const partyId = useParams().partyId;
    const userId = useParams().userId;
    const [partyDetails, setPartyDetails] = useState();
    const [userParties, setUserParties] = useState();
    const [host, setHost] = useState();
    const [id, setId] = useState(partyId);
    const [user, setUser] = useState()

    useEffect(() => {

        if (partyDetails) {
            axios.get(`http://localhost:8080/user/${getUserId()}`).then(res => {
                if (res.status === 200) {

                    setUser(res.data)

                }
            })
        }

        axios.get(`http://localhost:8080/party/${partyId}`).then(res => {
            if(res.status === 200) {

                setPartyDetails(res.data);
            }
        })

        axios.get(`http://localhost:8080/user/${userId}`).then(res => {
            if(res.status === 200) {
              setUserParties(res.data.parties)

            }
          })




    }, [])

    const attend = (event, partyId) => {

        axios.post(`http://localhost:8080/party/${id}/${getUserId()}`, {} ,{ headers: {"token" :  sessionStorage.getItem("token") }})
            .then((res) => {
                if (res.status === 200) {
                    setUserParties(userParties.concat(res.data))

                           setPartyDetails( ({
                               ...partyDetails,
                               attendees:
                                   [partyDetails.attendees.concat(user)]



                    }))

                }
            });
    }

    const leave = (event, partyId) => {
        event.preventDefault()

        axios.delete(`http://localhost:8080/party/${id}/${getUserId()}` ,{ headers: {"token" :  sessionStorage.getItem("token") }})
            .then((res) => {


                if (res.status === 200) {
                    if(res.data.id === partyDetails.id){
                        console.log("yes")
                    for (let i=partyDetails.attendees.length -1; i>=0; i--){


                            setPartyDetails( ({
                                ...partyDetails,
                                attendees:
                                    partyDetails.attendees.filter((value)=>value!=partyDetails.attendees[i])



                            }))




                        }
                    }



                    for (let i=userParties.length -1; i>=0; i--){
                        if(res.data.id === userParties[i]['id']){
                            setUserParties(userParties.filter((value)=>value!=userParties[i]))


                        }
                    }






                }


            });
    }
    if (partyDetails) {
        axios.get(`http://localhost:8080/user/${partyDetails.host}`).then(res => {
            if(res.status === 200) {

                setHost(res.data.firstName +" " + res.data.lastName)
            }
        })


        return (
            <>
                {

                    <div className="detailcard">
                        <div className="detcard"><EventCards pathName="details" party={partyDetails} attend={attend} leave={leave} userParties={userParties}/></div>
                        <div className="deticons">
                                <div className="deticonparent">
                                    <div className="name">
                                        <div className="IImage"><img className="iconImageName" style={{borderRadius: "232px", marginLeft: "65px"}} src={image}/></div>
                                        <div className="idescription"><p className="iconText">{host }</p></div>
                                    </div>
                                    <div className="goers">


                                       
                                        <div className="IImage"><div className="iconImageName group-img"><span style={{fontSize:"100px"}} className="material-symbols-rounded">groups</span></div></div>
                                        <div className="idescription"><p className="iconText">{Number(partyDetails.attendees.length)} Party Goers</p></div>
                                    </div>
                                    <div className="spots">
                                        <div className="group-img IImage"><span style={{fontSize: "80px", marginLeft: "75px"}}class="material-symbols-rounded">hourglass_top</span></div>
                                        <div className="idescription"><p className="iconText">{Number(partyDetails.maxCapacity)-Number(partyDetails.attendees.length)} Spots Left</p></div>
                                    </div>
                                </div>
                        </div>
                    </div>
                }
            </>

        );

    }
    else{
        return(
            <></>
            )


    };
}


export default Details;