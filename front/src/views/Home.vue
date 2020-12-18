<!--template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script-->


<template>
    <div>
    <div class="new2" >
    <router-link to="/"><h5>Logout</h5></router-link>
    </div>  
    <div class="new">
    <h1>HOME PAGE</h1><br>
    <button class="btn rm"> RAW MATERIAL </button>
    <button class="btn em"> EMPLOYEE </button>
    <button class="btn dis">DISTRIBUTOR </button>
    <button class="btn prod">PRODUCTS</button>
    <button class="btn ord">ORDERS</button>
    <button class="btn gl">GAINLOSS</button>
    </div>
    <router-view/>
</div>

</template>

<style lang="scss" scoped>
 .new {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start ;
  color: #2c3e50;
  margin-top: 60px;
}
  body {
    margin: 0;
    padding: 0;
  }
  /*.new {
    font-family: Tahoma;
    font-size: 1.6rem;
    color: rgb(165, 148, 148);
    background-color: #092525;
    height: 100vh;
    display: flex;
    justify-content: left;
    align-items: normal;
  }*/

  .new {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start ;
  color: #ffffff;
  margin-top: 60px;
  justify-content: left;
  align-items: normal;
  height: 100vh;
  }
  .new2 {
     a {
    font-weight: normal;
    color: #050607;
  }
    font-family: Tahoma;
    font-size: 18px;
    color: rgb(14, 13, 13);
    position: absolute;
    top: 0px;
    right: 16px;
  }
 

/*.btn {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}*/

.btn {
  border: none;
  background-color:white;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 200px;
  left: 80px;
}
.rm {
  position: absolute;
  top: 200px;
  left: 50px;
  margin-top: 120px;
  color: green;
}
.em {
  position: absolute;
  top: 200px;
  left: 280px;
  margin-top: 120px;
  color: green;
}
.dis {
  position: absolute;
  top: 200px;
  left: 480px;
  margin-top: 120px;
  color: green;
}
.prod {
  position: absolute;
  top: 200px;
  left: 700px;
  margin-top: 120px;
  color: green;
}
.ord {
  position: absolute;
  top: 200px;
  left: 900px;
  margin-top: 120px;
  color: green;
}
.gl {
  position: absolute;
  top: 200px;
  left: 1080px;
  margin-top: 120px;
  color: green;
}

/*.btn:hover {background: #eee;}

.success {color: green;}
.info {color: dodgerblue;}
.warning {color: orange;}
.danger {color: red;}
.default {color: black;}*/
</style>


