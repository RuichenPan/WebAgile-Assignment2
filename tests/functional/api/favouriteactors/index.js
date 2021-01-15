import chai from "chai";
import request from "supertest";
const expect = chai.expect;
let token;
let api;

const id = 1245


describe("Favourite Actors endpoint", () => {

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
  describe("GET /favourite actors ", () => {
    it("should return 0 actors and a status 200", (done) => {
        request(api)
        .get("/api/favouriteactors")
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
  describe("Post /favourite actors ", () => {
    it("should return 1 actor and a status 200", (done) => {
        request(api)
        .post(`/api/actors/${id}?action=addtofavouriteactor`)
        .end((err, res) => {
            request(api)
                .get("/api/favouriteactors")
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
    it("should return 0 actor and a status 200", (done) => {
        request(api)
        .delete(`/api/favouriteactors/${id}?action=deletefromfavouriteactor`)
        .end((err, res) => {
            request(api)
                .get("/api/favouriteactors")
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
});
