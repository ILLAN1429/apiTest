describe("template spec", () => {
  it("Post call", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 2],
        patches: [
          [1, 0],
          [2, 2],
          [2, 3],
        ],
        instructions: "NNESEESWNWW",
        curl: "-H",
      },
    }).its("status");
  });
}); // example test

describe("Find wall", () => {
  it("Test case 3", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [[3,3]],
        instructions: "SSWW",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body.coords).to.be.a("array");
    });
  });
}); //Correct: Hoover stops before hitting the wall

describe("Find two patches in straight line", () => {
  it("Test case 4", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [
          [1, 2],
          [1, 3],
        ],
        instructions: "NN",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body).to.have.property("patches", 2);
    });
  });
}); //Correct: Hoover finds two patches of dirt

describe("Find two patches and hits a wall", () => {
  it("Test case 5", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [
          [1, 2],
          [1, 3],
        ],
        instructions: "NNWW",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body).to.have.property("patches", 2);
    });
  });
}); //Correct: Hoover finds two patches of dirt and stops before hitting the wall

describe("Hoover starts on a patch of dirt ", () => {
  it("Test case 7", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [[1, 1]],
        instructions: "N",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body).to.have.property("patches", 1);
    });
  });
}); //Correct: Hoover identifies the only patch

describe("Hover moves North and South then ends up in the same spot and driving instructions doesn’t let hoover find the patch", () => {
  it("Test case 11", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [1, 1],
        patches: [[4, 4], [4, 2]],
        instructions: "NS",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body).to.have.property("patches", 2);
    });
  });
}); //Correct: Hoover stopped in the correct spot and didn't find the patch

describe("Hover moves East and West then ends up in the same spot", () => {
  it("Test case 12", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/v1/cleaning-sessions",
      body: {
        roomSize: [5, 5],
        coords: [3, 3],
        patches: [[3, 2], [2, 2]],
        instructions: "SW",
        curl: "-H",
      },
    }).then((response) => {
      expect(response.body).to.have.property("patches", 2);
    });
  });
}); // Correct: Hoover stopped in the correct spot and didn't find the patch
