// Packages
import Vue from 'vue'
import {
    mount
} from '@vue/test-utils'


// Utils
import axios from 'axios'
import {
    makeServer
} from '@/miragejs/server'

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
    let server

    beforeEach(() => {
        server = makeServer({
            environment: 'test'
        })
    })

    afterEach(() => {
        server.shutdown()
        jest.clearAllMocks()
    })

    const getProducts = async (quantity = 10, overrides = []) => {
        let overrideList = []

        if (overrides.length > 0) {
            overrideList = overrides.map(override => server.create('product', override))
        }
        const products = [
            ...server.createList('product', quantity),
            ...overrideList,
        ]
        return {
            products
        }
    }

    const mountProductList = async (quantity = 10,
        overrides = [],
        shouldReject = false) => {
        const {
            products
        } = await getProducts(quantity, overrides)

        if (shouldReject) {
            axios.get.mockReturnValue(Promise.reject(new Error(' ')))
        } else {
            axios.get.mockReturnValue(Promise.resolve({
                data: {
                    products
                }
            }))
        }

        const wrapper = mount(ProductList, {
            mocks: {
                $axios: axios,
            },
        })

        await Vue.nextTick()

        return {
            wrapper,
            products
        }
    }

    it('should mount the component', async () => {
        const {
            wrapper
        } = await mountProductList()
        expect(wrapper.vm).toBeDefined()
    });

    it('should mount the Search component', async () => {
        const {
            wrapper
        } = await mountProductList()
        expect(wrapper.findComponent(Search)).toBeDefined()
    });

    it('should call axios.get on component mount', async () => {
        await mountProductList()

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith("/api/products")
    });

    it('should mount the ProductCard component 10 times', async () => {
        const {
            wrapper
        } = await mountProductList()


        const cards = wrapper.findAllComponents(ProductCard)

        expect(cards).toHaveLength(10)
    });

    it('should  display the error message when Promise rejects', async () => {
        axios.get.mockReturnValue(Promise.reject(new Error("Problemas ao carregar a lista!")))

        const wrapper = mount(ProductList, {
            mocks: {
                $axios: axios
            }
        })

        await Vue.nextTick()
        expect(wrapper.text()).toContain("Problemas ao carregar a lista!")
    });

    it('should filter the product list when a search is perfomed', async () => {
        // Arrange
        const {
            wrapper,
        } = await mountProductList(10, [{
                title: "Meu outro relógio amado",
            },
            {
                title: "Meu outro relógio amado",
            }
        ])

        // Act
        const search = wrapper.findComponent(Search)
        search.find('input[type="search"]').setValue('relógio')
        await search.find('form').trigger('submit')

        // Assert
        const cards = wrapper.findAllComponents(ProductCard)
        expect(wrapper.vm.searchTerm).toEqual('relógio')
        expect(cards).toHaveLength(2)
    });

    it('should return all product list when a empty search is performed', async () => {
        // Arrange
        const {
            wrapper,
        } = await mountProductList(10, [{
            title: "Meu outro relógio amado",
        }, ])

        // Act
        const search = wrapper.findComponent(Search)
        search.find('input[type="search"]').setValue('relógio')
        await search.find('form').trigger('submit')
        search.find('input[type="search"]').setValue('')
        await search.find('form').trigger('submit')

        // Assert
        const cards = wrapper.findAllComponents(ProductCard)
        expect(wrapper.vm.searchTerm).toEqual('')
        expect(cards).toHaveLength(11)
    })
})