import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      state.token = userData.token
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }

  },
  actions: {
    register ({ commit }, credentials) {
      axios.post('//localhost:3000/register', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    },
    login ({ commit }, credentials) {
      axios.post('//localhost:3000/login', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    }
  }
})
