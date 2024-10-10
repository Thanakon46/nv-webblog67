<template>
  <div>
    <h1>Edit Cap</h1>
    <form v-on:submit.prevent="editCap">
      <p>Title: <input type="text" v-model="cap.title" /></p>
      <transition name="fade">
        <div class="thumbnail-pic" v-if="cap.thumbnail !== 'null'">
          <img :src="BASE_URL + cap.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      <div class="dropbox">
        <input
          type="file"
          multiple
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="handleFileChange($event)"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">Drag your file(s) here to begin<br />or click to browse</p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">Upload Successful.</p>
      </div>
      <transition-group tag="ul" class="pictures">
        <li v-for="picture in pictures" :key="picture.id">
          <img :src="BASE_URL + picture.name" alt="picture image" />
          <br />
          <button @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
          <button @click.prevent="delFile(picture)">Delete</button>
        </li>
      </transition-group>
      <div class="clearfix"></div>
      <p><strong>Content:</strong></p>
      <vue-ckeditor
        v-model.lazy="cap.content"
        :config="config"
        @blur="onBlur($event)"
        @focus="onFocus($event)"
      />
      <p>Category: <input type="text" v-model="cap.category" /></p>
      <p>Status: <input type="text" v-model="cap.status" /></p>
      <p>
        <button type="submit">Update Cap</button>
        <button @click="navigateTo('/caps')">Back</button>
      </p>
    </form>
  </div>
</template>

<script>
import CapsService from "@/services/CapsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      currentStatus: STATUS_INITIAL,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      cap: {
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        category: "",
        status: "",
      },
      config: {
        toolbar: [["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"]],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(material) {
      const confirmDelete = confirm("Want to delete?");
      if (confirmDelete) {
        await UploadService.delete({ filename: material.name });
        this.pictures = this.pictures.filter(picture => picture.id !== material.id);
      }
    },
    async editCap() {
      this.cap.pictures = JSON.stringify(this.pictures);
      try {
        await CapsService.put(this.cap);
        this.$router.push({ name: "caps" });
      } catch (err) {
        console.error(err);
      }
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.fileCount = files.length;
      this.filesChange(this.uploadFieldName, files);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        this.uploadedFileNames.forEach(uploadFilename => {
          if (!this.pictures.find(picture => picture.name === uploadFilename)) {
            this.pictureIndex++;
            this.pictures.push({ id: this.pictureIndex, name: uploadFilename });
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.error(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(fileList).forEach(file => {
        formData.append(fieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });
      this.save(formData);
    },
    clearUploadResult() {
      setTimeout(() => this.reset(), 5000);
    },
    useThumbnail(filename) {
      this.cap.thumbnail = filename;
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFileNames = [];
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  async created() {
    try {
      const capId = this.$route.params.capId;
      const response = await CapsService.show(capId);
      this.cap = response.data;
      this.pictures = JSON.parse(this.cap.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
.thumbnail-pic img {
  width: 200px;
}
</style>
