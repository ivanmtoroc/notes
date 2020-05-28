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
          <div class="capture">
            <button id="capture" class="btn btn-primary" type="button">Capture</button>
            <canvas id="canvas" width="200" height="160"></canvas>
          </div>
        </div>
        <div class="col-xs-12 audio">
          <div>
            <p>Agregar audio:</p>
            <audio id="audio-player" controls></audio>
          </div>
          <div class="buttons">
            <button id="start" type="button" class="btn btn-primary">Start</button>
            <button id="stop" type="button" class="btn btn-info">Stop</button>
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
    },
    audio: {
      get() {
        return this.$store.state.note.audio
      },
      set(value) {
        this.$store.commit('SET_AUDIO', value)
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

    let shouldStop = false
    let stopped = false
    const startButton = document.getElementById('start')
    const stopButton = document.getElementById('stop')
    const audioPlayer = document.getElementById('audio-player')
    stopButton.disabled = true

    stopButton.addEventListener('click', function() {
      shouldStop = true
      startButton.disabled = false
      stopButton.disabled = true
    })

    const handleSuccess = stream => {
      const options = { mimeType: 'audio/webm' }
      const recordedChunks = []
      const mediaRecorder = new MediaRecorder(stream, options)

      mediaRecorder.addEventListener('dataavailable', function(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data)
        }

        if (shouldStop === true && stopped === false) {
          mediaRecorder.stop()
          stopped = true
        }
      })

      mediaRecorder.addEventListener('stop', () => {
        var blob = new Blob(recordedChunks)
        var reader = new FileReader()

        audioPlayer.src = URL.createObjectURL(blob)
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          this.audio = reader.result
        }
      })

      mediaRecorder.start(500)
    }

    startButton.addEventListener('click', function(event) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess)
      event.target.disabled = true
      shouldStop = false
      stopped = false
      stopButton.disabled = false
    })
  }
}
</script>

<style scoped>
.images {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.audio {
  margin-top: 15px;
  display: grid;
  grid-template-columns: 3fr 1fr;
}

.images p,
.audio p {
  font-size: 18px;
  color: rgb(146, 146, 146);
}

.images .capture {
  margin-top: 35px;
}

.audio .buttons {
  display: flex;
  align-items: flex-end;
}

.audio .buttons button {
  border: 1px solid #ccc;
  margin: 0 4px;
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

.pull-right {
  margin-top: 20px;
}
</style>
