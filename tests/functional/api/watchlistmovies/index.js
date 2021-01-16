import chai from "chai";
import request from "supertest";
const expect = chai.expect;
let token;
let api;

const id = 464052


describe("Watchlist Movies endpoint", () => {

  beforeEach( function(done){
    this.timeout(8000)
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
  describe("GET /watchlist movies ", () => {
    it("should return 0 movies and a status 200", (done) => {
        request(api)
        .get("/api/watchlist")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(0);
        done();
        });
      });
    });
  describe("Post /watchlist movies ", () => {
    it("should return 1 movies and a status 200", (done) => {
        request(api)
        .post(`/api/upcoming/${id}?action=addtowatchlist`)
        .end((err, res) => {
            request(api)
                .get("/api/watchlist")
                .set("Accept", "application/json")
                .set("Authorization", token)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
      });
    it("should return 0 movies and a status 200", (done) => {
        request(api)
        .delete(`/api/watchlist/${id}?action=deletefromwatchlist`)        
        .set("Accept", "application/json")
        .set("Authorization", token)
        .end((err, res) => {
            request(api)
                .get("/api/watchlist")
                .set("Accept", "application/json")
                .set("Authorization", token)
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(0);
                    done();
                });
        });
        });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/watchlist/999999")
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect(401)
          .expect("Sorry, this movie id is not exist."
          );
      });
    });
});

