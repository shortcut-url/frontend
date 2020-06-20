/// <reference types="cypress"/>

it('Log in with email', () => {
  cy.fixture('user').then((userData) => {
    cy.login(userData.email, userData.password);

    cy.location('pathname', { timeout: 3000 }).should('eq', '/');

    cy.get('nav').contains(userData.name);
  });
});
