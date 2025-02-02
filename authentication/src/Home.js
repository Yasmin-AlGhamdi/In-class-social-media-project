import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Post from './Post'
import PopUp from './PopUp'

export default class Home extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            name: "",
            email: "",
            picture: "",
            images: []
        }
    }

    componentDidMount = () => {
        this.setState({ name: localStorage.getItem("name") })
        this.setState({ email: localStorage.getItem("email") })
        this.setState({ picture: localStorage.getItem("picture") })

        axios.get('https://dog.ceo/api/breeds/image/random/7')
        .then(res => { // res is the result of getting the api
            //console.log(res.data.message) // we have to print the response
            this.setState({images:res.data.message})
        })
    }
    logout = () => {
        localStorage.clear()
    }
    render() {
        return (
            <div>
                <nav>
                    <Link to="/" > Home </Link>
                    <Link to="/Contact"> Contact </Link>
                    <Link to="/logout" onClick={this.logout}> Logout </Link>

                </nav>
                <div className="pageHeader">
                    <img className="avatar" alt="avatar" src={this.state.picture} />
                    <h4>{this.state.name}</h4>
                    <h5>{this.state.email}</h5>
                </div>
                <PopUp />
                {this.state.images.map((item, index) => (
                    <Post key={index} title="This is my dog" img={item} />
                ))}
                <p>Home</p>
            </div>
        )
    }
}
