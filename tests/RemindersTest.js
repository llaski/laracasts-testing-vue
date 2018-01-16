import VueTestCase from 'petrol/core/VueTestCase'
import Reminders from '../src/components/Reminders.vue'

export default class RemindersTest extends VueTestCase {

    beforeEach() {
        this.wrapper = this.mount(Reminders)
    }

    /** @test */
    it_hides_the_reminders_list_if_there_are_none() {
        this.assertElementNotExists('ul')
    }

    //Test can not be run while it_can_delete_a_reminder is active (changing the same element and causing race condition issues)
    // /** @test */
    // async it_can_add_reminders() {
    //     this.fillField('.new-reminder', 'Go to the store')

    //     this.click('button')
    //     await this.wrapper.$nextTick()

    //     this.assertElementContains('ul', 'Go to the store')
    //     this.assertEquals('', this.find('.new-reminder').value)
    // }

    /** @test */
    async it_can_delete_a_reminder() {
        this.wrapper.reminders = [
            'Go to store',
            'Get milk'
        ]
        await this.wrapper.$nextTick()

        this.dispatchEvent(this.find('ul > li:first-child .delete'), 'click')
        await this.wrapper.$nextTick()

        this.assertElementNotContains('ul', 'Go to store')
        this.assertElementContains('ul', 'Get milk')
    }

}