<template>
  <div class="thumbnail">
    <div class="caption">
      <button
        @click="setNote(note)"
        class="action close text-red"
        data-toggle="modal"
        data-target="#note-status"
      >
        <i class="fa fa-trash"></i>
      </button>
      <button
        @click="setNote(note)"
        class="action close text-primary"
        data-toggle="modal"
        data-target="#note-form"
      >
        <i class="fa fa-edit"></i>
      </button>
      <h2>{{ note.title }}</h2>
      <p>{{ note.note }}</p>
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
    ...mapActions([
      'setNote'
    ])
  }
}
</script>

<style scoped>
.action {
  margin: 0px 5px;
}
</style>
