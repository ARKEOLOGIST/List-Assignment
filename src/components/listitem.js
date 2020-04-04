import React from 'react';
import './listitem.css';

class ListItem extends React.Component {
constructor(props)
{
  super(props);
  this.state = {
    toggle: true,
    heading: this.props.heading,
    priority: this.props.priority,
    description: this.props.description,
    date: this.props.date
  }
}

render()
{
 return (
<div className="list">
  {this.state.toggle?
  <div className="type">
   <div className="top">
   <span className="data">
    <h3>{this.props.date}</h3>
   </span>
   <span className="data">
    <h3>{this.props.priority}</h3>
   </span>
   </div>
   <div className="heading">
    <h3>{this.props.heading}</h3>
   </div>
   <div className="information">
    <h3>{this.props.description}</h3>
   </div>
   <div className="top">
    <button className="list-button" onClick={() => {this.setState({ toggle: false });}}>Edit</button>
    <button className="list-button" onClick={this.props.deleteItem}>Delete</button>
   </div>  
  </div>:
  <div className="type">
  <form autoComplete = "off" id = "todo" onSubmit={(e) => {e.preventDefault(); this.props.updateItem({ id: this.props.id, heading: this.state.heading, priority: this.state.priority, description: this.state.description, date: this.state.date },this.props.id); this.setState({ toggle: true });}}>
  <div className="top">
  <span className="data">
   <input type="date" id="datez" value={this.state.date} onChange={(e) => {this.setState({date: e.target.value})}}></input>
  </span>
  <span className="data">
   <select value={this.state.priority} onChange={(e) => {this.setState({priority: e.target.value})}}>
   <option value="Low">Low</option>
   <option value="Medium">Medium</option>
   <option value="Hard">Hard</option>
   </select>
  </span>
  </div>
  <div className="heading">
   <input type="text" id="head" value={this.state.heading} onChange={(e) => {this.setState({heading: e.target.value})}}></input>
  </div>
  <div className="information">
   <textarea value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
  </div>
  <div className="top">
   <button className="list-button" type = "submit">OK</button>
   <button className="list-button" onClick={() => {this.setState({ toggle: true });}}>Cancel</button>
  </div>
  </form>
 </div>}
</div>
 );
}
}

export default ListItem;
