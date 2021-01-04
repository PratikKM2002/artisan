<!--<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SignIn />
  </div>
</template>-->

<template>
 
      <!--<router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>-->
    <router-view/>
 
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

<!--style lang="scss">
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
  </style-->


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
  #total{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:center;
  //margin-left: 400px;
  color: #2c3e50;
  margin-top: 60px;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(to bottom, #ffffff, rgb(218, 216, 216));
  background-color: white;
  height: 100vh;
  margin-bottom:70px
  }
  #total2{
  text-align:left;
  margin-left: 580px;
  line-height: 40px;
  //padding: 14px 28px;
  /*color: #2c3e50;
  margin-top: 60px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #f5f3f3, rgb(218, 216, 216));
  background-color: white;
  height: 100vh;*/
  }
  #tablepart
  {
    table{
     // width: 100%;
     justify-content:center;
     margin-bottom:50 px;
    align-items: center;
    }
    td{
      height:30 px;
    }
    th{
      width:250px; //180px;
      height:30px;
    }
    tr{
      background-color: rgb(212, 250, 177);
    }
    /*tr{
    border-radius: 20px;
    }*/
    th,td{ 
    border-radius: 5px;
    }
    margin-top: 80px;
    margin-left:370px;
    justify-content: center;
    th {
    //background-color:#7FD625;// #4CAF50;//
    background:#07c05e;//#05c960;// #009345;
    //background: linear-gradient(to bottom right, #7FD625, #009345);
    color: white;
    }
    tr:hover {background-color: #a7ecac;}
  }
  </style>