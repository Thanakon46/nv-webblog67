<template>
    <div class="cap-list">
      <h1>Cap List</h1>
      <router-link to="/cap/create" class="btn btn-primary">Create New Cap</router-link>
      <ul class="cap-items">
        <li v-for="cap in caps" :key="cap.id" class="cap-item">
          <div class="cap-details">
            <strong>Band:</strong> {{ cap.band }} -
            <strong>Category:</strong> {{ cap.category }} -
            <strong>Status:</strong> {{ cap.status }}
          </div>
          <div v-if="cap.pictures" class="cap-images">
            <img
              v-for="(picture, index) in cap.pictures.split(',')"
              :key="index"
              :src="picture.trim()"
              alt="Cap Picture"
              class="cap-picture"
            />
          </div>
          <div class="cap-actions">
            <router-link :to="'/cap/' + cap.id" class="btn btn-view">View</router-link> |
            <router-link :to="'/cap/edit/' + cap.id" class="btn btn-edit">Edit</router-link> |
            <button @click="deleteCap(cap.id)" class="btn btn-delete">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import CapService from '@/services/CapService';
  
  export default {
    data() {
      return {
        caps: []
      };
    },
    created() {
      this.fetchCaps();
    },
    methods: {
      async fetchCaps() {
        try {
          const response = await CapService.getAllCaps();
          this.caps = response.data;
        } catch (error) {
          console.error('Error fetching caps:', error);
        }
      },
      async deleteCap(id) {
        if (confirm("Are you sure you want to delete this Cap?")) {
          try {
            await CapService.deleteCap(id);
            this.fetchCaps();
          } catch (error) {
            console.error('Error deleting cap:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cap-list {
    padding: 20px;
  }
  
  .cap-items {
    list-style: none;
    padding: 0;
  }
  
  .cap-item {
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  
  .cap-details {
    font-size: 1.2em;
  }
  
  .cap-images {
    margin-top: 10px;
  }
  
  .cap-picture {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ddd;
  }
  
  .cap-actions {
    margin-top: 10px;
  }
  
  .btn {
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .btn-view {
    background-color: #007bff;
    color: white;
  }
  
  .btn-edit {
    background-color: #ffc107;
    color: white;
  }
  
  .btn-delete {
    background-color: #dc3545;
    color: white;
  }
  </style>
  
  
  <script>
  import CapService from '@/services/CapService';
  
  export default {
    data() {
      return {
        caps: []
      };
    },
    created() {
      this.fetchCaps();
    },
    methods: {
      async fetchCaps() {
        try {
          const response = await CapService.getAllCaps();
          this.caps = response.data;
        } catch (error) {
          console.error('Error fetching caps:', error);
        }
      },
      async deleteCap(id) {
        if (confirm("Are you sure you want to delete this Cap?")) {
          try {
            await CapService.deleteCap(id);
            this.fetchCaps();
          } catch (error) {
            console.error('Error deleting cap:', error);
          }
        }
      }
    }
  };
  </script>
  