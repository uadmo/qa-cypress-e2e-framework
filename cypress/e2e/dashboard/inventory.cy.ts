describe('Inventory page', () => {
   
    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
        cy.visit('/inventory.html')
    })

    it('display products', () => {
        cy.visit('/inventory.html')
        cy.url().should('contain', 'inventory')
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
})