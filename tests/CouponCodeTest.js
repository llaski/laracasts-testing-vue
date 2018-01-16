import { mount } from 'vue-test-utils'
import VueTestCase from 'petrol/core/VueTestCase'
import CouponCode from '../src/components/CouponCode.vue'

export default class CouponCodeTest extends VueTestCase {

    beforeEach() {
        this.wrapper = this.mount(CouponCode)
        this.testUtilsWrapper = mount(CouponCode)
    }

    /** @test */
    it_accepts_a_coupon_code() {
        this.assertElementExists('.coupon-code')
    }

    /** @test */
    async it_validates_a_real_coupon_code() {
        this.fillField('.coupon-code', '0f0f0f')

        await this.wrapper.$nextTick()

        this.assertElementContains('.success', 'Coupon Redemeed! 50% off!')
    }

    // /** @test */
    // async it_validates_an_invalid_coupon_code() {
    //     this.fillField('.coupon-code', 'fake')
    //     await this.wrapper.$nextTick()

    //     console.log(this.wrapper.code, this.wrapper.valid, this.wrapper.$el.innerHTML)
    //     this.assertElementContains('.error', 'Invalid coupon code')
    // }

    /** @test */
    it_broadcasts_the_percentage_when_the_code_is_valid() {
        let couponCode = this.testUtilsWrapper.find('.coupon-code')
        couponCode.element.value = '0f0f0f'
        couponCode.trigger('input')

        // this.testUtilsWrapper.setData({
        //     code: '0f0f0f'
        // })
        // this.testUtilsWrapper.vm.validate()

        const eventData = this.testUtilsWrapper.emitted().applied[0][0]
        this.assertEquals(50, eventData.percentage)
    }

}