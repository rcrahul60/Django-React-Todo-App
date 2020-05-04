import React, { Component } from "react";
//import Modal from "./components/Modal";
import axios from "axios";
//import CustomForm from "./components/Form"
import './App.css';

class App extends React.Component{
constructor(props){ 
  super(props);
  this.state = {
    todoList: [],
    activeItem:{
      
      title:'',
      completed:false,
    },
    editing:false,
  }
 // this.refreshList= this.refreshList.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
  this.handleEdit = this.handleEdit.bind(this)
};

componentDidMount(){
  //console.log('this working');
  this.refreshList();
}
refreshList = () => {
  console.log('reached here')
  axios
  .get("http://localhost:8000/api/task-list/")
  .then(res => this.setState({todoList:res.data}))
  .catch(err => console.log(err));
};
handleChange(event){
  //var name = event.target.name
  var value = event.target.value
  

    this.setState(prevState => ({activeItem: {...prevState.activeItem, title: value, completed: false }}));

    
}
handleSubmit = (event, task) =>{
  event.preventDefault();
  console.log(this.state.activeItem)
if(task.id){
  axios
  .post(`http://localhost:8000/api/task-update/${task.id}/`,task)
  .then(response => {
    this.refreshList();
    this.setState({activeItem: {title:'',
    completed:false,}})
  })
  .catch(error => {
    console.log(error)
  })
  return;
}
axios
.post("http://localhost:8000/api/task-create/",this.state.activeItem)
.then(response =>this.refreshList())
.catch(error =>{
  console.log(error)
});
};

handleEdit= task =>{
  //console.log(task, 'edit');
  this.setState({
    activeItem: task,
    editing: true
  })
}

handleDelete = task =>{
  axios
  .delete(`http://localhost:8000/api/task-delete/${task.id}/`)
  .then(response => this.refreshList())
  .catch(error => {
    console.log(error)
  })
};

  render(){
    var task = this.state.todoList;
    return (
      <div className="container">
          <div id='task-container'>

    <div id="form-wrapper">
      <form onSubmit={(event) => this.handleSubmit(event, this.state.activeItem)} id="form">
        <div className="flex-wrapper">
                  <div style={{ flex: 6 }}>
  <input className="form-control" type="text" id="title" value={this.state.activeItem.title} name="title" placeholder="add task ..." onChange={this.handleChange} />
  </div>          
  <div style={{ flex: 2 }}>
  <button className="btn btn-warning" name="submit" id="submit">Add Task</button>
  </div>
  </div>
</form>

    </div>

    <div id="list-wrapper">
{task.map((task,index) => {
  return(
    <div key={index} className="task-wrapper flex-wrapper">
      <div style={{ flex:6}}>
        <span>{task.title}</span>
      </div>
      <div style={{flex:2}}>
        <span>{task.created_at}</span>
      </div>
      <div style={{ flex:2}}>
        <button className="btn btn-sm btn-outline-info delete" onClick = { () => this.handleEdit(task) }>Edit</button>
      </div>
      <div style={{flex:1}}>
        <button className="btn btn-sm btn-outline-dark delete" onClick={() => this.handleDelete(task)}>Delete</button>
      </div>

      </div>
  )
})}
    </div>
  </div>


        </div>
    )
  }
}


export default App;