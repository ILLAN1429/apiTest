describe("Hoover starts outside of the room", () => {
  it("Test case 10", () => {
    cy.request("POST", "http://localhost:8080/v1/cleaning-sessions", {
      roomSize: [5, 5],
      coords: [15, 15],
      patches: [[0, 1]],
      instructions: "NNNEEESSSWWW",
      curl: "-H",
    }).then((response) => {
      expect(response.body).to.have.property("patches", 0);
    });
  });
}); //Hoover shouldn’t be able to run outside of the limits of the room
