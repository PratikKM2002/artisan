<template>
  <v-card
    class="mx-auto overflow-hidden"
    width="100%"
  >
    <v-app-bar
      color="green"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Artisan Enterprise</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-decoration-underline" @click="$router.push('/')">Logout</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="green--text text--accent-4"
        >
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/RawMaterial">
              <!--v-btn-->
            <v-list-item-icon>
              <v-icon small>fas fa-tools</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Raw Material</v-list-item-title>
            <!--/v-btn-->
          </v-list-item>
          <v-list-item to="/employee">
              <!--v-btn-->
            <v-list-item-icon>
              <v-icon small>fas fa-users</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Employee</v-list-item-title>
            <!--/v-btn-->
          </v-list-item>
          <v-list-item to="/distributor">
              <!--v-btn-->
            <v-list-item-icon>
              <v-icon small>fas fa-user-tie</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Distributor</v-list-item-title>
            <!--/v-btn-->
          </v-list-item>
          <v-list-item to="/products">
            <v-list-item-icon>
              <v-icon small>fas fa-box-open</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item>
          <v-list-item to="/order">
            <v-list-item-icon>
              <v-icon small>fas fa-shopping-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Order</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,      
      group: null,
    }),
  }
</script>

<style>
.v-toolbar__title{
  font-family: Gill Sans Extrabold, sans-serif;
  font-size: 1.4em !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 1em !important;
}
.v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
  font-size: 1.1em !important;
}
</style>