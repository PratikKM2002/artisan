<!--template>
<div>
      <MainLayout />
      <v-main>
          hey
        </v-main>
</div>
</template>

<script>
import MainLayout from '@/views/Layout.vue'
  export default {
    components: {
    MainLayout
    }
  }
  </script!-->


<!--template>
<div>
      <MainLayout />
      <v-main>
        <v-container class="mr-10 ">
          <v-row  class="mt-16">
            <v-col cols="5">
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" class="grey--text" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="grey">mdi-currency-inr</v-icon>  {{Costamt}} </v-row>
                <v-row justify="center" class="mt-3  grey--text"> Monthly Expenses</v-row>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" class="grey--text" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="grey">mdi-currency-inr</v-icon>  {{Soldamt}} </v-row>
                <v-row justify="center" class="mt-3  grey--text"> Monthly Sales</v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" class="grey--text" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="grey">mdi-currency-inr</v-icon>{{ProfLoss}} </v-row>
                <v-row justify="center" class="mt-3  grey--text">Monthly Profit/Loss</v-row>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" class="grey--text" inline style="font-size: 60px;">{{Percent}}%<v-icon style="font-size: 57px;"> mdi-triangle</v-icon> </v-row>
                <v-row justify="center" class="mt-3  grey--text"> Percentage</v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        </v-main>
</div>
</template-->

<template>
<div>
      <MainLayout />
      <v-main>
        <v-container class="mt-10 mr-15 pa-10">
          <v-row  class="mt-16 ">
            <v-col cols="4" offset-md="2">
              <!--v-card-title> Material Cost</v-card-title-->
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="black">mdi-currency-inr</v-icon>  {{Costamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} </v-row>
                <v-row justify="center" class="mt-3"> Monthly Expenses</v-row>
              </v-card>
            </v-col>
            <v-col cols="4">
              <!--v-card-title> Employee Salary</v-card-title-->
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="black">mdi-currency-inr</v-icon>  {{Soldamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} </v-row>
                <v-row justify="center" class="mt-3"> Monthly Sales</v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" offset-md="2">
              <!--v-card-title> Percentage</v-card-title-->
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" inline style="font-size: 60px;"><v-icon style="font-size: 54px;" color="black">mdi-currency-inr</v-icon>{{ProfLoss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} </v-row>
                <v-row justify="center" class="mt-3">Monthly Profit/Loss</v-row>
              </v-card>
            </v-col>
            <v-col cols="4">
              <!--v-card-title> Total Profit/Loss</v-card-title-->
              <v-card class="elevation-9 pa-16" outlined tile> 
                <v-row justify="center" inline style="font-size: 60px;">{{Percent.toFixed(2)}}%<v-icon v-if="Percent>=0" style="font-size: 80px;" class="light-green--text pl-3"> fas fa-caret-up</v-icon><v-icon v-else style="font-size: 80px;" class="red--text pl-3"> fas fa-caret-down</v-icon> </v-row>
                <v-row justify="center" class="mt-3"> Percentage</v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        </v-main>
</div>
</template>


<script>
import MainLayout from '@/views/Layout.vue'
  export default {
    data: () => ({
      Costamt:'',
      Soldamt:'',
      ProfLoss:'',
      Percent:''
    }),
    components: {
    MainLayout
    },
    methods:{
      ReadCostAmt(){
        var that=this
        this.$http.get('/gain_loss/read1', {
            })
            .then(function (response) {
              console.log(response.data[0].CP)
                that.Costamt=response.data[0].CP
              })
            .catch(function (error) {
            console.log(error);
            });
      },
      ReadSoldAmt(){
        var that=this
        this.$http.get('/gain_loss/read2', {
            })
            .then(function (response) {
              console.log(response.data[0].SP)
                that.Soldamt=response.data[0].SP
              })
            .catch(function (error) {
            console.log(error);
            });
      },
      ReadProfLoss(){
        var that=this
        this.$http.get('/gain_loss/read3', {
            })
            .then(function (response) {
              console.log(response.data[0].ProfitLoss)
                that.ProfLoss=response.data[0].ProfitLoss
              })
            .catch(function (error) {
            console.log(error);
            });
      },
      ReadPercent(){
        var that=this
        this.$http.get('/gain_loss/read4', {
            })
            .then(function (response) {
              console.log(response.data[0].percentage)
                that.Percent=response.data[0].percentage
              })
            .catch(function (error) {
            console.log(error);
            });
      },
    },
    created(){
      this.ReadCostAmt();
      this.ReadSoldAmt();
      this.ReadProfLoss();
      this.ReadPercent();
    },
  }
  </script>

  <style scoped>
.myFont {
  font-family: 'Open Sans'; 
}
</style>