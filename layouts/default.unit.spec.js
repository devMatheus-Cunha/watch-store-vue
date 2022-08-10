// Packages
import {
    mount
} from '@vue/test-utils'

// Components
import DefaultLayout from '@/layouts/default'
import Cart from '@/components/Cart'

// Mocks
import {
    CartManager
} from '@/managers/CartManager'

describe('Default Layout', () => {
    const mountLayout = () => {
        const wrapper = mount(DefaultLayout, {
            mocks: {
                $cart: new CartManager(),
            },
            stubs: {
                Nuxt: true,
            },
        })

        return {
            wrapper
        }
    }

    it('should mount Cart', () => {
        const {
            wrapper
        } = mountLayout()

        expect(wrapper.findComponent(Cart).exists()).toBe(true)
    })

    it.todo('should toggle Cart visibility')
})