import {
    mount
} from "@vue/test-utils"
import ProductCard from "@/components/ProductCard"

describe('ProductCard', () => {
    it('should mount the component', () => {
        const wrapper = mount(ProductCard, {
            propsData: {
                product: {}
            }
        })
        expect(wrapper.vm).toBeDefined()
    });
});