/// <reference types="cypress"/>

it('Sign out of account', () => {
  cy.fixture('user').then((userData) => {
    cy.login(userData.email, userData.password);
  });

  cy.visit('/profile');

  cy.get('header').find('a').contains('Settings').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/settings');

  cy.get('ul').find('button').contains('Sign out').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/');

  cy.get('nav').should('not.contain.text', 'Your profile');
});
