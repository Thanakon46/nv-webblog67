<template>
    <div>
        <h1>Show Cap</h1>
        <p>id: {{ cap.id }}</p>
        <p>title: {{ cap.title }}</p>
        <p>content: {{ cap.content }}</p>
        <p>category: {{ cap.category }}</p>
        <p>status: {{ cap.status }}</p>
        <p>
        <button v-on:click="navigateTo('/cap/edit/'+ cap.id)">แก้ไข
        cap</button>
        <button v-on:click="navigateTo('/caps')">กลับ </button>
        </p>
    </div>
</template>
<script>
    import CapsService from '@/services/CapsService'
    export default {
        data () {
            return {
                cap: null
            }
        },
        async created () {
            try {
                let capId = this.$route.params.capId
                this.cap = (await CapsService.show(capId)).data
            } catch (error) {
                console.log (error)
            }
        },
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>
<style scoped>
</style>