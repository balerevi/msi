import React from 'react';
import './App.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      tasks:[
        {
          'id':1,
          'title':'Task 1',
          'completed': true
        },
        {
          'id':2,
          'title':'Task 2',
          'completed': true
        },
        {
          'id':3,
          'title':'Task 3',
          'completed': false
        }
      ]
    };
    this.taskId = this.getTail(this.state.tasks).id;
  }
  render() {
    return (
        <div className="todo">
          <input type="text" placeholder="New Task" value={this.state.newTask}
                 onChange={e => this.setState({ "newTask": e.target.value})}/>
          <button onClick={() => this.addTask()}>Add</button>
          <ul>
            {this.state.tasks.map((task, index) => {
              return (
                  <p>
                    <input type="checkbox" checked={task.completed} onClick={() => this.toggleTaskStatus(index)} />
                    {task.title}
                    <span className="red" onClick={() => this.removeTask(index)}> X</span>
                  </p>
              )
            })}
          </ul>
        </div>
    );
  }
  addTask(){
    this.taskId += 1;
    let updatedList = this.state.tasks;
    let newTask = {
      id:this.taskId,
      title:this.state.newTask,
      completed: false
    };

    if (newTask.title.trim().length === 0){
      newTask.title = 'Task ' + this.taskId;
    }

    updatedList.push(newTask);
    this.setState({ "newTask": '', "tasks": updatedList});
  }
  removeTask(index){
    let updatedList = this.state.tasks;
    updatedList.splice(index,1);
    this.setState({ "tasks": updatedList});
  }
  toggleTaskStatus(index){
    let updatedList = this.state.tasks;
    updatedList[index].completed = !updatedList[index].completed;
    this.setState({ "tasks": updatedList});
  }
  getLastIndex(array){
    return array.length-1;
  }
  getTail(array){
    const index = this.getLastIndex(array);
    if(index === -1){
      return -1;
    } else{
      return array[index];
    }
  }
}

function App() {
  return (
      <div className="App">
        <h3>ToDo List</h3>
        <TodoList />
      </div>
  );
}

export default App;
