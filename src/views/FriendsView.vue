<template>
    <div class="View">
        <h1>Show Friends</h1>

        <table>
            <thead>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
            </thead>
            <tbody v-for="item,index in $store.state.friends"  :key="item">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }}</td>
                <button @click="deleteFriend(item.name)">Delete</button>
                <button @click="editFriend(item.id)">Edit</button>
            </tbody>
        </table>
        <br><br>
        <button @click="showFriends">Show Friends</button>
        <br><br>

        <h1>Add Friends</h1>
        <input type="text" name="name" id="name" placeholder="name" v-model="name">
        <br><br>
        <input type="text" name="age" id="age" placeholder="age" v-model="age">
        <br><br>
        <button @click="addFriends()">Add Friends</button>
        <br><br>

    </div>
</template>
<style>
table{
    margin-left: 42.8%;
    margin-right: 33%;
}
table,th,td{
    border: 1px solid;
}
button{
    margin: 5px;
}
</style>
<script>

export default{
    data(){
        return{
            name:null,
            age: null
        }
    },

    computed:{
        showFriends(){
            this.$store.dispatch('getFriends', this.$data)
        },
        
    },

    methods:{
        addFriends(){
            console.log(this.$data);
            this.$store.dispatch('friends', this.$data)
        },

        deleteFriend(name){
            this.$store.dispatch('deleteFriend', name)
        },

        editFriend(id){
            let edit = {
                id: id,
                name: this.name,
                age: this.age
            }
            this.$store.dispatch('editFriend', edit)
        }
    },

    mounted(){
        // this.showFriends    
    }
}
</script>