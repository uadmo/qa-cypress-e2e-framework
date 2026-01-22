describe('Article feed - Mocked', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/api/articles**', { fixture: 'articles.json' }).as('getArticles')
        cy.visit(Cypress.env('realworldUrl'))
    })

    it('display articles from mocked response', () => {
        cy.wait('@getArticles')

        cy.contains('Stubbed Article Title').should('be.visible')
        cy.contains('This article comes from a mocked response').should('be.visible')
    })

})