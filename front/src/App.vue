<!--<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SignIn />
  </div>
</template>-->

<template>
 <div id="app">
      <!--<router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>-->
    <router-view/>
 </div>
</template>

<!--<template>
  <div class="app">
    helllloooo!!!
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>-->

<!--<script>
import SignIn from './components/SignUp.vue'
export default {
  name: 'app',
  components: {
    SignIn
  }
}
</script>-->

<script>
import SignIn from './components/signUp.vue'
//import Homee from './views/Home.vue'

    export default {
        name: 'app',
        /*components: {
            SignIn
        },
        /*name: 'new',
        components: {
            Homee
        },*/
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "abcd@gmail.com",
                    password: "password"
                }
            }
        }
    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Tahoma;
    font-size: 1.6rem;
    color: rgb(5, 5, 5);
    background-color: #092525;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>