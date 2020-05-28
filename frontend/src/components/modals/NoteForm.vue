<template>
  <modal-component id="note-form" :title="`${isNew ? 'Create' : 'Update'} note`">
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
          id="body"
          v-model="body"
          placeholder="Body"
          :label="false"
          :inputErrors="errors.body"
        />
        <div class="col-xs-12 images">
          <div class="video">
            <p>Agregar imagen:</p>
            <video id="player" autoplay></video>
          </div>
          <div>
            <button id="capture" class="btn btn-primary" type="button">Capture</button>
            <canvas id="canvas" width="200" height="160"></canvas>
          </div>
        </div>
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
    },
    image: {
      get() {
        return this.$store.state.note.image
      },
      set(value) {
        this.$store.commit('SET_IMAGE', value)
      }
    }
  },
  methods: {
    ...mapActions(['createNote', 'updateNote'])
  },
  mounted() {
    const player = document.getElementById('player')
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const captureButton = document.getElementById('capture')

    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        player.srcObject = stream
      })

    captureButton.addEventListener('click', () => {
      context.drawImage(player, 0, 0, canvas.width, canvas.height)
      this.image = canvas.toDataURL()
    })
  }
}
</script>

<style scoped>
.images {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.images p {
  font-size: 18px;
  color: rgb(146, 146, 146);
}

.video {
  display: flex;
  flex-direction: column;
}

#player {
  width: 90%;
}

#capture {
  border: 1px solid #ccc;
}

#canvas {
  border: 1px solid #ccc;
}
</style>
