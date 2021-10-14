import React, { Component } from "react"
import fetch from "isomorphic-fetch"
// local imports
import "../css/SearchResult.css"
import UserInfo from "./UserInfo"
import Loading from "./Loading"

class SearchResult extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      clickedUser: null,
      fullUserInfo: {},
      repoInfo: [],
      loadingstate: false,
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  // sets the targeted (clicked) user information to the clickedUser state
  handleItemClick = (e) => {
    e.preventDefault()
    const clicked = Number(e.target.parentNode.id)
    this.setState({
      clickedUser: clicked,
      loadingstate: true,
    })

    // fetches the full profile information of the clicked user from the backed
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devUsername: this.props.usersInfo[clicked].login,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let myArr = data
        this.setState({
          fullUserInfo: myArr,
          loadingstate: false,
        })
      })

    // fetches the repository information of the clicked user from the backed
    fetch("/GithubUserRepos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devUsername: this.props.usersInfo[clicked].login,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let myArr = data
        this.setState({
          repoInfo: myArr,
          loadingstate: false,
        })
        console.log(this.state.repoInfo)
      })
  }
  // Renders the retunred users in a unordered list
  render() {
    const { clickedUser } = this.state
    const usersInfo = this.props.usersInfo

    return (
      <div className="component">
        <h2 style={{ padding: "30px" }}>Search Results</h2>
        {/* Renders 10 searched users by login name  */}
        <ul>
          {usersInfo.map((item, index) => (
            <li key={item.id} id={index}>
              {" "}
              Username:{" "}
              <a href="#userinfo" onClick={this.handleItemClick}>
                {" "}
                {item.login}{" "}
              </a>
              | View users page:{" "}
              <a style={{ color: "purple" }} href={item.html_url}>
                {item.html_url}
              </a>
            </li>
          ))}
        </ul>
        {/* Shows the loading component */}
        {this.state.loadingstate === true ? <Loading /> : null}
        {/* Renders the clicked user information */}
        {clickedUser !== null && this.state.fullUserInfo ? (
          <UserInfo
            fullUserInfo={this.state.fullUserInfo}
            repoInfo={this.state.repoInfo}
            userInformation={usersInfo[clickedUser]}
          />
        ) : null}
      </div>
    )
  }
}

export default SearchResult
