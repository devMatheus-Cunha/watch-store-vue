// CartManager
import {
    CartManager
} from '@/managers/CartManager'


describe('CartManager', () => {
    it('should return the state', () => {
        const manager = new CartManager()
        const state = manager.open()

        expect(state.open).toBe(true)
    })

    it.todo('should set cart to open')

    it.todo('should set cart to closed')

    it.todo('should add product to the cart only once')

    it.todo('should remove product from the cart')

    it.todo('should clear products')

    it.todo('should clear cart')

    it.todo('should return true if cart is not empty')

    it.todo('should return true if product is already in the cart')
})