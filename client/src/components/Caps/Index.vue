<template>
    <div>
        <h2>Get all caps</h2>
        <p><button v-on:click="logout">Logout</button></p>
        <h4>จำนวน cap {{caps.length}}</h4>
        <p><button v-on:click="navigateTo('/cap/create')">สร้าง cap</button></p>
        <div v-for="cap in caps" v-bind:key="cap.id">
            <p>id: {{ cap.id }}</p>
            <p>title: {{ cap.title }}</p>
            <p>content: {{ cap.content }}</p>
            <p>category: {{ cap.category }}</p>
            <p>status: {{ cap.status }}</p>
            <p>
            <button v-on:click="navigateTo('/cap/'+ cap.id)">ดู cap</button>
            <button v-on:click="navigateTo('/cap/edit/'+ cap.id)">แก้ไข cap</button>
            <button v-on:click="deleteCap(cap)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>
<script>
    import CapsService from '@/services/CapsService'
    export default {
        data () {
            return {
                caps: []
            }
        },
        async created () {
            this.caps = (await CapsService.index()).data
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setCap', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteCap (cap) {
                let result = confirm("Want to delete?")
                if (result) {
                    try {
                        await CapsService.delete(cap)
                        this.refreshData()
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async refreshData() {
                this.caps = (await CapsService.index()).data
            }
        }
    }
</script>
<style scoped>
</style>