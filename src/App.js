import React from 'react';
import axios from 'axios';
import './App.css';
import ListItem from './components/listitem';

class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     data: [],
       heading: '',
       priority: 'low',
       description: '',
       date: '',
     errortext: '',
     errordate: ''
   }
 }

 componentDidMount() {
   axios.get('http://localhost:5000/').then(
     res => {
       console.log(res);
       this.setState({
         data: res.data
       });
     }
   ).catch((err)  => {
     console.log(err);
   });
 }

handleInput(e)
{
  e.preventDefault();
  let flag1 = 0,flag2 = 0;
  console.log(this.state.data);
  if (this.state.heading === '' || this.state.description === '')
  {
    flag1 = 1;
    console.log("flag1="+flag1);
  }
  if (this.state.date === '')
  {
    flag2 = 1;
    console.log("flag2="+flag2);
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
      errordate: ''
      
    });
  }
  else if (flag1 === 0 && flag2 === 1)
  {
    this.setState({
      heading: '',
       priority: 'low',
       description: '',
       date: '',
      errortext: '',
      errordate: 'Date given is empty'
    });
  }
  else
  {
    const data = { id: Date.now(),mode: 1, heading: this.state.heading, priority: this.state.priority, description: this.state.description, date: this.state.date };
    const options = { headers: {'Content-Type': 'application/json'}};
    axios.post('http://localhost:5000/data',data,options).then(
      res => {console.log(res);}
    );
    let p = [...this.state.data];
    p.push(data);
    this.setState({
      data: p,
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
  let items = null;
  if (this.state.data.length > 0)
  {
    items = (
     <div>
      {this.state.data.map(e => {
      return <ListItem
         key={e.id}
         heading={e.heading}
         priority={e.priority}
         description={e.description}
         date={e.date}
         handle={this.handleInput.bind(this)}
      />
    })}
    </div>
    );
  }
  return (
   <div className="App">
    <header>
     <form autoComplete = "off" id = "to-do-form" onSubmit={this.handleInput.bind(this)}>
      <input value= {this.state.heading} type="text" id="heading" onChange={(e) => {this.setState({heading: e.target.value})}}>   
      </input>
      <select value={this.state.priority} onChange={(e) => {this.setState({priority: e.target.value})}}>
       <option value="Low">Low</option>
       <option value="Medium">Medium</option>
       <option value="Hard">Hard</option>
      </select>
      <button type="submit">Add</button>
      <textarea value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
      <input type="date" value = {this.state.date} id="date" onChange={(e) => {this.setState({date: e.target.value})}}></input>
      <div className="error">{this.state.errortext!==''?this.state.errortext:null}</div>
      <div className="error">{this.state.errordate!==''?this.state.errordate:null}</div>
     </form>
    </header>
    <div id="todo">
    {items}
    </div>
   </div> 
  );
}
}

export default App;
