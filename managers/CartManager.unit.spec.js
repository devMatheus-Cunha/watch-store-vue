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

    it.todo('should remove product from the cart')

    it.todo('should clear products')

    it.todo('should clear cart')

    it.todo('should return true if cart is not empty')

    it('should return true if product is already in the cart', () => {
        const product = server.create('product')
        manager.addProduct(product)

        expect(manager.productIsInTheCart(product)).toBe(true)
    })
})