import { mount } from '@vue/test-utils'
import expect from 'expect'
import Question from '../src/components/Question.vue'
import moxios from 'moxios'

describe('Question', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        })

        moxios.install()
    })

    afterEach(function() {
        moxios.uninstall()
    })

    it('presents the title and body', () => {
        see('The title')
        see('The body')
    })

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false)
        expect(wrapper.contains('textarea[name=title]')).toBe(false)

        click('#edit')

        expect(wrapper.find('input[name=title]').element.value).toBe('The title')
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body')
    })

    it('hides the edit button during edit mode', function() {
        expect(wrapper.contains('#edit')).toBe(true)

        click('#edit')

        expect(wrapper.contains('#edit')).toBe(false)
    });

    it.only('updates the question after being edited', function(done) {
        click('#edit')

        type('input[name=title]', 'Change title')
        type('textarea[name=body]', 'Change body')

        moxios.stubRequest(/questions\/\d+/, {
            status: 200,
            response: {
                title: 'Changed title',
                body: 'Changed body'
            }
        })

        click('#update')

        moxios.wait(() => {
            see('Changed title')
            see('Changed body')
            see('Your question has been updated')

            done()
        })
    });

    it('can cancel out of edit mode', function() {
        click('#edit')

        type('input[name=title]', 'Change title')

        click('#cancel')

        see('The title')
    });

    const see = (text, selector) => {
        const wrap = selector ? wrapper.find(selector) : wrapper

        expect(wrap.html()).toContain(text)
    }

    const type = (selector, value) => {
        const node = wrapper.find(selector)

        node.element.value = value
        node.trigger('input')
    }

    const click = (selector) => {
        wrapper.find(selector).trigger('click')
    }

})