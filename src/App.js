import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     data: {},
       key: '',
       heading: '',
       priority: 'low',
       description: '',
       date: '',
     errortext: '',
     errordate: ''
   }
 }

handleInput(e)
{
  e.preventDefault();
  let flag1 = 0,flag2 = 0;
  if (this.state.heading === '' || this.state.description === '')
  {
    flag1 = 1;
  }
  if (this.state.date === '')
  {
    flag2 = 1;
  }
  if (flag1 === 1 && flag2 === 1)
  {
    this.setState({
      heading: '',
       priority: 'low',
       description: '',
       date: '',
      errortext: 'Either title or description field is empty',
      errordate: 'Date given is empty'
    });
  }
  else if (flag1 === 1 && flag2 === 0)
  {
    this.setState({
      heading: '',
       priority: 'low',
       description: '',
       date: '',
      errortext: 'Either title or description field is empty',
    });
  }
  else if (flag1 === 0 && flag2 === 1)
  {
    this.setState({
      heading: '',
       priority: 'low',
       description: '',
       date: '',
      errordate: 'Date given is empty'
    });
  }
  else
  {
    this.setState({
      heading: '',
       priority: 'low',
       description: '',
       date: '',
      errortext: '',
      errordate: ''
    });
  }
 }

 render()
  {
  return (
   <div className="App">
    <header>
     <form autocomplete = "off" id = "to-do-form" onSubmit={this.handleInput.bind(this)}>
      <input value= {this.state.heading} type="text" id="heading" onChange={(e) => {this.setState({heading: e.target.value})}}>   
      </input>
      <select value={this.state.priority} onChange={(e) => {this.setState({priority: e.target.value})}}>
       <option value="low">Low</option>
       <option value="medium">Medium</option>
       <option value="hard">Hard</option>
      </select>
      <button type="submit">Add</button>
      <textarea value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
      <input type="date" value = {this.state.date} id="date" onChange={(e) => {this.setState({date: e.target.value})}}></input>
      <div className="error">{this.state.errortext!==''?this.state.errortext:null}</div>
      <div className="error">{this.state.errordate!==''?this.state.errordate:null}</div>
     </form>
    </header>
    <div>
    </div>
   </div> 
  );
}
}

export default App;
