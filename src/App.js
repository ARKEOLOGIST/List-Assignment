import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     data: {}
   }
 }

 render()
  {
  return (
   <div className="App">
    <header>
     <form id = "to-do-form">
      <input type="text" id="heading">   
      </input>
      <select>
       <option value="low">Low</option>
       <option value="medium">Medium</option>
       <option value="hard">Hard</option>
      </select>
      <button type="submit">Add</button>
      <textarea></textarea>
      <input type="date" id="date"></input>
     </form>
    </header>
    <div>
    </div>
   </div> 
  );
}
}

export default App;
