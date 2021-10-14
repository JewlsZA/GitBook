import fetch from "isomorphic-fetch"
import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"
// local imports
import "../css/loading.css"
import SearchResult from "./SearchResult"
import Loading from "./Loading"

class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      devUsername: "",
      usersInfo: [],
      infoLoaded: null,
      loadingstate: false,
    }
    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  // When on submit button is click, searched username is send to backend in data parameter
  // backend returns array of users information
  onSubmitClick = (e) => {
    this.setState({
      loadingstate: true,
    })
    e.preventDefault()
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devUsername: this.state.devUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let myArr = data
        this.setState({
          usersInfo: myArr,
          infoLoaded: 1,
          loadingstate: false,
        })
      })
  }

  render() {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Welcome to GitBook</h1>
        <br />
        {/* user input sets devUsername state */}
        <Form.Control
          value={this.state.devUsername}
          style={{ width: "80%", textAlign: "center", margin: "auto" }}
          type="input"
          placeholder="Search developers here by name"
          onChange={(e) =>
            this.setState({ devUsername: e.target.value.toLowerCase() })
          }
        />
        <br />
        {/* Submit Button */}
        {/* Triggers onClick*/}
        <Button onClick={this.onSubmitClick}>Search</Button>
        {/* Shows the loading component */}
        {this.state.loadingstate === true ? (
        <Loading />
        ) : null}
        {/* Renders the searched username information in a list */}
        {this.state.infoLoaded !== null ? (
          <SearchResult usersInfo={this.state.usersInfo}  />
        ) : null}
      </div>
    )
  }
}

export default Searchbar
