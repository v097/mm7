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
        let el = {value: this.state.todoInput.trim(), key: this.uuidv4()}
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
        todoList.sort((a,b) => a.value > b.value ? 1 : -1);
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
            this.addTodo();
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">


                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/features">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/pricing">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="/disabled">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </nav>


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
                                <li key={el.key}>{el.value}
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
