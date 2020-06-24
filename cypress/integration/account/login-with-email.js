/// <reference types="cypress"/>

it('Log in with email', () => {
  cy.fixture('user').then((userData) => {
    cy.login(userData.email, userData.password);

    cy.authCheck(userData.name);
  });
});
