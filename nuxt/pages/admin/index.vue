<template>
    <section>
        <h1>管理画面へようこそ</h1>
        <button @click="logout">ログアウト</button>
    </section>
</template>

<script>
export default {
    middleware: 'authenticated',
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout', null)
            this.$router.push('/admin/login')
        },
    },
}
</script>