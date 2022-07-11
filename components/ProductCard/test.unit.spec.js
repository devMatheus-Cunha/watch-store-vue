import {
    mount
} from "@vue/test-utils"

// Components
import ProductCard from "@/components/ProductCard"

// Services
import {
    makeServer
} from "@/miragejs/server"

describe('ProductCard - unit', () => {
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
        const wrapper = mount(ProductCard, {
            propsData: {
                product: server.create("product", {
                    title: "Relogio bonito",
                    price: "22.00"
                })
            }
        })
        expect(wrapper.element).toMatchSnapshot()
    });

    it('should mount the component', () => {
        const wrapper = mount(ProductCard, {
            propsData: {
                product: server.create("product", {
                    title: "Relogio bonito",
                    price: "23.00",
                    image: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                })
            }
        })
        expect(wrapper.vm).toBeDefined()
        expect(wrapper.text()).toContain("Relogio bonito")
        expect(wrapper.text()).toContain("$22.00")
    });
});