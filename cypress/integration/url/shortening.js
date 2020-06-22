/// <reference types="cypress"/>

context('URL Shortening', () => {
  describe('Correct URL to shorten', () => {
    let url = 'https://twitter.com';

    it('Shorten URL', () => {
      cy.shortenUrl(url);
    });

    it('Search for a shortened URL', () => {
      cy.get('div[role="feed"]').find('button').as('buttonWithShortUrl');

      cy.get('@buttonWithShortUrl').find('h3');
      cy.get('@buttonWithShortUrl').contains(url);
    });
  });

  describe('Incorrect URL to shorten', () => {
    it('Try to shorten the URL', () => {
      let wrongURL = 'mnvdmitry';
      let errorText = 'example.com, https://example.com';

      cy.get('form')
        .find('input')
        .type(wrongURL)
        .should('have.value', wrongURL);

      cy.get('form')
        .find('button:first')
        .should('contain', 'Create')
        .should('be.disabled');

      cy.get('form').contains(errorText);
      cy.get('form').find('input').clear().should('have.value', '');
      cy.get('form').should('not.contain.text', errorText);
    });
  });
});
