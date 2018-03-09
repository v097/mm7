import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            todoInput: 'abc'
        };
    }

    addTodo() {
        const todoList = this.state.todoList;
        todoList.push(this.state.todoInput);

        this.setState({
            todoList,
            todoInput: ''
        })
    }

    sortTodo(){
        const todoList = this.state.todoList;
        todoList.sort();

        this.setState({
            todoList,
            todoInput: ''
        })
    }

    deleteItem(el){
        let todoList = this.state.todoList;
        const ind = todoList.indexOf(el);
        todoList.splice(ind, 1);

        this.setState({
            todoList,
            todoInput: ''
        })
    }

    render() {
        return (
            <div className="App">

                <input type="text"
                       value={this.state.todoInput}
                       onChange={(e) => this.setState({ todoInput: e.target.value })}
                />
                <button onClick={() => this.addTodo()}>Add</button>
                <button onClick={() => this.sortTodo()}>Sort</button>
                <ul>
                    {
                        this.state.todoList.map(el => <li key={el}>{el}
                        <button onClick={()=>this.deleteItem(el)}>Delete</button></li>)
                    }
                </ul>

            </div>
        );
    }
}

export default App;
