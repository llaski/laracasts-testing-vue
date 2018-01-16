import VueTestCase from 'petrol/core/VueTestCase'
import Countdown from '../src/components/Countdown.vue'

export default class CountdownTestTest extends VueTestCase {

    beforeEach() {
        this.wrapper = this.mount(Countdown, {
            until:
        })
    }

    /** @test */
    it_renders_a_countdown_timer() {

    }

    see(needle) {
        this.assertContains(needle, this.mounted.$el.outerHTML)
    }

}
