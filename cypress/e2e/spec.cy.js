describe('Users', () => {

    it('should display users with network synchronization', () => {
      // given
      cy.intercept({
          method: 'GET',
          path: '/api/users*'
        }).as('getUsers')
      // when
      cy.visit('http://localhost:3000')
      cy.wait('@getUsers')
      // then
      cy.findAllByTestId(locators.users.email)
        .first().should('have.text', 'george.bluth@reqres.in')
    })
  }