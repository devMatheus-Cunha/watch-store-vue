import {
    mount
} from "@vue/test-utils"

// Utils
import axios from 'axios'

// Components
import {
    ProductCard,
    Search
} from '../components'
import ProductList from '.'

jest.mock('axios', () => ({
    get: jest.fn(),
}))

describe('ProductList - integration', () => {
    it('should mount the component', () => {
        const wrapper = mount(ProductList)
        expect(wrapper.vm).toBeDefined()
    });

    it('should mount the Search component', () => {
        const wrapper = mount(ProductList)
        expect(wrapper.findComponent(Search)).toBeDefined()
    });

    it('should call axios.get on component mount', () => {
        mount(ProductList, {
            mocks: {
                $axios: axios
            }
        })

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith("/api/products")
    });

    // it('should mount the ProductCard component 10 times', () => {
    //     const wrapper = mount(ProductList)
    //     const cards = wrapper.findAllComponents(ProductCard)


    //     expect(cards).toHaveLength(10)
    // });

})