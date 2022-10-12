import {
    makeServer
} from '../../miragejs/server'

context('Store', () => {
    let server
    const get = cy.get
    const getId = cy.getByTestId

    beforeEach(() => {
        server = makeServer({
            environment: 'test'
        })
    })

    afterEach(() => {
        server.shutdown()
    })


    it('should display the store', () => {
        cy.visit('/')

        get('body').contains('Brand')
        get('body').contains('Wrist Watch')
    });

    context('Store > Shopping Cart', () => {
        const quantity = 10
        beforeEach(() => {
            server.createList('product', quantity)
            cy.visit('/')
        })

        it('should not display shopping car when page first loads', () => {
            getId("shopping-cart").should('have.class', 'hidden')
        });

        it('should toggle shopping cart visibility when button is clicked', () => {
            getId("toggle-button").as('toggleButton')

            get('@toggleButton').click()
            getId("shopping-cart").should('not.have.class', 'hidden')

            get('@toggleButton').click({
                force: true
            })
            getId("shopping-cart").should('have.class', 'hidden')
        });

        it('should open shopping cart when a product is added', () => {
            getId("product-card").first().find('button').click()

            getId('shopping-cart').should('not.have.class', 'hidden')
        });

        it('should add first product to the cart', () => {
            getId("product-card").first().find('button').click()

            getId('cart-item').should('have.length', 1)
        });

        it('should add 3 products to the cart', () => {
            cy.addToCart({
                indexes: [1, 4, 6]
            })
            getId('cart-item').should('have.length', 3)
        });

        it('should add 1 product to the cart', () => {
            cy.addToCart({
                index: 6
            })
            getId('cart-item').should('have.length', 1)
        });

        it('should add all products to the cart', () => {
            cy.addToCart({
                indexes: 'all'
            })
            getId('cart-item').should('have.length', quantity)
        });

        it('should remove a product from cart', () => {
            cy.addToCart({
                index: 2
            })

            getId('cart-item').as('cartItems')

            get('@cartItems').should('have.length', 1)

            get('@cartItems')
                .first()
                .find('[data-testid="remove-button"]')
                .click()

            get('@cartItems').should('have.length', 0)
        })

    })

    context('Store > Product List', () => {
        it('should display "0 Products" when no product is returned ', () => {
            cy.visit('/')

            getId("product-card").should('have.length', 0)
            get('body').contains('0 Products')
        });

        it('should display "1 Products" when 1 product is returned ', () => {
            server.createList('product', 1)

            cy.visit('/')

            getId("product-card").should('have.length', 1)
            get('body').contains('1 Product')
        });

        it('should display "10 Products" when 10 product are returned ', () => {
            server.createList('product', 10)

            cy.visit('/')

            getId("product-card").should('have.length', 10)
            get('body').contains('10 Products')
        });
    })

    context('Store > Search for Products', () => {
        it('should type in the search field', () => {
            cy.visit('/')

            get('input[type="search"]')
                .type('Some text here')
                .should('have.value', 'Some text here')
        });

        it('should return 1 product ehrn "Relógio bonito" is used as search term', () => {
            server.create('product', {
                title: 'Relógio bonito'
            })
            server.createList('product', 10)

            cy.visit('/')
            get('input[type="search"]').type('Relógio bonito')
            getId("search-form").submit()
            getId("product-card").should('have.length', 1)
        });

        it('should not return any product', () => {
            server.createList('product', 10)

            cy.visit('/')
            get('input[type="search"]').type('Relógio bonito')
            getId("search-form").submit()
            getId("product-card").should('have.length', 0)
            get('body').contains('0 Products')

        });
    })
})