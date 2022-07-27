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
});