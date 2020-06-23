/// <reference types="cypress"/>

it('Log in with email', () => {
  cy.fixture('user').then((userData) => {
    cy.login(userData.email, userData.password);

    cy.location('pathname', { timeout: 1500 }).should('eq', '/');

    cy.authCheck(userData.name);
  });
});
