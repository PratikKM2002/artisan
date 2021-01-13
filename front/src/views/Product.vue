<template>
    <div>
      <MainLayout />
        <v-main>
            <v-data-table :headers="headers" :items="Product" :search="search"  sort-by="product_id" item-key="product_id" @item-expanded="loadDetails" single-expand show-expand :expanded.sync="expanded" class="elevation-9 mt-15 ml-15 mr-15 mb-15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Products</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by Name / ID" single-line hide-details class="mr-15"></v-text-field>
                        <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on" @click="initialize">New Product</v-btn>
                            </template>
                            <v-card v-if="step==1">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                            <v-col v-if="editedIndex!=-1" cols="8" >
                                                <v-text-field dense disabled outlined v-model="editedItem.product_id" label="Product ID"></v-text-field>
                                            </v-col>
                                            <v-col cols="8" >
                                                <v-text-field outlined dense v-model="editedItem.product_name" label="Product name"></v-text-field>
                                            </v-col>
                                            <v-col cols="8" >
                                                <v-text-field outlined dense v-model="editedItem.product_price" label="Product Price"></v-text-field>
                                            </v-col>
                                            <v-col cols="8" >
                                                <v-text-field outlined dense v-model="editedItem.quantity_made" label="Quantity Made"></v-text-field>
                                            </v-col>
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
                                      <v-data-table :headers="headers3" :items="Materials" class="elevation-9 mt-12 mb-8 mr-9 ml-9" hide-default-footer>
                                            <template v-slot:[`item.number`]="{ index }">
                                                {{index+1}} <!-- SL.NO -->
                                            </template>
                                            <template v-slot:[`item.name`]={item}>
                                              <v-autocomplete v-if="editedIndex==-1  || item.flag==true" v-model="item.material_name" class="mt-5" dense outlined :items="rawmat_names" ></v-autocomplete> <!-- USED WHILE ENTERING A PRODUCT -->
                                              <v-text-field v-else v-model="item.material_name" class="mt-5" dense outlined disabled></v-text-field><!-- USED WHEN YOU ONLY WANT TO UPDATE THE QUANTITY OF ANN EXISTING PRODUCT -->
                                            </template>
                                            <template v-slot:[`item.qty`]={item}>
                                            <v-text-field v-model="item.mat_count" class="mt-5" dense outlined></v-text-field>
                                            </template>
                                            <template v-slot:[`item.actions`]>
                                              <v-icon rounded class="mb-1" small color="red" @click="deleteMat(item)">mdi-minus</v-icon> <!-- USED TO DELETED A ROW FROM THE INSERT / EDIT FORM -->
                                            </template>
                                            <!-- WHAT TO DISPLAY IF THERE ARE NO PRODUCTS -->
                                            <template v-slot:no-data>
                                              Raw materials for product aren't mentioned
                                            </template>
                                            </v-data-table>
                                            <template>
                                  <!--- TO ADD A NEW PRODUCT ENTRY ROW -->
                                <v-btn absolute right small elevation="2" @click="addmat"><v-icon> mdi-plus</v-icon></v-btn>
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
                        <v-dialog v-model="dialogDelete" max-width="535px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete this product?</v-card-title>
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
                  <td :colspan="2">
                    <v-data-table :headers="headers2" :items="Mat" class="elevation-9 mt-12 mb-8 mr-15 ml-15" hide-default-footer> 
                      <template v-slot:top>
                      <v-toolbar flat>
                      <v-toolbar-title>Product {{item.product_id}} Details</v-toolbar-title>
                      </v-toolbar>
                      </template>
                      <template v-slot:no-data>
                        Raw materials for product aren't mentioned
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
    flag1:false,
    rawmat_names:[],
    on:'',
    attrs:'',
    modal2: false,
    expanded: [],
    search: '',
    step:1,
      dialog: false,
      dialogDelete: false,
      // filterable-search sortable-ascending/descending
      headers: [
        { text: 'Product ID', value: 'product_id',sortable: false,width:"200px"},
        {
          text: 'Product Name',
          align: 'start',
          //sortable: false,
          value: 'product_name',width:"300px"
        },
        { text: 'Product Price', value: 'product_price',filterable:false, },
        { text: 'Quantity Made', value: 'quantity_made',sortable: false,filterable:false, },
        { text: 'Actions', value: 'actions', sortable: false ,filterable:false,},
        { text: '', value: 'data-table-expand' },
      ],
      headers2: [
        {
          text: 'Material Name',
          align: 'start',
          value: 'material_name',
          sortable: false,filterable:false 
        },
        { text: 'Material Count', value: 'mat_count',sortable: false,filterable:false, },
      ],
      headers3: [
        {
          text: 'Sl.no',
          align: 'start',
          value:'number',
          filterable:false,sortable: false,
        }, 
        {
          text: 'Material Name',
          align: 'start',
          value: 'name',
          sortable: false,filterable:false 
        },
        { text: 'Material Count', value: 'qty',sortable: false,filterable:false, },
        { text: '', value: 'actions', sortable: false,filterable:false, },
      ],
      Product: [],
      Materials:[],
      Mat:[],
      editedIndex: -1,
      editedItem: {
        product_id:'',
        product_name: '',
        product_price: '',
        quantity_made: '',
      },
      defaultItem: {
        product_id:'',
        product_name: '',
        product_price: '',
        quantity_made: '',
      },
    }),
    components: {
    MainLayout
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
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
      //this.initialize()
      this.Read();
      this.loadNameDetails(); 
    },
    methods: {
      initialize(){
         if(this.editedIndex==-1)
          this.Materials=[];
      },
      addmat(){
        var material= new Object();
        material.material_name='';
        material.mat_count='';
        if(this.editedIndex!=-1){
          this.flag1=true     // to add a new product to the order while editing
          material.flag=true;
        }
        this.Materials.push(material)
      },
       loadDetails({item}){
          if(this.modal2==true){
            this.Mat=[]
            this.modal2=false;
            return;
          }
          else{
            this.modal2=true;
          }
          var that=this;
          this.$http.post('/joined/read2', {
            ProductID: item.product_id
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                that.Mat.push(response.data[i]);
              }
              console.log("items")
            console.log(that.Mat);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
      loadNameDetails(){
              var that=this;
              //reads the product names
              this.$http.get('/raw_material/read1', {
            })
            .then(function (response) {
              for(var i=0;i<response.data.length;i++){
                that.rawmat_names.push(response.data[i].material_name);
              }
            console.log("Names");
            console.log(that.rawmat_names);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
        Read(){
              //to read the table contents
              var that=this;
              this.$http.get('/products/read', {
            })
            .then(function (response) {
              //if it's being read for the first time
              for(var i=0;i<response.data.length;i++){
                that.Product.push(response.data[i]);
              }
            console.log(that.Product);
            })
            .catch(function (error) {
            console.log(error);
            });
            },
            check(){
              console.log("check")
              console.log(this.Materials)
              if(this.step==1 && this.Materials.length==0 && this.editedIndex!=-1){   //to display the products in an order while an order if being edited
                 this.Materials=this.Mat.slice()
                this.modal2=false
                 this.Mat=[]
              }
              else if(this.step==1 && this.Materials.length==0){      // default if a new order is being entered
                 var material= new Object();
                material.material_name='';
                material.mat_count='';
                this.Materials.push(material)
              }
            },
      
      editItem (item) {
        this.Materials=[]
        this.loadDetails({item})
        this.editedIndex = this.Product.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteMat(item){
         var index = this.Materials.indexOf(item)
       this.Materials.splice(index, 1)
       if(this.editedIndex!=-1){
         this.DeleteMaterial(this.editedItem.product_id)
       }
      },
      deleteItem (item) {
        this.editedIndex = this.Product.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.Product.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        if(this.modal2==true){
          this.Mat=[]
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
        this.Delete(this.editedItem.product_id)
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
         this.step=1
        if (this.editedIndex > -1) {
          Object.assign(this.Product[this.editedIndex], this.editedItem)
          this.Update(this.Product[this.editedIndex]);
        } else {
          this.Product.push(this.editedItem)
          this.Insert(this,this.editedItem);
        }
        this.close()
      },
      DeleteMaterial(id){
        this.$http.post('/joined/delete2', {
            DProductID: id
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
      },
      Intermediate(that,id){
        for(var i=0;i<that.Materials.length;i++)
            that.InsertMat(id,that.Materials[i]) 
      },
      InsertMat(id,mat){
        this.$http.post('/joined/create2', {
          ProductID: id,
          MaterialName:mat.material_name,
          MaterialCount:mat.mat_count
        }).then(function (response) {
          console.log(response)
        }).catch(function (error) {
            console.log(error);
            });
      },
      IntermediateUpd(that,id){
        for(var i=0;i<that.Materials.length;i++)
            that.UpdateMat(id,that.Materials[i]) 
      },
       UpdateMat(id,mat){
       var that=this
        this.$http.post('/joined/update2', {
          ProductID: id,
          NewMaterialName:mat.material_name,
          NewMaterialCount:mat.mat_count
        }).then(function (response) {
          console.log(response)
          if(response.data.affectedRows==0)   // this implies thst that particular order didn't originally exists i.e. it has been newly added
            that.InsertMat(id,mat)
        }).catch(function (error) {
            console.log(error);
            });
      },
      Delete(Productid) {
            /** 
             * to delete a record
             * hasn't been properly modified yet
             */ 
            //alert(Distributorid);
            this.$http.post('/products/delete', {
            DProductId: Productid
            
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
            //this.remove(Distributorid);
          },
      Insert(thisold,product) {
            /**
             *  to insert a record
             */
            //this.seen=false;
            //var that=this;
            var that=this;
            this.$http.post('/products/create', {
              ProductName: product.product_name,
              ProductPrice: product.product_price,
              QuantityMade: product.quantity_made
            })
            .then( function (response) {
            console.log('success');
            thisold.editedItem.product_id=response.data[0].ID;
            console.log(thisold.editedItem.product_id)
            that.Product[that.Product.length-1].product_id=response.data[0].ID;   
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
      Update(product) {
              
            /**
             * 1) to update a record
             * 2) hasn't been implemented properly yet
             */
            var that=this
            this.$http.post('/products/update', {
            ProductId: product.product_id,
            NewProductName: product.product_name,
            NewProductPrice: product.product_price,
            NewQuantityMade: product.quantity_made
            })
            .then(function (response) {
            console.log('success');
            that.IntermediateUpd(that,product.product_id);
            })
            .catch(function (error) {
            console.log(error);
            });
          },
  }
  }
</script>