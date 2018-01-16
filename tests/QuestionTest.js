// import { mount } from 'vue-test-utils'
import VueTestCase from 'petrol/core/VueTestCase'
import Question from '../src/components/Question.vue'
import moxios from 'moxios'

export default class QuestionTest extends VueTestCase {

    beforeEach() {
        this.wrapper = this.mount(Question, {
            dataQuestion: {
                title: 'The title',
                body: 'The body'
            }
        })

        moxios.install()
        // this.testUtilsWrapper = mount(Question)
    }

    afterEach() {
        moxios.uninstall()
    }

    /** @test */
    it_presents_the_title_and_body() {
        this.see('The title')
        this.see('The body')
    }

    /** @test */
    async it_can_be_edited() {
        this.assertFalse(!!this.wrapper.$el.querySelector('input[name=title]'))
        this.assertFalse(!!this.wrapper.$el.querySelector('input[name=body]'))

        this.click('#edit')
        await this.wrapper.$nextTick()

        this.assertEquals('The title', this.find('[name=title]').value)
        this.assertEquals('The body', this.find('[name=body]').value)
    }

    /** @test */
    async it_hides_the_edit_button_during_edit_mode() {
        this.assertTrue(!!this.wrapper.$el.querySelector('#edit'))

        this.click('#edit')
        await this.wrapper.$nextTick()

        this.assertFalse(!!this.wrapper.$el.querySelector('#edit'))
    }

    /** @test */
    async it_updates_the_question_after_being_edited() {
        this.click('#edit')
        await this.wrapper.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 10));

        console.log(this.wrapper.$el.innerHTML)
        this.fillField('[name=title]', 'Changed title')
        this.fillField('[name=body]', 'Changed body')
        this.click('#update')
        await this.wrapper.$nextTick()

        moxios.stubRequest('/questions/1', {
            status: 200,
            response: {
                title: 'Changed title',
                body: 'Changed body'
            }
        })

        await new Promise(resolve => setTimeout(resolve, 10));

        this.assertEquals(1, moxios.requests.count())
        this.see('Changed title')
        this.see('Changed body')
    }

    async it_can_cancel_edit_mode() {
        this.click('#edit')
        await this.wrapper.$nextTick()

        this.fillField('[name=title]', 'New title')
        this.click('#cancel')
        await this.wrapper.$nextTick()

        this.see('The title')
    }

    see(needle) {
        this.assertContains(needle, this.mounted.$el.outerHTML)
    }

}