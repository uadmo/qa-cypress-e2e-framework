import { TypiResponse } from "cypress/types/typiresponse";

describe('Users API', () => {
    it('fetches user by id', () => {
        cy.request(`${Cypress.env('jsonplaceholderUrl')}/users/1`).then((response) => {
            expect(response.status).to.eq(200)

            const user: TypiResponse = response.body
            expect(user.id).to.eq(1)
            expect(user.email).to.include('@')
            expect(user.address.city).to.be.a('String')
            expect(user.company.name).to.be.a('String')
        })
    })
})