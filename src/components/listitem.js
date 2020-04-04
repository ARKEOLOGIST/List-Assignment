import React from 'react';
import './listitem.css';

function ListItem(props) {
 return (
<div className="list">
  <div className="type">
   <div className="top">
   <span className="data">
    <h3>{props.date}</h3>
   </span>
   <span className="data">
    <h3>{props.priority}</h3>
   </span>
   </div>
   <div className="heading">
    <h3>{props.heading}</h3>
   </div>
   <div className="information">
    <h3>{props.description}</h3>
   </div>
   <div className="top">
    <button className="list-button">Edit</button>
    <button className="list-button" onClick={props.deleteItem}>Delete</button>
   </div>  
  </div>
</div>
 );
}

export default ListItem;
