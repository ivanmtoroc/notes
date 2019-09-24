<template>
  <body class="hold-transition fixed layout-top-nav">
    <div class="container wrapper bg-color">
      <header-component></header-component>
      <div class="container-fluid margin">
        <h1 class="text-center">
          Your Notes
        </h1>
        <div class="row">
          <note v-for="(note, index) in notes" :note="note" :key="index" />
        </div>
      </div>
      <footer-component></footer-component>
    </div>
    <note-form />
    <note-status />
  </body>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeaderComponent from '@/components/layout/Header'
import FooterComponent from '@/components/layout/Footer'
import Note from '@/components/template/Note'
import NoteForm from '@/components/modals/NoteForm'
import NoteStatus from '@/components/modals/NoteStatus'

const CHANNEL = new BroadcastChannel('sync-messages')

export default {
  name: 'home',
  components: {
    HeaderComponent,
    FooterComponent,
    Note,
    NoteForm,
    NoteStatus
  },
  computed: {
    ...mapState([
      'notes'
    ])
  },
  methods: {
    ...mapActions([
      'getNotes'
    ])
  },
  mounted () {
    this.getNotes()
    CHANNEL.addEventListener('message', this.getNotes)
  }
}
</script>

<style scoped>
.margin {
  margin-top: 70px;
  margin-bottom: 70px;
}
.bg-color {
  background-color: #EEE;
}
</style>
