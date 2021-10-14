import React, { Component } from "react"
import { Container, Row, Col } from "react-bootstrap"
import "../css/SearchResult.css"

export class RepoInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const repoName = this.props.repoInformation.name,
      creationDate = this.props.repoInformation.created_at,
      lastCommit = this.props.repoInformation.updated_at,
      commitsInfo = this.props.commitsInfo,
      description = this.props.repoInformation.description
    // Renders the clicked repository information
    return (
      <div id="repoinfo" className="component" style={{ padding: "30px" }}>
        <Container>
          <h2>Repository Info</h2>
          <Row style={{ padding: "30px" }}>
            <Col>Repo Name: {repoName}</Col>
            <Col>Creation Date: {creationDate}</Col>
            <Col>Last commit Date: {lastCommit}</Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col>Description: {description}</Col>
          </Row>
          <Row style={{ padding: "30px" }}>
            <Col>Last 5 commits Messages:</Col>
          </Row>
          {/* Renders latest 5 commit messages */}
          <ul>
            {commitsInfo.map((item, index) => (
              <li key={item.node_id} id={index}>
                {" "}
                <p> {item.commit.message} </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    )
  }
}

export default RepoInfo
