import { TypiResponse } from "cypress/types/typiresponse";

describe('Users API', () => {
    it('fetches user by id', () => {
        cy.request('https://jsonplaceholder.typicode.com/users/1').then((response) => {
            expect(response.status).to.eq(200)

            const user: TypiResponse = response.body
            expect(user.email).to.include('@')
            expect(user.id).to.eq(1)
        })
    })
})