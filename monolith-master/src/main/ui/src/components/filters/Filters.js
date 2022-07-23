import React, {useState} from "react";
import "./Filters.css";
function Filters(){

    return (
    <div>
        <div className="filterParent">
            <div className="parentFilterButton">
                <div><button className="filterButton">ASC</button></div>
                <div><button className="filterButton">DESC</button></div>
            </div>
            <div className="filterByButtonParent">
                 <div><button className="filterButton">Popularity</button></div>
                 <div><button className="filterButton">Date</button></div>
            </div>
             <div> <input className="locationInput" type="text" placeholder="Location:" /> </div>
             <div> <input className="priceInput" type="text" placeholder="Price:"/> </div>
        </div>
    </div>
);
}



export default Filters