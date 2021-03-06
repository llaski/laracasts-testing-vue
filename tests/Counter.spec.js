import { mount } from '@vue/test-utils'
import expect from 'expect'
import Counter from '../src/components/Counter.vue'

describe('Counter', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Counter)
    })

    it('defaults the count to 0', () => {
        expect(wrapper.vm.count).toBe(0)
    })

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0)
        wrapper.find('button').trigger('click')

        expect(wrapper.find('.count').html()).toContain(1)
    })

    it('increments the count when the button is clicked', () => {
        expect(wrapper.vm.count).toBe(0)
        wrapper.find('button').trigger('click')

        expect(wrapper.vm.count).toBe(1)
    })

})