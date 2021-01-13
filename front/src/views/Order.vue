<template>
    <div>
      <MainLayout />
        <v-main>
          <!-- THE MAIN TABLE -->
            <v-data-table :headers="headers" :search="search" :items="Orders" item-key="order_id" @item-expanded="loadDetails" single-expand show-expand :expanded.sync="expanded" class="elevation-9 mt-15 ml-15 mr-15 mb-15">   
                <template v-slot:top>
                    <v-toolbar flat>
                      <!-- THE TITLE OF THE MAIN TABLE -->
                        <v-toolbar-title>Orders</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <!-- THE SEARCH BAR -->
                         <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by Name / ID" single-line hide-details class="mr-15"></v-text-field>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on,attrs }">
                              <!--BUTTON TO CREATE A NEW ORDER -->
                                <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on" @click="initialize" >New Order</v-btn>
                            </template>
                            <!-- THE FIRST WINDOW DISPLAYED IN THE EDIT/INSERT FORM -->
                            <v-card v-if="step==1">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span> <!-- formTitle will be either NEW ORDER / EDIT ORDER --> 
                                </v-card-title>
                                <v-card-text class="mt-7">
                                    <v-container>
                                            <v-col v-if="editedIndex!=-1" cols="5" >
                                                <v-text-field dense disabled outlined v-model="editedItem.order_id" label="Order ID"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-autocomplete dense :items="dist_names" outlined v-model="editedItem.distributor_name" label="Distributor Name"></v-autocomplete>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field dense outlined v-model="editedItem.order_status" label="Order Status"></v-text-field>
                                            </v-col>
                                            <v-col cols="5" >
                                                <v-text-field dense outlined v-model="editedItem.total_amt" label="Total Amount"></v-text-field>
                                            </v-col>
                                            <v-col cols="5">
                                                  <v-text-field disabled dense v-model="editedItem.date_placed" label="Date Placed" outlined readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </v-col>
                                            <v-col cols="5">
                                              <!-- TO SELECT THE DATE ON WHICH IT WAS DELIVERED -->
                                              <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="editedItem.date_delivered" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                  <v-text-field outlined dense v-model="editedItem.date_delivered" label="Date Delivered" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="editedItem.date_delivered" scrollable>
                                                  <v-spacer></v-spacer>
                                                  <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn> <!-- UNSELECT THE DATE JUST CHOSEN -->
                                                  <v-btn text color="primary" @click="$refs.dialog1.save(editedItem.date_delivered)">OK</v-btn> <!-- SAVE THE DATE CHOSEN TO THE RESPECTIVE BINDED VARIABLE -->
                                                </v-date-picker>
                                              </v-dialog>
                                            </v-col>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="check(),step++">Next</v-btn><!-- GO TO THE NEXT WINDOW -->
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn><!-- CANCEL THE INSERT / DELETE -->
                                </v-card-actions>
                            </v-card>
                            <!-- THE WINDOW CONTAINING THE PRODUCT DETAILS OF THE ORDER -->
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
                                              <v-autocomplete v-if="editedIndex==-1 ||  flag1==true" v-model="item.product_name" class="mt-5" dense outlined :items="prod_names" ></v-autocomplete> <!-- USED WHILE ENTERING A PRODUCT -->
                                              <v-text-field v-else v-model="item.product_name" class="mt-5" dense outlined disabled></v-text-field><!-- USED WHEN YOU ONLY WANT TO UPDATE THE QUANTITY OF ANN EXISTING PRODUCT -->
                                            </template>
                                            <template v-slot:[`item.qty`]={item}>
                                            <v-text-field v-model="item.prod_quantity" class="mt-5" dense outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.actions`]>
                                              <v-icon rounded class="mb-1" small color="red" @click="deleteProd(item)">mdi-minus</v-icon> <!-- USED TO DELETED A ROW FROM THE INSERT / EDIT FORM -->
                                            </template>
                                            <!-- WHAT TO DISPLAY IF THERE ARE NO PRODUCTS -->
                                            <template v-slot:no-data>
                                              Order contains no items
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
                              <!-- CONFIRMATION FOR DELETION -->
                                <v-card-title class="headline">Are you sure you want to delete this order?</v-card-title>
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
                <!-- ON EXPANDING A ROW -->
                <template v-slot:expanded-item="{ item }"> 
                  <td :colspan="3">
                    <v-data-table :headers="headers2" :items="Prod" class="elevation-9 mt-12 mb-8 mr-15 ml-15" hide-default-footer> 
                      <template v-slot:top>
                      <v-toolbar flat>
                      <v-toolbar-title>Order {{item.order_id}} Details</v-toolbar-title>
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
                <template v-slot:[`item.date_delivered`]="{ item }">
                    <span v-if="item.date_delivered==null">Pending... </span> <!-- IF THE ORDER IS YET TO BE DELIVERED THEN o/p PENDING.. -->
                    <span v-else>{{item.date_delivered}}</span>
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
    dist_names:[],      //array containing the names of all the distributors
    prod_names:[],      //array containing the names of all the products
    on:'',
    attrs:'',
    step:1,
    modal2: false,      //check condition to know if the row has expanded or not
    modal1: false,      //flag to know if the the date picker(calendar) should be opened or not
    flag1:false,        //flag to know if we are editing an order and if we have to add another product
    expanded: [],       //used when the rows are expanded
    search:'',          //used by the search bar
      dialog: false,                //flag used to activate and deactivate the Insert/Edit form
      dialogDelete: false,          //flag used to activate and deactivate the delete dialog
      //column headers for the main table
      headers: [
        {
          text: 'Order ID',
          align: 'start',
          value: 'order_id',
          width:"150px"
        },   
        { text: 'Distributor Name', value: 'distributor_name',sortable: false,width:"200px" }, 
        { text: 'Total Amount', value: 'total_amt',sortable: false,filterable:false, },   
        { text: 'Order Status', value: 'order_status',filterable:false,width:"200px"},
        { text: 'Date Placed', value: 'date_placed',sortable: false,filterable:false,},
        { text: 'Date Delivered', value: 'date_delivered',sortable: false,filterable:false,},
        { text: 'Actions', value: 'actions', sortable: false,filterable:false, },
        { text: '', value: 'data-table-expand' },
      ],
      //column headers for the expanded table
      headers2: [
        {
          text: 'Product',
          align: 'start',
          value: 'product_name',filterable:false,sortable: false,
        },       
        { text: 'Quantity', value: 'prod_quantity',filterable:false,sortable: false, },
        { text: 'Amount', value: 'amt',sortable: false,filterable:false, },
      ],
      //column headers for the product entry table
      headers3: [
        {
          text: 'Sl.no',
          align: 'start',
          value:'number',
          filterable:false,sortable: false,
        },       
        { text: 'Product',value:'name',filterable:false,sortable: false, },
        { text: 'Qty',value:'qty',sortable: false,filterable:false, },
        { text: '', value: 'actions', sortable: false,filterable:false, },
      ],
      Products:[],      //contains the products that is displayed in the order form
      Orders: [],
      Prod: [],         //contains the products that is displayed on expanding
      editedIndex: -1,
      editedItem: {
        order_id:'',
        order_status:'',
        total_amt: '',
        distributor_name: '',
        date_placed:new Date().toISOString().substr(0, 10),       //to append the current date
        date_delivered:'',
      },
      defaultItem: {
        order_id: '',
        order_status:'',
        total_amt: '',
        distributor_name: '',
        date_placed:new Date().toISOString().substr(0, 10),
        date_delivered:'',
      },
    }),
    components: {
    MainLayout
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
      },
    },
    watch: {
      dialog (val) {
        val  || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.Read();                  //to load all the order details onto the table
      this.loadNameDetails();       //to load all the product and distributor names for the dropdown boxes
    },
    methods: {
      // called everytime a new order is placed to keep the default as no products
      initialize(){
        if(this.editedIndex==-1)
          this.Products=[];
      },
      // called when you want to add a new product
      addprod(){
    // to add a new product to the order while editing
        var product= new Object();
        product.product_name='';
        product.prod_quantity='';
        if(this.editedIndex!=-1) 
          this.flag=true
        this.Products.push(product)
      },
      //to load all the product details on expanding
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
          this.$http.post('/joined/read1', {
            OrderID: item.order_id
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
            //to load all the product and distributor names for the dropdown boxes
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
            //reads the distributor names
            this.$http.get('/distributor/read1', {
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                that.dist_names.push(response.data[i].distributor_name);
              }
            console.log("Names");
            console.log(that.dist_names);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
            //to load all the order details onto the table
            Read(){
              var that=this;
              this.$http.get('/order/read', {
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                var date_placed=new Date(response.data[i].date_placed)
                that.Orders.push(response.data[i]);
                that.Orders[i].date_placed=date_placed.toLocaleString('fr-CA').substr(0, 10)   // to obtain only the date
                if(that.Orders[i].date_delivered!=null){   // only if the date delivered has been specified
                  var date_delivered=new Date(response.data[i].date_delivered)
                  that.Orders[i].date_delivered=date_delivered.toLocaleString('fr-CA').substr(0, 10)
                }
              }
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
              else if(this.step==1 && this.Products.length==0){      // default if a new order is being entered
            var product= new Object();
            product.product_name='';
            product.prod_quantity='';
                this.Products.push(product)
              }
            },
      
      editItem (item) {
        this.Products=[]
        this.loadDetails({item})
        this.editedIndex = this.Orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log("editItem")
        console.log(this.Prod)
        console.log(this.Products)
        this.dialog = true
      },
      //to delete a product in an order
      deleteProd(item){
         var index = this.Products.indexOf(item)
       this.Products.splice(index, 1)
       if(this.editedIndex!=-1){
         this.DeleteProduct(this.editedItem.order_id)
       }
      },
      //to delete an order
      deleteItem (item) {
        this.editedIndex = this.Orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.Orders.splice(this.editedIndex, 1)
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
        this.Delete(this.editedItem.order_id)
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
       save () {
         this.step=1
        if (this.editedIndex > -1) {
          Object.assign(this.Orders[this.editedIndex], this.editedItem)
          this.Update(this.Orders[this.editedIndex]);
        } else {
         this.Orders.push(this.editedItem)
          this.Insert(this,this.editedItem)
        }
        this.close()
      },
      // to delete a particular product in the order
      DeleteProduct(id){
        this.$http.post('/joined/delete', {
            DOrderID: id
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
        this.$http.post('/joined/create1', {
          OrderID: id,
          ProductName:pro.product_name,
          ProductQty:pro.prod_quantity
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
       //updating each product
      UpdateProd(id,pro){
       var that=this
        this.$http.post('/joined/update1', {
          OrderID: id,
          NewProductName:pro.product_name,
          NewProductQty:pro.prod_quantity
        }).then(function (response) {
          console.log(response)
          if(response.data.affectedRows==0)   // this implies thst that particular order didn't originally exists i.e. it has been newly added
            that.InsertProd(id,pro)
        }).catch(function (error) {
            console.log(error);
            });
      },
      // to delete an order
      Delete(Orderid) {
            this.$http.post('/order/delete', {
            DOrderID: order_id
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
          },
        // to insert an order
      Insert(thisold,ord) {
            var that=this;
            if(ord.date_delivered=='')
              ord.date_delivered=null
            this.$http.post('/order/create', {
              OrderStatus: ord.order_status,
              TotalAmt:ord.total_amt,
              DistributorName: ord.distributor_name,
              DatePlaced: ord.date_placed,
              DateDelivered: ord.date_delivered
            })
            .then( function (response) {
            console.log(response);
            thisold.editedItem.order_id=response.data[0].ID;
            console.log(thisold.editedItem.order_id)
            that.Orders[that.Orders.length-1].order_id=response.data[0].ID;   // to append the last inserted ID
            that.Intermediate(that,response.data[0].ID)       // function called to insert the products
            })
            .catch(function (error) {
              alert(error);
            console.log(error);
            });
          },
          // to update an order
      Update(ord) {
            var that=this
            this.$http.post('/order/update', {
            OrderID: ord.order_id,
            NewOrderStatus: ord.order_status,
            NewTotalAmount: ord.total_amt,
            NewDistributorName: ord.distributor_name,
            NewDatePlaced: ord.date_placed,
            NewDateDelivered: ord.date_delivered,
            
            })
            .then(function (response) {
            console.log('success');
            that.IntermediateUpd(that,ord.order_id);
            })
            .catch(function (error) {
            console.log(error);
            });
          },
  }
  }
</script>