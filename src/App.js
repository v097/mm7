import React, { Component } from 'react';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            todoInput: '',
            keyInput: ''
        };
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    addTodo() {
        const todoList = this.state.todoList;
        let el = [this.state.todoInput.trim(), this.uuidv4()]
        todoList.push(el);

        this.setState({
            todoList,
            todoInput: '',
            todoInputValid: false,
        })
    }

    inputChange(v) {
        let todoInputValid = v.replace(/ /g,'').length >= 3 ;

        this.setState({
            todoInput: v,
            todoInputValid
        })
    }

    sortTodo(){
        let todoList = this.state.todoList;
        todoList.sort();
        console.log(todoList);
        this.setState({
            todoList,

        })
    }

    deleteItem(el){
        let todoList = this.state.todoList;
        const ind = todoList.indexOf(el);
        todoList.splice(ind, 1);

        this.setState({
            todoList
        })
    }

    handleKeyPress(e){
        if (e.key === 'Enter' && this.state.todoInputValid) {
            this.addTodo()
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                <div className="input-group">
                    <input className="form-control" type="text"
                       value={this.state.todoInput}
                        onChange={(e) => this.inputChange(e.target.value)}
                           onKeyPress={(e) => this.handleKeyPress(e) }
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary btn-sm"
                                disabled={!this.state.todoInputValid}
                                onClick={() => this.addTodo()}>Add</button>
                        <button className="btn btn-success btn-sm"
                                onClick={() => this.sortTodo()}>Sort</button>
                    </div>
                </div>
                    <ul>
                        {
                            this.state.todoList.map(el =>
                                <li key={el[1]}>{el[0]}
                                    <button className="btn btn-danger btn-sm"
                                            onClick={()=>this.deleteItem(el)}>Delete</button>
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
