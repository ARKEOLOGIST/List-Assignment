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

 deleteItem(key) 
 {
   const filteredItems = this.state.data.filter(item => item.id!==key);
   const data = { id: key,mode: 2 };
   const options = { headers: {'Content-Type': 'application/json'}};
    axios.post('http://localhost:5000/data',data,options).then(
      res => {console.log(res);}
    );
   this.setState({
      data: filteredItems
   });
 }

 updateItem = (obj,key) =>
 {
   let flag1=0,flag2=0;
  if (obj.heading === '' || obj.description === '')
  {
    flag1 = 1;
  }
  if (obj.date === '')
  {
    flag2 = 1;
  }
  if (flag1 === 1 || flag2 === 1)
  {
    alert('No field can be empty');
  }
  else
  {
    const mappedItems = this.state.data.map((item => {
      if (item.id === key)
      {
        item.heading = obj.heading;
        item.priority = obj.priority;
        item.description = obj.description;
        item.date = obj.date;
      }
      return item;
   }));
   const data = { id: obj.id,mode: 3, heading: obj.heading, priority: obj.priority, description: obj.description, date: obj.date };;
   const options = { headers: {'Content-Type': 'application/json'}};
    axios.post('http://localhost:5000/data',data,options).then(
      res => {console.log(res);}
    );
   this.setState({
     data: [...mappedItems]
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
        //let obj={ id: e.id, heading: e.heading, priority: e.priority, description: e.description, date: e.date };
      return <ListItem
         key={e.id}
         id={e.id}
         heading={e.heading}
         priority={e.priority}
         description={e.description}
         date={e.date}
         handle={this.handleInput.bind(this)}
         deleteItem={this.deleteItem.bind(this,e.id)}
         updateItem={this.updateItem}
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
