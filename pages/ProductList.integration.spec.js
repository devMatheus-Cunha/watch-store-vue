import {
    mount
} from "@vue/test-utils"

// Components
import {
    ProductCard,
    Search
} from '../components'
import ProductList from '.'

describe('ProductList - integration', () => {
    it('should mount the component', () => {
        const wrapper = mount(ProductList)
        expect(wrapper.vm).toBeDefined()
    });

    it('should mount the Search as a child', () => {
        const wrapper = mount(Search)
        expect(wrapper.findComponent(Search)).toBeDefined()
    });

})