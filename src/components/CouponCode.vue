<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate">
        <p v-if="valid" class="success">
            Coupon Redemeed! {{ message }}
        </p>
        <p v-if="!valid" class="error">
            Invalid coupon code
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            coupons: [
                { code: '0f0f0f', message: '50% off!', percentage: 50 },
                { code: 'FREE', message: 'It\'s free!', percentage: 100 }
            ],
            valid: false
        }
    },

    methods: {
        validate() {
            this.valid = this.coupons.map(coupon => coupon.code).includes(this.code)

            if (this.valid) {
                this.$emit('applied', this.selectedCoupon)
            }
        }
    },

    computed: {
        selectedCoupon() {
            return this.coupons.find(coupon => coupon.code === this.code)
        },

        message() {
            return this.selectedCoupon ? this.selectedCoupon.message : ''
        }
    }
}
</script>