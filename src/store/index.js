import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:8095'

export default createStore({
  state: {
    friends : null,
    loggedin: false
  },
  getters: {
  },
  mutations: {
    setFriends(state,payload){
      state.friends = payload
    },
    setLogged(state, payload){
      state.loggedin = payload
    }
  },
  actions: {
    // async getFriends({commit}, friendDetails){
    //   let {data} = await axios.get(baseUrl + '/friends', friendDetails)
    //   console.log(data);
    // },
    async getFriends({commit}){
      let {data} = await axios.get(baseUrl + '/friends')
      console.log(data);
      commit('setFriends', data)
    },
    
    async friends({commit}, friendDetails){
      await axios.post(baseUrl + '/friends', friendDetails)
      window.location.reload()
    },

    //friendDetails in this case is the name
    async deleteFriend({commit}, name){
      await axios.delete(baseUrl + '/friends/' + name)
  
      window.location.reload()
    },

    async editFriend({commit}, update){
      await axios.patch(baseUrl + '/friends/' + update.id, update)
      window.location.reload()
    },

    async addUser({commit}, add){
      console.log(add);
      let {data} = await axios.post(baseUrl + '/users', add)
      alert(data.msg)
      window.location.reload()
    }, 

    async loginUser({commit}, pass){
      console.log(pass);
      let {data} = await axios.post(baseUrl + '/login', pass)
      alert(data.msg)
      commit('setLogged', true)
      // window.location.reload()
    }
  },
  modules: {
  }
})
