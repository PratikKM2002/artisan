<template>
    <div>
      <MainLayout />
        <v-main>
            <v-data-table :headers="headers" :items="Product" :search="search" sort-by="product_name" class="elevation-9 mt-15 ml-15 mr-15 mb-15">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Product Details</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by Name" single-line hide-details class="mr-15"></v-text-field>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">New Product</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <!--v-row-->
                                            <v-col cols="9" >
                                                <v-text-field v-model="editedItem.product_name" label="Product name"></v-text-field>
                                            </v-col>
                                            <v-col cols="9" >
                                                <v-text-field v-model="editedItem.product_price" label="Product Price"></v-text-field>
                                            </v-col>
                                            <v-col cols="9" >
                                                <v-text-field v-model="editedItem.quantity_made" label="Quantity Made"></v-text-field>
                                            </v-col>
                                        <!--/v-row-->
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="flag1=true,save()">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
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
    search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Product Name',
          align: 'start',
          //sortable: false,
          value: 'product_name',
        },       
        { text: 'Product Price', value: 'product_price',sortable: false,},//filterable:false },
        { text: 'Quantity Made', value: 'quantity_made',filterable:false, },
        { text: 'Actions', value: 'actions', sortable: false ,filterable:false,},
      ],
      Product: [],
      editedIndex: -1,
      editedItem: {
        product_name: '',
        product_price: '',
        quantity_made: '',
      },
      defaultItem: {
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
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
        editInsert(){
            return `${this.editedIndex}|${this.flag1}`;
        }
    },
    watch: {
        editInsert(val){
           // alert(val)
           const [editval,flag] = val.split('|');
           //alert(editval);
           //alert(flag);

           this.flag1=false;
        },
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
    },
    methods: {
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
      
      editItem (item) {
        this.editedIndex = this.Product.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.Product.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.Product.splice(this.editedIndex, 1)
        this.Delete(this.editedItem.product_id)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.Product[this.editedIndex], this.editedItem)
          this.Update(this.Product[this.editedIndex]);
        } else {
          this.Product.push(this.editedItem)
          this.Insert(this.editedItem);
        }
        this.close()
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
      Insert(product) {
            /**
             *  to insert a record
             */
            //this.seen=false;
            //var that=this;
            this.$http.post('/products/create', {
              ProductName: product.product_name,
              ProductPrice: product.product_price,
              QuantityMade: product.quantity_made
            })
            .then( function (response) {
            console.log('success');
            console.log(response);
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
            this.$http.post('/products/update', {
            ProductId: product.product_id,
            NewProductName: product.product_name,
            NewProductPrice: product.product_price,
            NewQuantityMade: product.quantity_made
            })
            .then(function (response) {
            console.log('success');
            })
            .catch(function (error) {
            console.log(error);
            });
          },
  }
  }
</script>