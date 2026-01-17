describe('Inventory page', () => {

    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
    })

    it('display products', () => {
        cy.get('.inventory_item').should('have.length.greaterThan', 0)
    })
})