/// <reference types="cypress"/>

context('URL management', () => {
  let url = 'https://twitter.com/mnvdmitry';
  let shortUrl = undefined;

  before(() => {
    cy.fixture('user').then((userData) =>
      cy.login(userData.email, userData.password)
    );

    cy.shortenUrl(url);

    cy.visit('/profile');

    cy.get('section')
      .should('contain.text', 'Created URLs')
      .find('a:first')
      .should('contain.text', url)
      .as('shortenedUrl');

    cy.get('@shortenedUrl')
      .find('h3')
      .then((h3) => {
        let url = new URL(h3.text());

        shortUrl = url.pathname.slice(1);
      });

    cy.get('@shortenedUrl')
      .click()
      .then(() => {
        cy.location('pathname', { timeout: 1500 }).should(
          'eq',
          `/url/${shortUrl}`
        );
      });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('Change the tracking of the number of clicks on a URL', () => {
    cy.get('section')
      .should('contain.text', 'Management')
      .find('label')
      .should('have.text', 'Tracking the number of transitions on URL')
      .find('input[type="checkbox"]')
      .as('trackingCheckbox');

    cy.get('@trackingCheckbox').should('be.checked');
    cy.get('@trackingCheckbox').click();
    cy.get('@trackingCheckbox').should('not.be.checked');
  });

  it('Remove URL', () => {
    cy.on('window:confirm', (str) => {
      return expect(str).to.contain(shortUrl) ? true : false;
    });

    cy.get('section')
      .should('contain.text', 'Management')
      .find('button')
      .contains('Remove URL')
      .click();

    cy.location('pathname', { timeout: 1500 }).should('eq', '/profile');
  });
});
