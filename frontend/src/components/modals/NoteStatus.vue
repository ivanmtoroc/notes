<template>
  <modal-component id="note-status" title="Delete note">
    <div class="row">
      <div class="col-sm-12">
        <p>
          Are you sure to delete the note
          <strong>{{ note.title }}</strong
          >?
        </p>
      </div>
    </div>
    <div class="pull-right">
      <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
      <button @click="deleteNote()" class="btn btn-danger">
        Delete
      </button>
    </div>
  </modal-component>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalComponent from '@/components/template/Modal'

export default {
  name: 'note-status',
  components: {
    ModalComponent
  },
  computed: {
    ...mapState(['note'])
  },
  methods: {
    ...mapActions(['deleteNote'])
  }
}
</script>
