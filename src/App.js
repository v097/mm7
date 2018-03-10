import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            todoInput: []
        };
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
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
