<template>
    <div class="View">
        <h1>Sign Up</h1>

        <input type="text" name="userName" id="userName" placeholder="username" v-model="userName">
        <br><br>
        <input type="password" name="password" id="password" placeholder="password" v-model="password">
        <br><br>
        <button @click="pass()">Login</button>
        {{ $store.state.loggedin }}
        <button @click="plusUser()">SignUp</button>
        <br><br>
    </div>
</template>
<style>
button{
    margin: 5px;
}
</style>
<script>

export default{
    data(){
        return{
            userName: null,
            password: null
        }
    },
    methods: {
        plusUser(){
            // console.log(this.$data);
            this.$store.dispatch('addUser', this.$data)
        },
        pass(){
            this.$store.dispatch('loginUser', this.$data)
        }
    },
    computed:{

    }
}
</script>