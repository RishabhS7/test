import React from "react";
import  { Redirect } from "react-router-dom";


class Index extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            error: null
        }
    }

    handleSignIn = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        if(username ==='root' && password==='root'){
            this.setState({ loggedIn: true })
            localStorage.setItem('token', 'token:'+username+'-'+password) // store token in local storage
        }
        this.setState({ error: 'Id and password are wrong.!' })
        return false;
    }

    render() {
        const { loggedIn, error, username, password } = this.state
        if(loggedIn){
            return <Redirect to="/user" />
        }
        return(
            <div>
                <form onSubmit={this.handleSignIn}>
                    <h3>Sign in</h3>
                    <p style={{color: "red"}}>{error}</p>
                    <br/><br/><input type="text" required value={username} onChange={(e)=>this.setState({ username: e.target.value})} placeholder="enter you username" />
                    <br/><br/><input type="password" required value={password} onChange={(e)=>this.setState({ password: e.target.value})}  placeholder="enter password" />
                    <br/><br/><button type="submit" >Submit</button>
                </form>
            </div>
        )
    }
}

export default Index;