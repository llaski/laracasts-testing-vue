import VueTestCase from 'petrol/core/VueTestCase'
import Counter from '../src/components/Counter.vue'

export default class CounterTest extends VueTestCase {

    beforeEach() {
        this.wrapper = this.mount(Counter)
    }

    /** @test */
    it_defaults_to_a_count_of_zero() {
        this.assertEquals(0, this.wrapper.count)
    }

    /** @test */
    it_increments_the_count_when_the_increment_button_is_clicked() {
        this.assertEquals(0, this.wrapper.count)
        this.click('.increment')
        this.assertEquals(1, this.wrapper.count)
    }

    /** @test */
    it_decrements_the_count_when_the_decrement_button_is_clicked() {
        this.wrapper.count = 5

        this.click('.decrement')
        this.assertEquals(4, this.wrapper.count)
    }

    /** @test */
    async it_presents_the_current_count() {
        this.assertElementContains('.count', '0')
        this.click('.increment')
        await this.wrapper.$nextTick()
        this.assertElementContains('.count', '1')
    }

    /** @test */
    async it_never_goes_below_zero() {
        this.wrapper.count = 1
        await this.wrapper.$nextTick()
        this.assertNotEquals('none', this.find('.decrement').style.display)
        this.assertEquals(1, this.wrapper.count)

        this.click('.decrement')
        await this.wrapper.$nextTick()

        this.assertEquals('none', this.find('.decrement').style.display)
        this.assertEquals(0, this.wrapper.count)
    }


}