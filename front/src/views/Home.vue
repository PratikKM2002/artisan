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
    <router-link to="/RawMaterial"><button class="btn rm"> RAW MATERIAL </button></router-link>
    <router-link to="/about"><button class="btn em"> EMPLOYEE </button></router-link>
    <router-link to="/distributor"><button class="btn dis">DISTRIBUTOR </button></router-link>
    <router-link to="/products"><button class="btn prod">PRODUCTS</button></router-link>
    <router-link to="/about"><button class="btn ord">ORDERS</button></router-link>
    <router-link to="/about"><button class="btn gl">GAINLOSS</button></router-link>
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
  //background-color:#02e46b;
  border-radius: 20px;
  background: linear-gradient(to bottom right, #7FD625, #009345);
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  width: 180px;
  margin-top: 120px;
  //margin: 20px;
  //left: 200px;
  color:white;// green;
  //box-shadow: 0 4px #999;
  /*transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;*/
}
.rm {
  position: absolute;
  top: 200px;
  left: 50px;
  margin-top: 120px;
  //color: green;
}
.em {
  position: absolute;
  top: 200px;
  left: 280px;
  margin-top: 120px;
  //color: green;
}
.dis {
  position: absolute;
  top: 200px;
  left: 480px;
  margin-top: 120px;
  //color: green;
}
.prod {
  position: absolute;
  top: 200px;
  left: 700px;
  margin-top: 120px;
  //color: green;
}
.ord {
  position: absolute;
  top: 200px;
  left: 900px;
  margin-top: 120px;
  //color: green;
}
.gl {
  position: absolute;
  top: 200px;
  left: 1080px;
  margin-top: 120px;
  //color: green;
}

/*.btn:hover {background: #eee;}

.success {color: green;}
.info {color: dodgerblue;}
.warning {color: orange;}
.danger {color: red;}
.default {color: black;}*/
</style>


