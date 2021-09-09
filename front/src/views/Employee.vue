<template>
    <div>
      <MainLayout />
        <v-main>
            <v-data-table :headers="headers" :search="search" :items="Employee" item-key="emp_id" sort-by="emp_id" @item-expanded="loadDetails" single-expand show-expand :expanded.sync="expanded"  class="elevation-9 mt-15 ml-15 mr-15 mb-15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Employee</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                         <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by Name / ID" single-line hide-details class="mr-15"></v-text-field>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">New Employee</v-btn>
                            </template>
                            <v-card v-if="step==1">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <!--v-row-->
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.emp_name" label="Employee name"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.phone_no" label="Contact No"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.street_no" label="Street Number"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.street_name" label="Street Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.house_no" label="House Number"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field outlined dense v-model="editedItem.salary" label="Salary"></v-text-field>
                                            </v-col>
                                        <!--/v-row-->
                                   </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                     <v-btn color="blue darken-1" text @click="check(),step++">Next</v-btn>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-card v-if="step==2">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                      <!-- TABLE TO ENTER / EDIT PRODUCT DETAILS REGARDING THE ORDER IN THE FORM -->
                                        <v-data-table :headers="headers3" :items="Products" class="elevation-9 mt-12 mb-8 mr-9 ml-9" hide-default-footer>
                                            <template v-slot:[`item.number`]="{ index }">
                                                {{index+1}} <!-- SL.NO -->
                                            </template>
                                            <template v-slot:[`item.name`]={item}>
                                              <v-autocomplete v-if="editedIndex==-1 ||  item.flag==true" v-model="item.product_name" class="mt-5" dense outlined :items="prod_names" ></v-autocomplete> <!-- USED WHILE ENTERING A PRODUCT -->
                                              <v-text-field v-else v-model="item.product_name" class="mt-5" dense outlined disabled></v-text-field><!-- USED WHEN YOU ONLY WANT TO UPDATE THE QUANTITY OF ANN EXISTING PRODUCT -->
                                            </template>
                                            <template v-slot:[`item.qty`]={item}>
                                            <v-text-field v-model="item.prod_count" class="mt-5" dense outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.actions`]>
                                              <v-icon rounded class="mb-1" small color="red" @click="deleteProd(item)">mdi-minus</v-icon> <!-- USED TO DELETED A ROW FROM THE INSERT / EDIT FORM -->
                                            </template>
                                            <!-- WHAT TO DISPLAY IF THERE ARE NO PRODUCTS -->
                                            <template v-slot:no-data>
                                              Employee hasn't made any items
                                            </template>
                                          </v-data-table>
                                <template>
                                  <!--- TO ADD A NEW PRODUCT ENTRY ROW -->
                                <v-btn absolute right small elevation="2" @click="addprod"><v-icon> mdi-plus</v-icon></v-btn>
                                </template>
                                    </v-container>
                                  </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="step--">Previous</v-btn> <!--GO TO THE PREVIOUS WINDOW -->
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
                                </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="505px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete the details of this employee?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:expanded-item="{ item }"> 
                  <td :colspan="3">
                    <v-data-table :headers="headers2" :items="Prod" class="elevation-9 mt-12 mb-8 mr-15 ml-15" hide-default-footer> 
                      <template v-slot:top>
                      <v-toolbar flat>
                      <v-toolbar-title>Employee {{item.emp_id}} Details</v-toolbar-title>
                      </v-toolbar>
                      </template>
                      <template v-slot:no-data>
                        Order contains no items
                      </template>
                      <template v-slot:footer>
                        <v-toolbar flat height="20px"><v-toolbar-title> </v-toolbar-title></v-toolbar><!-- TO GIVE SOME SPACE AT THE END -->
                      </template>
                    </v-data-table>
                  </td>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small color="primary" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="Read">Reset</v-btn>
                </template>
            </v-data-table>
        </v-main>
    </div>
</template>

<script>
import MainLayout from '@/views/Layout.vue'
  export default {
    data: () => ({
    prod_names:[],      //array containing the names of all the products
    flag1:false,
    on:'',
    attrs:'',
    step:1,
    modal2: false,      //check condition to know if the row has expanded or not
    search:'',
    expanded: [],       //used when the rows are expanded
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Employee ID',
          align: 'center',
          value: 'emp_id',
          width:"140px"
        }, 
        {
          text: 'Employee Name',
          align: 'center',
          //sortable: false,
          value: 'emp_name',
        },       
        { text: 'Contact No.', value: 'phone_no',sortable: false,filterable:false,align: 'center', },
        { text: 'Street Number', value: 'street_no',sortable: false,filterable:false,align: 'center', },
        { text: 'Street Name', value: 'street_name',sortable: false,filterable:false, align: 'center',},        
        { text: 'House Number', value: 'house_no',filterable:false,align: 'center', },
        { text: 'Salary', value: 'salary',filterable:false,align: 'center', },
        { text: 'Actions', value: 'actions', sortable: false,filterable:false,align: 'center', },
        { text: '', value: 'data-table-expand' },
      ],
       headers2: [
        {
          text: 'Product',
          align: 'center',
          value: 'product_name',filterable:false,sortable: false,
        },       
        { text: 'Count', value: 'prod_count',filterable:false,sortable: false,align: 'center', },
      ],
      //column headers for the product entry table
      headers3: [
        {
          text: 'Sl.no',
          align: 'center',
          value:'number',
          filterable:false,sortable: false,
        },       
        { text: 'Product',value:'name',filterable:false,sortable: false,align: 'center', },
        { text: 'Count',value:'qty',sortable: false,filterable:false,align: 'center', },
        { text: '', value: 'actions', sortable: false,filterable:false, },
      ],
      Products:[],
      Employee: [],
      Prod: [],   
      editedIndex: -1,
      editedItem: {
        emp_id:'',
        emp_name:'',
        phone_no: '',
        street_no: '',
        street_name:'',
        house_no:'',
        salary:'',
      },
      defaultItem: {
        emp_id:'',
        emp_name:'',
        phone_no: '',
        street_no: '',
        street_name:'',
        house_no:'',
        salary:'',
      },
    }),
    components: {
    MainLayout
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.Read();
      this.loadNameDetails();  
    },
    methods: {
       initialize(){
        if(this.editedIndex==-1)
          this.Products=[];
      },
      addprod(){
        var product= new Object();
        product.product_name='';
        product.prod_quantity='';
         if(this.editedIndex!=-1 )
          product.flag=true     // to add a new product to the order while editing
        this.Products.push(product)
      },
       loadDetails({item}){
          if(this.modal2==true){
            this.Prod=[]
            this.modal2=false;
            return;
          }
          else{
            this.modal2=true;
          }
          var that=this;
          this.$http.post('/joined/read3', {
            EmployeeID: item.emp_id
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                that.Prod.push(response.data[i]);
              }
              console.log("items")
            console.log(that.Prod);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
            loadNameDetails(){
              var that=this;
              //reads the product names
              this.$http.get('/products/read1', {
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                that.prod_names.push(response.data[i].product_name);
              }
            console.log("Names");
            console.log(that.prod_names);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
        Read(){
              //to read the table contents
              var that=this;
              this.$http.get('/employee/read', {
            })
            .then(function (response) {
              //if it's being read for the first time
              for(var i=0;i<response.data.length;i++){
                that.Employee.push(response.data[i]);
              }
            console.log(that.Employee);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
        check(){
              console.log("check")
              console.log(this.Products)
              if(this.step==1 && this.Products.length==0 && this.editedIndex!=-1){   //to display the products in an order while an order if being edited
                 this.Products=this.Prod.slice()
                this.modal2=false
                 this.Prod=[]
              }
              else if(this.step==1 && this.Products.length==0){ 
                //alert("here")     // default if a new order is being entered
            var product= new Object();
            product.product_name='';
            product.prod_quantity='';
                this.Products.push(product)
              }
            },
      
      editItem (item) {
        this.Products=[]
        this.loadDetails({item})
        this.editedIndex = this.Employee.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteProd(item){
         var index = this.Products.indexOf(item)
       this.Products.splice(index, 1)
       if(this.editedIndex!=-1){
         this.DeleteProduct(this.editedItem.emp_id)
       }
      },
      deleteItem (item) {
        this.editedIndex = this.Employee.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.Employee.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        if(this.modal2==true){
          this.Prod=[]
          this.modal2=false
        }
        this.dialog = false
        this.step=1
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
        this.Delete(this.editedItem.emp_id)
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
         this.step=1
        if (this.editedIndex > -1) {
          Object.assign(this.Employee[this.editedIndex], this.editedItem)
          this.Update(this.Employee[this.editedIndex]);
        } else {
          this.Employee.push(this.editedItem)
          this.Insert(this,this.editedItem);
        }
        this.close()
      },
       DeleteProduct(id){
        this.$http.post('/joined/delete3', {
            DEmpID: id
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
      },
      //loop to ensure that all the products are inserted
      Intermediate(that,id){
        for(var i=0;i<that.Products.length;i++)
            that.InsertProd(id,that.Products[i]) 
      },
      //inserting each product
      InsertProd(id,pro){
        this.$http.post('/joined/create3', {
          EmployeeID: id,
          ProductName:pro.product_name,
          ProductCount:pro.prod_count
        }).then(function (response) {
          console.log(response)
        }).catch(function (error) {
            console.log(error);
            });
      },
      //loop to ensure that all the products are updated
      IntermediateUpd(that,id){
        for(var i=0;i<that.Products.length;i++)
            that.UpdateProd(id,that.Products[i]) 
      },
      UpdateProd(id,pro){
       var that=this
        this.$http.post('/joined/update3', {
          EmployeeID: id,
          NewProductName:pro.product_name,
          NewProductCount:pro.prod_count
        }).then(function (response) {
          console.log(response)
          if(response.data.affectedRows==0)   // this implies thst that particular order didn't originally exists i.e. it has been newly added
            that.InsertProd(id,pro)
        }).catch(function (error) {
            console.log(error);
            });
      },
      Delete(Empid) {
            /** 
             * to delete a record
             * hasn't been properly modified yet
             */ 
            //alert(Distributorid);
            this.$http.post('/employee/delete', {
            DEmpId: Empid
            
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
            //this.remove(Distributorid);
          },
      Insert(thisold,Emp) {
            /**
             *  to insert a record
             */
            //this.seen=false;
            var that=this;
            this.$http.post('/employee/create', {
              EmployeeName: Emp.emp_name,
              EPhoneNum: Emp.phone_no,
              StreetNumber: Emp.street_no,
              StreetName: Emp.street_name,
              HouseNumber: Emp.house_no,
              Salary: Emp.salary
            })
            .then( function (response) {
            console.log('success');
            console.log(response);
             thisold.editedItem.emp_id=response.data[0].ID;
             that.Employee[that.Employee.length-1].emp_id=response.data[0].ID;
              that.Intermediate(that,response.data[0].ID) 
            //alert('Successfully inserted!');
            //document.getElementById("tablepart").deleteRow(-1);
            //that.Read();
            })
            .catch(function (error) {
              alert(error);
            console.log(error);
            });
          },
      Update(Emp) {
              
            /**
             * 1) to update a record
             * 2) hasn't been implemented properly yet
             */
            var that=this
            this.$http.post('/employee/update', {
            EmployeeID: Emp.emp_id,
            NewEmployeeName: Emp.emp_name,
            ENewPhoneNum: Emp.phone_no,
            NewStreetNumber: Emp.street_no,
            NewStreetName: Emp.street_name,
            NewHouseNumber: Emp.house_no,
            NewSalary: Emp.salary,
            
            })
            .then(function (response) {
            console.log('success');
            that.IntermediateUpd(that,Emp.emp_id);
            })
            .catch(function (error) {
            console.log(error);
            });
          },
  }
  }
</script>