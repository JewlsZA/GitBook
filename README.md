
# Getting Started with GitBook
## Description 
The program user can search for Github users and select from the top 10 search results.  You will be able to view user profile information along with latest repositories information.

To run the program on your system you would need to install React and Node.js
Here is a quick guide to get you started: https://www.freecodecamp.org/news/install-react-with-create-react-app/

Open the project files in your favourite IDE and Change Directory to the project in your terminal of choice.

To install dependancies run the following in the terminal.
```
npm install
```
To start your local react and express servers, navigate to the backend and frontend file directory and run the following command in the terminal.
```
npm start 
```
a Browser windows should open where you can play the game !
If the browser does not open type http://localhost:3000/ in your browser


# How GitBook works

The frontend is written in React and backend in Express. When using the frontend search component, the queried username is send to the backend API where a request is made to the GitHub API. Results are processed and send back to the frontend where it is displayed accordingly. External API request retrieve data in bulk to improve frontend performance.

# Project limitations

Program does not validate user text inputs and results retrieved from GitHub API is not screened for profanity.
