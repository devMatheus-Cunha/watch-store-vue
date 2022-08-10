// Packages
import {
    mount
} from '@vue/test-utils'
import {
    CartManager
} from '@/managers/CartManager'

// Components
import ProductCart from '.'

// Services
import {
    makeServer
} from '@/miragejs/server'

const mountProductCart = () => {
    const product = server.create('product', {
        title: 'Relógio bonito',
        price: '25,90',
        image: 'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    })

    const cartManager = new CartManager()

    const wrapper = mount(ProductCart, {
        propsData: {
            product,
        },
        mocks: {
            $cart: cartManager,
        },
    })

    return {
        wrapper,
        product,
        cartManager,
    }
}

describe('ProductCart - Unit', () => {
    let server

    beforeEach(() => {
        server = makeServer({
            environment: 'test'
        })
    })

    afterEach(() => {
        server.shutdown()
    })

    it('should match snapshot', () => {
        const {
            wrapper
        } = mountProductCart()

        expect(wrapper.element).toMatchSnapshot()
    })

    it('should mount the component', () => {
        const {
            wrapper
        } = mountProductCart()

        expect(wrapper.vm).toBeDefined()
        expect(wrapper.text()).toContain('Relógio bonito')
        expect(wrapper.text()).toContain('$25,90')
    })

    it('should add item to cartState on button click', async () => {
        const {
            wrapper,
            cartManager
        } = mountProductCart()

        const openSpy = jest.spyOn(cartManager, 'open')
        const addProductSpy = jest.spyOn(cartManager, 'addProduct')

        await wrapper.find('button').trigger('click')

        expect(openSpy).toHaveBeenCalledTimes(1)
        expect(addProductSpy).toHaveBeenCalledTimes(1)
    })

    it('addProduct should been called with correctly product', async () => {
        const {
            wrapper,
            cartManager,
            product
        } = mountProductCart()

        const addProductSpy = jest.spyOn(cartManager, 'addProduct')

        await wrapper.find('button').trigger('click')

        expect(addProductSpy).toHaveBeenCalledWith(product)
    })
})