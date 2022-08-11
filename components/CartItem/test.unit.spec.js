import {
    mount
} from '@vue/test-utils';
import CartItem from '@/components/CartItem'

// Services
import {
    makeServer
} from '@/miragejs/server'

import {
    CartManager
} from '@/managers/CartManager'

const mountCartItem = () => {
    const cartManager = new CartManager()

    const product = server.create('product', {
        title: 'Lindo relogío',
        price: '22.33'
    })
    const wrapper = mount(CartItem, {
        propsData: {
            product
        },
        mocks: {
            $cart: cartManager,
        },
    })

    return {
        product,
        wrapper,
        cartManager
    }
}

describe('CartItem', () => {

    let server

    beforeEach(() => {
        server = makeServer({
            environment: 'test'
        })
    })

    afterEach(() => {
        server.shutdown()
    })

    it('should mount the component', async () => {
        const {
            wrapper
        } = mountCartItem()

        expect(wrapper.vm).toBeDefined()
    });

    it('should display product info', () => {
        const {
            wrapper,
            product: {
                title,
                price,
            },
        } = mountCartItem()

        const content = wrapper.text()

        expect(content).toContain(title)
        expect(content).toContain(price)
    });

    it('should display quantity 1 when product is first displayed', () => {
        const {
            wrapper
        } = mountCartItem()
        const quantity = wrapper.find('[data-testid="quantity"]')

        expect(quantity.text()).toContain('1')
    });

    it('should  increase quantity when + button gets clicked', async () => {
        const {
            wrapper
        } = mountCartItem()
        const quantity = wrapper.find('[data-testid="quantity"]')
        const button = wrapper.find('[data-testid="+"]')

        await button.trigger('click')
        expect(quantity.text()).toContain('2')
        await button.trigger('click')
        expect(quantity.text()).toContain('3')
        await button.trigger('click')
        expect(quantity.text()).toContain('4')
    });

    it('should decrease quantity when - button gets clicked', async () => {
        const {
            wrapper
        } = mountCartItem()
        const quantity = wrapper.find('[data-testid="quantity"]')
        const button = wrapper.find('[data-testid="-"]')

        await button.trigger('click')
        expect(quantity.text()).toContain('0')
    });

    it('should not go below zero when button - is repeatdly clicked', async () => {
        const {
            wrapper
        } = mountCartItem()
        const quantity = wrapper.find('[data-testid="quantity"]')
        const button = wrapper.find('[data-testid="-"]')

        await button.trigger('click')
        await button.trigger('click')
        expect(quantity.text()).toContain('0')
    });

    it('should display a button ot remove item from cart', async () => {
        const {
            wrapper,
            cartManager
        } = mountCartItem()
        const button = wrapper.find('[data-testid="remove-button"]')

        expect(button.exists()).toBe(true)
    });

    it('should call cart manager removeProduct() when ugets clicked', async () => {
        const {
            wrapper,
            cartManager,
            product
        } = mountCartItem()

        const spy = jest.spyOn(cartManager, "removeProduct")
        await wrapper.find('[data-testid="remove-button"]').trigger('click')


        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(product.id)
    });
});