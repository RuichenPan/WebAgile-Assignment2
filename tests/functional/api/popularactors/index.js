import chai from "chai";
import request from "supertest";
const expect = chai.expect;
let token;
let api;


describe("Popular Actors endpoint", () => {

  beforeEach( function(done){
    this.timeout(6000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res)=>{
        console.log(res.body);
        token = res.body.token;
        console.log(token);
        done();
    });
      },4000)
    
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /actors ", () => {
    it("should return 20 actors and a status 200", (done) => {
        request(api)
        .get("/api/actors")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(20);
        done();
        });
      });
    });
  describe("when the id is invalid", () => {
    it("should return the NOT found message", () => {
      return request(api)
        .get("/api/actors/999999")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(401)
        .expect("Sorry, this movie id is not exist."
        );
    });
  });
});

