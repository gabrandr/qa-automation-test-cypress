function buildUserData() {
  const uniqueId = Date.now() + Cypress._.random(1000, 9999);
  const originalUsername = `qa_user_${uniqueId}`;
  const updatedUsername = `qa_user_updated_${uniqueId}`;

  const originalUser = {
    id: uniqueId,
    username: originalUsername,
    firstName: "John",
    lastName: "Tester",
    email: `${originalUsername}@example.com`,
    password: "password123",
    phone: "0999999999",
    userStatus: 1,
  };
  const updatedUser = {
    ...originalUser,
    username: updatedUsername,
    firstName: "JohnUpdated",
    email: `${updatedUsername}@example.com`,
  };
  return { originalUser, updatedUser };
}
function createUser(user) {
  return cy.request("POST", "/user", user);
}
function getUser(username, failOnStatusCode = true) {
  return cy.request({
    method: "GET",
    url: `/user/${username}`,
    failOnStatusCode,
  });
}
function updateUser(username, user) {
  return cy.request("PUT", `/user/${username}`, user);
}
function deleteUser(username) {
  return cy.request("DELETE", `/user/${username}`);
}

describe("Petstore user CRUD", () => {
  it("creates a new user", () => {
    const { originalUser } = buildUserData();
    createUser(originalUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.type).to.eq("unknown");
      expect(response.body.message).to.eq(String(originalUser.id));
    });
  });
  it("retrieves a previously created user", () => {
    const { originalUser } = buildUserData();
    createUser(originalUser).then(() => {
      getUser(originalUser.username).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(originalUser.username);
        expect(response.body.email).to.eq(originalUser.email);
      });
    });
  });
  it("updates the user's name and email", () => {
    const { originalUser, updatedUser } = buildUserData();
    createUser(originalUser).then(() => {
      updateUser(originalUser.username, updatedUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.type).to.eq("unknown");
        expect(response.body.message).to.eq(String(updatedUser.id));
      });
    });
  });
  it("retrieves the updated user", () => {
    const { originalUser, updatedUser } = buildUserData();
    createUser(originalUser).then(() => {
      updateUser(originalUser.username, updatedUser).then(() => {
        getUser(updatedUser.username).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.username).to.eq(updatedUser.username);
          expect(response.body.email).to.eq(updatedUser.email);
        });
      });
    });
  });
  it("deletes the user", () => {
    const { originalUser, updatedUser } = buildUserData();
    createUser(originalUser).then(() => {
      updateUser(originalUser.username, updatedUser).then(() => {
        deleteUser(updatedUser.username).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.type).to.eq("unknown");
          expect(response.body.message).to.eq(String(updatedUser.username));
        });
      });
    });
  });
  it("verifies the user has been deleted", () => {
    const { originalUser, updatedUser } = buildUserData();
    createUser(originalUser).then(() => {
      updateUser(originalUser.username, updatedUser).then(() => {
        deleteUser(updatedUser.username).then(() => {
          getUser(updatedUser.username, false).then((response) => {
            expect(response.status).to.eq(404);
          });
        });
      });
    });
  });
});
