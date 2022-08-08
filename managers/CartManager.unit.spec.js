// CartManager
import {
    CartManager
} from '@/managers/CartManager'

// Services
import {
    makeServer
} from '@/miragejs/server'

describe('CartManager', () => {
    let server
    let manager

    beforeEach(() => {
        manager = new CartManager()
        server = makeServer({
            environment: 'test'
        })
    })

    afterEach(() => {
        server.shutdown()
    })

    it('should return the state', () => {
        const product = server.create('product')

        manager.open()
        manager.addProduct(product)
        const state = manager.getState()

        expect(state).toEqual({
            items: [product],
            open: true,
        })
    })

    it('should set cart to open', () => {
        const state = manager.open()

        expect(state.open).toBe(true)
    })

    it('should set cart to closed', () => {
        const state = manager.close()

        expect(state.open).toBe(false)
    })

    it('should add product to the cart only once', () => {
        const product = server.create('product')
        manager.addProduct(product)
        const state = manager.addProduct(product)

        expect(state.items).toHaveLength(1)
    })

    it('should remove product from the cart', () => {
        const product = server.create('product')
        const state = manager.removeProduct(product.id)

        expect(state.items).toHaveLength(0)
    })

    it('should clear products', () => {
        const productOne = server.create('product')
        const productTwo = server.create('product')

        manager.addProduct(productOne)
        manager.addProduct(productTwo)
        const state = manager.clearProducts()

        expect(state.items).toHaveLength(0)

    })



    it('should return true if product is already in the cart', () => {
        const product = server.create('product')
        manager.addProduct(product)

        expect(manager.productIsInTheCart(product)).toBe(true)
    })
})