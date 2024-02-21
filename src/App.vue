<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/friends">Friends</router-link> |
    <router-link v-if="!$cookies.get('jwt')" to="/signup" >Sign Up</router-link>
  </nav>
  <button v-if="$cookies.get('jwt')" @click="logout">Log Out</button>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default{
  data(){

  },
  computed:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>