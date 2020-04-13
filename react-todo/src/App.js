import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      neuerTask: ''
    }
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    })

  }

  addNeuerTask() {
    const tasks = [...this.state.tasks];
    const neuerTask = {
      id: tasks.length + 1 + Math.random(),
      title: this.state.neuerTask.slice(),
      erledigt: false
    }
    tasks.push(neuerTask);

    this.setState({
      tasks,
      neuerTask: ''
    })
  }

  deleteItem(id) {
    const tasks = [...this.state.tasks];

    const updateTasks = tasks.filter(item => item.id !== id)

    this.setState({ tasks: updateTasks })
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Neuer Task"
          value={this.state.neuerTask}
          onChange={e => this.updateInput("neuerTask", e.target.value)}
        />
        <button onClick={() => this.addNeuerTask()} >
          hinzufügen
        </button>

        <br />

        <ul>
          {this.state.tasks.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" value={item.erledigt} />
                {item.title}
                <button
                  onClick={() => this.deleteItem(item.id)}>
                  &times;
                </button>
              </li>
            )
          })}
        </ul>

      </div >
    );
  }
}

export default App;
