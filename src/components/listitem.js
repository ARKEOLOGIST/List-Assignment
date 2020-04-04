import React from 'react';
import './listitem.css';

function ListItem(props) {
 return (
<div className="list">
  <div className="type">
  <h3>{props.heading}</h3>
  <h3>{props.priority}</h3>
  <h3>{props.description}</h3>
  <h3>{props.date}</h3>
  </div>
</div>
 );
}

export default ListItem;
