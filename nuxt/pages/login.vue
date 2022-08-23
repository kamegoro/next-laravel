<template>
    <div id="p-login">
        <div class="p-login__wrapper">
            <div class="p-login__content">
                <div class="p-login__card">
                    <form @submit.prevent="login">
                        <div class="p-login__card--body">
                            <div class="p-login__error" v-if="auth.error">メールアドレスまたはパスワードが違います。</div>
                            <div class="c-form__row p-login__form--group"> 
                                <input type="text" placeholder="メールアドレス" name="email" class="c-form__control p-login__form--control" v-model="auth.email">
                            </div>
                            <div class="c-form__row p-login__form--group"> 
                                <input type="password" placeholder="パスワード" name="password" class="c-form__control p-login__form--control" v-model="auth.password">
                            </div>
                            <div class="c-form__row p-login__form--group p-login__form--submit"> 
                                <button class="c-button__reset c-button__primary c-button__block c-button__submit" v-bind:disabled="processing"><span>ログイン</span></button>
                            </div>
                            <div class="p-login__form--supply">パスワードを忘れた方は<n-link to="/password/forgot" v-bind:disabled="processing">こちら</n-link></div>
                            <div class="c-form__row p-login__form--group p-login__form--register"> 
                                <n-link to="/register" class="btn btn-secondary btn-submit btn-block p-reset__form--btn c-auth__button" v-bind:disabled="processing">新規会員登録</n-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    layout: 'login',
    head() {
        return {
            title: "ログイン"
        }
    },
    data() {
        return {
            processing :false,
            auth: {
                email : '',
                password : '',
                error :false
            }
        }
    },
    methods: {
        async login() {
            this.auth.error = false
            this.processing = true
            try {
                await this.$auth.loginWith('User', { data: this.auth })
                    .then(()=>{
                        this.processing = false
                    })
            } catch (err) {
                console.log(err)
                this.auth.error = true
                this.processing = false
            }
        }
    }
}
</script>