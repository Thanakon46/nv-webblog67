<template>
    <div class="create-cap">
      <h1>Create New Cap</h1>
      <form @submit.prevent="createCap" class="cap-form">
        <div class="form-group">
          <label for="band">Band</label>
          <input type="text" v-model="cap.band" id="band" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="category">Category</label>
          <input type="text" v-model="cap.category" id="category" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="content">Content</label>
          <textarea v-model="cap.content" id="content" class="form-control" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="status">Status</label>
          <input type="text" v-model="cap.status" id="status" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label for="pictures">Pictures (URLs)</label>
          <input type="text" v-model="cap.pictures" id="pictures" class="form-control" />
        </div>
  
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  </template>
  
  <script>
  import CapService from '@/services/CapService';
  
  export default {
    data() {
      return {
        cap: {
          band: '',
          category: '',
          content: '',
          status: '',
          pictures: ''
        }
      };
    },
    methods: {
      async createCap() {
        try {
          await CapService.createCap(this.cap);
          this.$router.push('/caps');
        } catch (error) {
          console.error('Error creating cap:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-cap {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .cap-form .form-group {
    margin-bottom: 20px;
  }
  
  .cap-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .cap-form .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .cap-form .form-control:focus {
    border-color: #007bff;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  
  
  <script>
  import CapService from '@/services/CapService';
  
  export default {
    data() {
      return {
        cap: {
          band: '',
          category: '',
          content: '',
          status: '',
          pictures: []
        }
      };
    },
    methods: {
      async createCap() {
        try {
          await CapService.createCap(this.cap);
          this.$router.push('/caps');
        } catch (error) {
          console.error('Error creating cap:', error);
        }
      }
    }
  };
  </script>
  