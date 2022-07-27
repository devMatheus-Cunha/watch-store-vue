import {
    mount
} from '@vue/test-utils';
import CartItem from '@/components/CartItem'

// Services
import {
    makeServer
} from '@/miragejs/server'

const mountCartItem = () => {
    const product = server.create('product', {
        title: 'Lindo relogío',
        price: '22.33'
    })
    const wrapper = mount(CartItem, {
        propsData: {
            product
        }
    })

    return {
        product,
        wrapper
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
});