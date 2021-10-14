let expect = require("chai").expect
let request = require("request")
// moca chai testing backend external API fetching module
describe("Github User Fetch ", function () {
  it("testing endpoint, Returns 200 response", function (done) {
    request(
      "http://localhost:8080/usertest",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200)
        done()
      })
  })
})
