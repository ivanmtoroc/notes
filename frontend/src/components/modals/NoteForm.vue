<template>
  <modal-component id="note-form" :title="`${isNew ? 'Create' : 'Update'} note`">
    <form>
      <div class="row">
        <input-component id="title" v-model="title" placeholder="Title" :label="false" :inputErrors="errors.title" />
        <input-component id="body" v-model="body" placeholder="Body" :label="false" :inputErrors="errors.body" />
      </div>
      <div class="pull-right">
        <button class="btn btn-info" data-dismiss="modal">Cancel</button>
        <button
          v-if="isNew"
          @click="createNote($event)"
          class="btn btn-success"
          :class="[isValidForm ? '' : 'disabled']"
          type="submit"
        >
          Create
        </button>
        <button
          v-else
          @click="updateNote($event)"
          class="btn btn-primary"
          :class="[isValidForm ? '' : 'disabled']"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  </modal-component>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ModalComponent from '@/components/template/Modal'
import InputComponent from '@/components/template/Input'

export default {
  name: 'note-form',
  components: {
    ModalComponent,
    InputComponent
  },
  computed: {
    ...mapState(['errors', 'isNew']),
    ...mapGetters(['isValidForm']),
    title: {
      get() {
        return this.$store.state.note.title
      },
      set(value) {
        this.$store.commit('SET_TITLE', value)
      }
    },
    body: {
      get() {
        return this.$store.state.note.body
      },
      set(value) {
        this.$store.commit('SET_BODY', value)
      }
    }
  },
  methods: {
    ...mapActions(['createNote', 'updateNote'])
  }
}
</script>
