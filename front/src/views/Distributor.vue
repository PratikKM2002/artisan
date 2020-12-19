
<template>
  <div class="new">
      <div>
        <h1>Distributor</h1>
      <br>
      <h2><router-link to="/home">Home</router-link></h2>
      </div>
      <div> 
        <input type="text" name="DistributorName" v-model="input.DistributorName" placeholder="Distributor Name" /><br>
        <input type="tel" name="DistContactNum" v-model="input.DistContactNum" placeholder="Contact number" /><br>
        <input type="number" name="PresentOrder" v-model="input.PresentOrder" placeholder="Present Order"/><br>
        <button v-on:click="Insert()">Insert</button>
      </div>
      <router-view/>
    </div>
</template>

<style>
.new {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start ;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
export default {
     name: 'Dist',
        data() {
            return {
                input: {
                    DistributorName: "",
                    DistContactNum: "",
                    PresentOrder:""
                }               
            }
        },
        methods: {
            Insert() {
            /**
             * 1) import axios
             * 2) make post request with backend server
             */
            this.$http.post('/distributor/create', {
            DistributorName: this.input.DistributorName,
            DistContactNum: this.input.DistContactNum,
            PresentOrder: this.input.PresentOrder
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
            }
        }

}
</script>

