<template>
  <header class="main-header">
    <nav class="navbar navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand">
            <strong class="brand">
              Notes!
            </strong>
          </a>
        </div>
        <div class="collapse navbar-collapse pull-left"></div>
        <div class="navbar-custom-menu">
          <a>
            <ul class="nav navbar-nav nav-item">
              <li>
                <button @click="newEmptyNote()" class="btn bg-purple" data-toggle="modal" data-target="#note-form">
                  <i class="fa fa-plus-circle"></i>
                  Add Note
                </button>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'header-component',
  methods: {
    ...mapActions(['newEmptyNote'])
  }
}
</script>

<style scoped>
.brand {
  color: white;
  font-size: 40px;
}
</style>
