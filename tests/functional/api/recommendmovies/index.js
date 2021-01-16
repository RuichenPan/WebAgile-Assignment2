import chai from "chai";
import request from "supertest";
const expect = chai.expect;
let api;
const id = 602211

describe("Recommend Movies endpoint", () => {

  beforeEach( function(done){
    this.timeout(8000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      done()
      },4000)
    
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /Recommend Movies ", () => {
    it("should return 20 movies and a status 200", (done) => {
        request(api)
        .get(`/api/recommend/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            console.log(res.body);
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(20);
        done();
        });
      });
    });
});

