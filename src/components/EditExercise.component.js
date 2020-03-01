import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users:[]
        };
    }

    componentDidMount() {
        // this.setState({
        //     users: ['test-user'],
        //     username:'test-user'
        // });
        axios.get('http://localhost:5020/exercises/'+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                });
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:5010/users/')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map((user) => user.username),
                    });
                }
            });
    }
    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangeUserDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangeUserDuration = (e) => {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeUserDate = (date) => {
        this.setState({
            date: date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };
        console.log(`This is ${exercise}`);
        axios.post("http://localhost:5010/exercises/update/"+this.props.match.params.id, exercise)
            .then(res => {
                window.location = "/"; 
                console.log(res.data) 
            });
    
    }
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={(e) => this.onChangeUserName(e)}
                        >
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option
                                            key={user}
                                            value={user}
                                        >{user}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={(e) => this.onChangeUserDescription(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={(e) => this.onChangeUserDuration(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={(e) => this.onChangeUserDate(e)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Exercise" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}

export default EditExercise;