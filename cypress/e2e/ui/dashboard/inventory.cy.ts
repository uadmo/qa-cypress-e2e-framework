describe('Inventory page', () => {

    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('[smoke] display products', () => {
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
})