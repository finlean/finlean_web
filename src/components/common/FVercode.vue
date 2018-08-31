<template>
    <div class="f-vercode" :style="{margin:margin?'10px 0':'0'}">
        <group>
            <x-input placeholder='请输入短信验证码' @on-change='changeVal' v-model="verCode" :max="4">
                <div slot="right" class="getVerCode" :style="{color:abledClick?'#bfa073':'#a3a3a3'}" @click="getStatus">{{ verText }}</div>
            </x-input>
        </group>
    </div>
</template>
<script>
    export default {
        name: 'f-vercode',
        data() {
            return {
                verCode: '',
                abledClick: true,
                verText: '发送验证码',
                timer: null
            };
        },
        props: {
            clear: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            passStatus: {
                type: Boolean,
                required: true,
                default: false
            },
            api: {
                type: String,
                required: true,
                default: ''
            },
            params: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            margin: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            passStatus(val) {
                if (val) {
                    this.sendCode();
                }
            },
            clear(val) {
                if (val) {
                    this.abledClick = true;
                    clearInterval(this.timer);
                    this.verText = '发送验证码';
                    this.$emit('update:passStatus', false);
                }
            }
        },
        methods: {
            changeVal(val) {
                this.$emit('input', val);
            },
            getStatus() {
                this.$emit('sendCode');
            },
            sendCode() {
                if (!this.abledClick) {
                    return;
                }
                this.abledClick = false;
                // 设置倒计时
                let countDown = 60;
                this.verText = countDown + 's后重发';
                this.timer = setInterval(() => {
                    countDown--;
                    this.verText = countDown + 's后重发';
                    if (countDown === 0) {
                        clearInterval(this.timer);
                        this.verText = '重新发送';
                        this.$emit('update:passStatus', false);
                        this.abledClick = true;
                    }
                }, 1000);
                //开始拉取接口
                this.$api[this.api](this.params).then(res => {
                    this.$emit('end', res);
                });
            }
        },
        activated() {
            this.verCode = '';
        }
    };
</script>
<style lang="less" scoped>
.f-vercode {
    .getVerCode {
        width: 105px;
        text-align: center;
        box-sizing: border-box;
        padding-left: 18px;
        border-left: 1px solid #dddddd;
        color: @color-text-three;
        font-size: @font-size-medium;
    }
}
</style>
