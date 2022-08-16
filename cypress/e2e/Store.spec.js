context('Store', () => {
    it('should display the store', () => {
        cy.visit("http://localhost:3000")

        cy.get('body').contains('Brand')
    });

    it('should display the store', () => {
        cy.visit("http://localhost:3000")

        cy.get('body').contains('Wrist Watch')
    });
})