<template>
    <Navbar></Navbar>
    <div class="container-fluid mt-3 position-relative">
        
    <router-view/>
  </div>

  
  </template>
  <script>
  import Navbar from '@/components/Navbar.vue';
  import emitter from '@/methods/emitter.js';
  import ToastMessages from '@/components/ToastMessage.vue';
  export default {
    name: 'DashBoard',
    components: {
      Navbar,
      ToastMessages,
    },
    provide () {
      return {
        emitter
      }
    }
  }</script>