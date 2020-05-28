<template>
  <div class="thumbnail">
    <div class="caption">
      <button @click="setNote(note)" class="action close" data-toggle="modal" data-target="#note-status">
        <i class="fa fa-trash text-red"></i>
      </button>
      <button @click="setNote(note)" class="action close" data-toggle="modal" data-target="#note-form">
        <i class="fa fa-edit text-primary"></i>
      </button>
      <button v-if="note.error" class="action close">
        <i class="fa fa-warning text-warning"></i>
        <span class="text-mutted">Offline</span>
      </button>
      <h2>
        {{ note.title }}
        <small class="text-mutted">{{ note.human_date }}</small>
      </h2>
      <p class="body">
        {{ note.body }}
      </p>
      <h3 v-if="note.image || note.audio">Note files:</h3>
      <div class="assets-container">
        <div v-if="note.image">
          <p>Image:</p>
          <img :src="note.image" alt="Image" />
        </div>
        <div v-if="note.audio">
          <p>Audio:</p>
          <audio :src="note.audio" controls></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'note',
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['setNote'])
  }
}
</script>

<style scoped>
.assets-container {
  display: flex;
  margin-top: 20px;
}

.assets-container div {
  padding: 0 20px;
}

.action {
  margin: 0px 5px;
  opacity: 0.6 !important;
}

.text-warning {
  color: #ce9024 !important;
}

.text-mutted {
  color: gray;
  font-size: 14px;
  margin: 0 5px 0 2px;
}

.body {
  font-size: 18px;
}
</style>
