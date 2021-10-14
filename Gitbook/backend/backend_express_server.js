const express = require("express")
const fetch = require("isomorphic-fetch")
const helmet = require("helmet")
const fs = require("fs")
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require("body-parser")
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// This allow app to serve static files in the public folder
app.use(express.static("public"))

//Github search by login/username and return a - - SINGLE USER - -
//EXAMPLE: https://api.github.com/users/Jewlsza
getGithubUser = async (username) => {
  const results = await fetch(`https://api.github.com/users/${username}`)
  const details = await results.json()
  return details
}

//Github search by login/username and return a - - ALL USERS - -
//EXAMPLE: https://api.github.com/search/users?q=ju
getGithubUsers = async (username) => {
  const results = await fetch(
    `https://api.github.com/search/users?q=${username}`
  )
  const details = await results.json()
  return details.items.slice(0, 10)
}

//Github search the user Repos and return  - - ALL REPOS[] - -
//EXAMPLE: https://api.github.com/users/Jewlsza/repos
getGithubUserRepos = async (username) => {
  const results = await fetch(`https://api.github.com/users/${username}/repos`)
  const details = await results.json()
  return details.slice(0, 3)
}

//Github return - - REPO COMMITS - -
//EXAMPLE: https://api.github.com/repos/JewlsZA/Java-OOP-Food-Delivery-Project/commits
getGithubUserRepoCommits = async (username, repoName) => {
  const results = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/commits`
  )
  const details = await results.json()
  return details.slice(0, 5)
}

//Gitlab search by login/username and return a  - - SINGLE USER - -
//EXAMPLE: https://gitlab.com/api/v4/users?username=alvinpenner
getGitlabUser = async (username) => {
  const results = await fetch(
    `https://gitlab.com/api/v4/users?username=${username}`
  )
  const details = await results.json()
  return details.items
}

//Gitlab search by username and return - - ALL USER REPOS - -
//EXAMPLE: https://gitlab.com/api/v4/users/alvinpenner/projects
getGitlabRepos = async (username) => {
  const results = await fetch(
    `https://gitlab.com/api/v4/users/${username}/projects`
  )
  const details = await results.json()
  return details.items.slice(0, 3)
}

//Gitlab search by repo/projectID and return - - ALL COMMITS - -
//EXAMPLE: https://gitlab.com/api/v4/projects/13473073/repository/commits
getGitlabProjectCommits = async (projectID) => {
  const results = await fetch(
    `https://gitlab.com/api/v4/projects/${projectID}/repository/commits`
  )
  const details = await results.json()
  return details.items.slice(0, 5)
}

// returns GithubUsers info array to frontend
app.post("/users", async (req, res) => {
  const devUsername = req.body.devUsername
  const usersData = await getGithubUsers(devUsername)
  res.send(usersData)
})

// returns Single GithubUser info to frontend
app.post("/user", async (req, res) => {
  const devUsername = req.body.devUsername
  const usersData = await getGithubUser(devUsername)
  res.send(usersData)
})

// for testing backend testing
app.get("/usertest", async (req, res) => {
  const devUsername = "jewlsza"
  const usersData = await getGithubUser(devUsername)
  res.send(usersData)
})

// for testing frontend testing
app.get("/usertesting/:devUsername", async (req, res) => {
  console.log(req.params.devUsername)
  const usersData = await getGithubUser(req.params.devUsername)
  res.send(usersData)
})

// returns GithubUserRepos info array to frontend
app.post("/GithubUserRepos", async (req, res) => {
  const devUsername = req.body.devUsername
  const usersData = await getGithubUserRepos(devUsername)
  res.send(usersData)
})

// returns GithubUserReposCommits info array to frontend
app.post("/GithubUserRepoCommits", async (req, res) => {
  const devUsername = req.body.devUsername
  const repoName = req.body.repoName
  const usersData = await getGithubUserRepoCommits(devUsername, repoName)
  res.send(usersData)
})

// returns GitlabUser info array to frontend
app.get("/GitlabUser", async (req, res) => {
  const GitlabUserData = getGitlabUser(devUsername)
  res.send(GitlabUserData)
})

// returns user GitlabRepos info array to frontend
app.get("/GitlabUserRepos", async (req, res) => {
  const GitlabReposData = getGitlabRepos(devUsername)
  res.send(GitlabReposData)
})

// returns user GitlabProjectCommits info array to frontend
app.get("/GitlabProjectCommits", async (req, res) => {
  const GitlabCommitsData = getGitlabProjectCommits(devUsername)
  res.send(GitlabCommitsData)
})

//The ​listen() method specifies what port the app object (application server) will listen to HTTP requests on.
app.listen(port, () => console.log(`Listening on port ${port}`))
