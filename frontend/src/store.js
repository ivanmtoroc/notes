import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utilities/http'
import { openDB } from 'idb'

Vue.use(Vuex)

const hideModal = (modalName) => {
  // eslint-disable-next-line
  $(modalName).modal('hide')
}

const isFieldValid = (field) => !(!field || field === '')

export default new Vuex.Store({
  state: {
    notes: [],
    note: {},
    errors: {},
    isNew: false
  },
  getters: {
    isValidForm: state => {
      return isFieldValid(state.note.title) && isFieldValid(state.note.note)
    }
  },
  mutations: {
    SET_NOTES: (state, notes) => {
      state.notes = notes
    },
    NEW_EMPTY_NOTE: (state) => {
      state.note = {}
      state.errors = {}
      state.isNew = true
    },
    SET_TITLE: (state, title) => {
      state.note = { ...state.note, title }
      state.errors.title = []
    },
    SET_NOTE: (state, note) => {
      state.note = { ...state.note, note }
      state.errors.note = []
    },
    SET_ERRORS: (state, errors) => {
      state.errors = errors
    },
    ADD_NOTE: (state, note) => {
      state.notes.unshift(note)
    },
    SET_CURRENT_NOTE: (state, note) => {
      state.note = note
      state.isNew = false
    },
    UPDATE_NOTE: (state, note) => {
      state.notes = state.notes.filter(noteX => noteX.id !== note.id)
      state.notes.unshift(note)
    },
    DELETE_NOTE: (state) => {
      state.notes = state.notes.filter(noteX => noteX.id !== state.note.id)
    }
  },
  actions: {
    getNotes: async ({ commit }) => {
      const db = await openDB('workbox-background-sync', 3, {
        upgrade (db) {
          const store = db.createObjectStore('requests', {
            keyPath: 'id',
            autoIncrement: true
          })
          store.createIndex('queueName', 'queueName', { unique: false })
        }
      })

      var counter

      do {
        counter = 0
        var cursor = await db.transaction('requests').store.openCursor()
        while (cursor) {
          counter += 1
          cursor = await cursor.continue()
        }
      } while (counter !== 0)

      const response = await http.get('notes/?format=json')
      if (!response.error) {
        commit('SET_NOTES', response.data)
      }
    },
    newEmptyNote: ({ commit }) => {
      commit('NEW_EMPTY_NOTE')
    },
    createNote: async ({ state, commit }, event) => {
      if (event) event.preventDefault()
      commit('SET_ERRORS', {})
      const response = await http.post('notes/?format=json', state.note)
      if (!navigator.onLine) {
        commit('ADD_NOTE', { ...state.note, error: true })
        hideModal('#note-form')
      } else if (!response.error) {
        commit('ADD_NOTE', response.data)
        hideModal('#note-form')
      } else {
        commit('SET_ERRORS', response.data)
      }
    },
    setNote: ({ commit }, note) => {
      commit('SET_CURRENT_NOTE', note)
    },
    updateNote: async ({ state, commit }, event) => {
      if (event) event.preventDefault()
      commit('SET_ERRORS', {})
      const response = await http.patch(`notes/${state.note.id}/?format=json`, state.note)
      if (!response.error) {
        commit('UPDATE_NOTE', response.data)
        hideModal('#note-form')
      } else {
        commit('SET_ERRORS', response.data)
      }
    },
    deleteNote: async ({ state, commit }) => {
      const response = await http.delete(`notes/${state.note.id}/?format=json`)
      if (!response.error) {
        commit('DELETE_NOTE')
        hideModal('#note-status')
      }
    }
  }
})
