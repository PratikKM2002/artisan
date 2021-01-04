<template>
<div id="total" >
  <div >
      <div>
        <h1>Employee Details</h1>
      </div>
      <div class="new3">
      <button v-on:click="addRow()" >Create Employee <i class="fas fa-arrow-alt-circle-right"></i></button>
      </div>
      <table id="tablepart">    
        <tr>
          <th> </th>
          <th> </th>
          <th> </th>
          <th> </th>
        </tr>
          <tr v-for='emp in Employee' :key="emp.Employee_id" >
            <td>{{ emp.EmployeeName }}</td>
            <td>{{ emp. }}</td>
            <td>{{ dist.order_id }}</td>
            <td><div class="new5"><button @click="UpdMsg()" class="upd1"><i class="fas fa-edit"></i></button><button @click="DelMsg()" class="upd2"><i class="fas fa-trash"></i></button></div></td>
        </tr>
        </table>
        <div class="new6" v-if="seen"><button v-on:click="Insert()" class="btn in" >Insert</button></div>
      </div>
      <router-view/>
      </div>
</template>


<script>

export default {
     name: 'Dist',
        data() {
            return {
                Distributor: [],
                flag: 'true',
                seen: false,
                input: {
                    ele1:" ",
                    ele2:" ",
                    ele3:" ",
                    DistributorName: "",
                    DistContactNum: "",
                    PresentOrder:"",
                    OldDistributorName:"",
                    NewDistributorName:"",
                    DDistributorName:""
                }               
            }
        },
        mounted(){
          //to mount on the page
            this.Read();
        },
        methods: {
            UpdMsg() {
              //just checking
              alert('Update');
            },
            DelMsg() {
              //just checking
              alert('Delete');
            },
            Insert() {
            /**
             *  to insert a record
             */
            this.seen=false;
            var that=this;
            this.$http.post('/distributor/create', {
              DistributorName: document.getElementById(this.input.ele1).value,
              DistContactNum: document.getElementById(this.input.ele2).value,
              PresentOrder: document.getElementById(this.input.ele3).value
            })
            .then( function (response) {
            console.log('success');
            console.log(response);
            alert('Successfully inserted!');
            document.getElementById("tablepart").deleteRow(-1);
            that.Read();
            })
            .catch(function (error) {
              alert(error);
            console.log(error);
            });
          },
            Read(){
              //to read the table contents
              var that=this;
              this.$http.get('/distributor/read', {
            })
            .then(function (response) {
              //if it's being read for the first time
            if( that.flag == 'true'){
              for(var i=0;i<response.data.length;i++){
                that.Distributor.push(response.data[i]);
              }
             that.flag='false';
            }
            else{
              //only push the last row
              that.Distributor.push(response.data[response.data.length-1]);
            }
            console.log(that.Distributor);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
            /*Update() {
            /**
             * 1) to update a record
             * 2) hasn't been implemented properly yet
             //
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
          },*/
          Delete() {
            /** 
             * to delete a record
             * hasn't been properly modified yet
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
          },
        addRow() { 
        this.seen=true; 
        var table = document.getElementById("tablepart");  
        var rowCount = table.rows.length;  
        var row = table.insertRow(-1);  
        var cell1 = row.insertCell(0);   
        var element1 = document.createElement("input");  
        element1.id= "cell1" + rowCount;
        element1.type = "text";  
        element1.name="DistributorName"; 
        cell1.appendChild(element1);    
        var cell2 = row.insertCell(1); 
        var element2 = document.createElement("input");
        element2.id= "cell2" + rowCount;
        element2.type = "tel";  
        element2.name="DistContactNum";
        cell2.appendChild(element2); 
        var cell3 = row.insertCell(2);  
        var element3 = document.createElement("input");  
        element3.id= "cell3" + rowCount;
        element3.type = "number";  
        element3.name="PresentOrder";
        cell3.appendChild(element3);
        row.insertCell(3); 
        this.input.ele1=element1.id;
        this.input.ele2=element2.id;
        this.input.ele3=element3.id;
        }
    }     
}
</script>

<style lang="scss" scoped>
.new4{
 width: 70px;
}
.new5{
  display: inline;
}
.new3{
  text-align: right;
  height:20px;
  margin-right:250px;
  position:relative;
}
.new6{
  height:50px;
}
.new7{
  position:relative;
  margin-right: 50px;
}
.btn {
  border: none;
  border-radius: 20px;
  background: linear-gradient(to bottom right, #7FD625, #009345);
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  display:inline-block;
  position: absolute;
  width: 75px;
  margin-top: 40px;
  color:white;
}
.in {
  //for insert
  margin-top:5px;
  left: 900px;
  margin-bottom: 10px;
}
.upd1{
  //for the edit symbol
  position:relative;
  right:10px;
}
.upd2{
  //for the delete symbol
  position:relative;
  left:10px;
}
</style>