describe("Robotic hoover starts in a clean room", () => {
    it("Test case 1", () => {
      cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [],
        instructions: "NNEESW",
        curl: "-H",
      }).then((response) => {
        expect(response.body).to.have.property("patches", 0);
      });
    });
  }); // False positive because it finds patches when it should give 0
  
  describe("Hoover moves through a room with patches of dirt and returns to the cleaned area", () => {
    it("Test case 2", () => {
      cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [
          [1, 2],
          [1, 3],
          [1, 4],
        ],
        instructions: "NNNNSSSS",
        curl: "-H",
      }).then((response) => {
        expect(response.body).to.have.property("patches", 3);
      });
    });
  }); // False positive returns more patches than existing
  
  describe("Room has 2 patches and instructions makes hoover hit the wall", () => {
    it("Test case 6", () => {
      cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
        roomSize: [5, 5],
        coords: [0, 0],
        patches: [
          [4, 4],
          [4, 2],
        ],
        instructions: "SSSWWWNE",
        curl: "-H",
      }).then((response) => {
        expect(response.body).to.have.property("patches", 0);
      });
    });
  }); //False: Hoover finds a patch or dirt when the instructions don’t let it pass over the patch
  
  describe("Patch of dirt is outside the room", () => {
    it("Test case 8", () => {
      cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
        roomSize: [5, 5],
        coords: [0, 0],
        patches: [[6, 9]],
        instructions: "NNNNNNNNNEEEEEE",
        curl: "-H",
      }).then((response) => {
        expect(response.body).to.have.property("patches", 0);
      });
    });
  }); //False: Hoover finds patches when the only patch is outside of the room and hoover doesn't pass over it
  
  describe(" Hoover encounters multiple patches of dirt at the same location", () => {
    it("Test case 9", () => {
      cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
        roomSize: [5, 5],
        coords: [0, 0],
        patches: [
          [0, 2],
          [0, 2],
          [0, 2],
        ],
        instructions: "NNNN",
        curl: "-H",
      }).then((response) => {
        expect(response.body).to.have.property("patches", 1);
      });
    });
  }); //False: Hoover should have found only one patch