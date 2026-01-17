import { ReqresUser } from "cypress/types/reqresuser";

describe('Users API', () => {
    it('fetches user by id', () => {
        cy.request('https://reqres.in/api/users/2').then((response) => {
            expect(response.status).to.eq(200)

            const user: ReqresUser = response.body.data
            expect(user.email).to.include('@')
            expect(user.id).to.eq(2)   
        })
    })
})