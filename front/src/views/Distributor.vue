
<template>
  <div class="new">
      <div>
        <h1>Distributor</h1>
      <br>
      <h2><router-link to="/home">Home</router-link></h2>
      </div>
      <div> 
      <h4>
        Distributor Name:<input type="text" name="DistributorName" v-model="input.DistributorName" /><br>
        Distributor Contact Number:<input type="tel" name="DistContactNum" v-model="input.DistContactNum"/><br>
        Present Order<input type="number" name="PresentOrder" v-model="input.PresentOrder" /><br>
        <button v-on:click="Insert()">Insert</button>
      </h4>
      </div>
      <div> 
      <h4>
        Old Distributor Name:<input type="text" name="OldDistributorName" v-model="input.OldDistributorName" /><br>
        New Distributor Name:<input type="text" name="NewDistributorName" v-model="input.NewDistributorName" /><br>
        <button v-on:click="Update()">Update</button>
      </h4>
      </div>
      <router-view/>

      <div> 
      <h4>
      Distributor Name:<input type="text" name="DDistributorName" v-model="input.DDistributorName" /><br>
      <button v-on:click="Delete()">Delete</button>
      </h4>
      </div>
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
                    PresentOrder:"",
                    OldDistributorName:"",
                    NewDistributorName:"",
                    DDistributorName:""
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
          },
            Update() {
            /**
             * 1) import axios
             * 2) make post request with backend server
             */
            this.$http.post('/distributor/update', {
            OldDistributorName: this.input.OldDistributorName,
            NewDistributorName: this.input.NewDistributorName
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
          },
          Delete() {
            /**
             * 1) import axios
             * 2) make post request with backend server
             */
            this.$http.post('/distributor/delete', {
            DDistributorName: this.input.DDistributorName
            
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

