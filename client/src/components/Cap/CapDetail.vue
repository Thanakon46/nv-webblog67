<template>
    <div>
      <h1>Cap Detail</h1>
      <p><strong>Band:</strong> {{ cap.band }}</p>
      <p><strong>Category:</strong> {{ cap.category }}</p>
      <p><strong>Content:</strong> {{ cap.content }}</p>
      <p><strong>Status:</strong> {{ cap.status }}</p>
      <p><strong>Pictures:</strong> <img :src="cap.pictures" alt="Cap Picture" /></p>
      <router-link :to="'/cap/edit/' + cap.id" class="btn btn-primary">Edit</router-link>
      <button @click="deleteCap">Delete</button>
    </div>
  </template>
  
  <script>
  import CapService from '@/services/CapService';
  
  export default {
    data() {
      return {
        cap: {}
      };
    },
    created() {
      this.fetchCap();
    },
    methods: {
      async fetchCap() {
        try {
          const response = await CapService.getCapById(this.$route.params.id);
          this.cap = response.data;
        } catch (error) {
          console.error('Error fetching cap:', error);
        }
      },
      async deleteCap() {
        if (confirm("Are you sure you want to delete this Cap?")) {
          try {
            await CapService.deleteCap(this.cap.id);
            this.$router.push('/caps');
          } catch (error) {
            console.error('Error deleting cap:', error);
          }
        }
      }
    }
  };
  </script>
  