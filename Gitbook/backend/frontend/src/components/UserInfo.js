import React, { Component } from "react"
import fetch from "isomorphic-fetch"
import { Container, Row, Col } from "react-bootstrap"
import RepoInfo from "./RepoInfo"

export class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedRepo: null,
      commitsInfo: [],
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  // sets the targeted (clicked) repo information to the clickedRepo state
  handleItemClick = (e) => {
    console.log("Clicked the repo to display")
    e.preventDefault()
    const clicked = Number(e.target.parentNode.id)
    this.setState({
      clickedRepo: clicked,
    })

    // fetches the commit information of the clicked repo from the backed
    fetch("/GithubUserRepoCommits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devUsername: this.props.userInformation.login,
        repoName: this.props.repoInfo[clicked].name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let myArr = data
        this.setState({
          commitsInfo: myArr,
        })
      })
  }
  // Displsy the selected user information
  render() {
    const clickedRepo = this.state.clickedRepo
    const username = this.props.userInformation.login,
      avatar = this.props.userInformation.avatar_url,
      reposInfo = this.props.repoInfo,
      commitsInfo = this.state.commitsInfo,
      bio = this.props.fullUserInfo.bio

    return (
      <div id="userinfo" style={{ padding: "30px" }}>
        <Container>
          <h2>User Info</h2>
          <Row style={{ padding: "30px" }}>
            <Col></Col>
            <Col>
              <img
                style={{ height: "230px", width: "auto" }}
                src={avatar}
                alt="avatar"
              />
            </Col>
            <Col style={{ padding: "27px 0" }}>
              <h1>{username}</h1>
            </Col>
            <Col></Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            {/* Renders 3 Repositories */}
            <Col>
              {" "}
              <h2 style={{ padding: "30px" }}>User Repositories</h2>
              <ul>
                {reposInfo.map((item, index) => (
                  <li key={item.id} id={index}>
                    {" "}
                    Repo Name:{" "}
                    <a href="#repoinfo" onClick={this.handleItemClick}>
                      {" "}
                      {item.name}{" "}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col>
              <h2 style={{ padding: "10px" }}>Bio</h2> {bio}
            </Col>
          </Row>
        </Container>
        {/* Renders the clicked Repository information */}
        {clickedRepo !== null ? (
          <RepoInfo
            repoInformation={reposInfo[clickedRepo]}
            commitsInfo={commitsInfo}
          />
        ) : null}
      </div>
    )
  }
}

export default UserInfo
