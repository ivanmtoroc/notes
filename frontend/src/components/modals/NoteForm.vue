<template>
  <modal-component id="note-form" :title="`${ isNew ? 'Create' : 'Update' } note`">
    <form>
      <div class="row">
        <input-component
          id="title"
          v-model="title"
          placeholder="Title"
          :label="false"
          :inputErrors="errors.title"
        />
        <input-component
          id="note"
          v-model="note"
          placeholder="Note"
          :label="false"
          :inputErrors="errors.note"
        />
      </div>
      <div class="pull-right">
        <button class="btn btn-info" data-dismiss="modal">Cancel</button>
        <button v-if="isNew" @click="createNote($event)" class="btn btn-success" type="submit">Create</button>
        <button v-else @click="updateNote($event)" class="btn btn-primary" type="submit">Update</button>
      </div>
    </form>
  </modal-component>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalComponent from '@/components/template/Modal'
import InputComponent from '@/components/template/Input'

export default {
  name: 'note-form',
  components: {
    ModalComponent,
    InputComponent
  },
  computed: {
    ...mapState([
      'errors',
      'isNew'
    ]),
    title: {
      get () { return this.$store.state.note.title },
      set (value) { this.$store.commit('SET_TITLE', value) }
    },
    note: {
      get () { return this.$store.state.note.note },
      set (value) { this.$store.commit('SET_NOTE', value) }
    }
  },
  methods: {
    ...mapActions([
      'createNote',
      'updateNote'
    ])
  }
}
</script>
