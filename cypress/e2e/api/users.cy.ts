import { TypiResponse } from "cypress/types/typiresponse";

describe('Users API', () => {
    it('fetches user by id', () => {
        cy.request('https://jsonplaceholder.typicode.com/users/1').then((response) => {
            expect(response.status).to.eq(200)

            const user: TypiResponse = response.body
            expect(user.id).to.eq(1)
            expect(user.email).to.include('@')
            expect(user.address.city).to.be.a('String')
            expect(user.company.name).to.be.a('String')
        })
    })
})

describe('Users API - Mocked', () => {
    it('handles empty user response', () => {
        cy.intercept('GET', '**/users', { statusCode: 200, body: { users: [] } }).as('getUser')

        cy.visit('https://dummyjson.com/user')
        cy.wait('@getUser')
        cy.contains('No users').should('exist')
    })
})