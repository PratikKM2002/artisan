<!--template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template-->


<template>
  <div class="new">
      <div>
        <h1>This is an about page</h1>
      <br>
      <h2><router-link to="/home">Home</router-link></h2>
      </div>
      <router-view/>
    </div>
</template>

<style lang="scss" scoped>
 .new {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center ;
  color: #2c3e50;
  margin-top: 60px;
}
  body {
    margin: 0;
    padding: 0;
  }
  .new {
    font-family: Tahoma;
    font-size: 1.6rem;
    color: rgb(165, 148, 148);
    background-color: #092525;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>