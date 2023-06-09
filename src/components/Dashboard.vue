<template>
  <div class="container-fluid mt-3 position-relative">

    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import emitter from '@/methods/emitter.js';
import ToastMessages from '@/components/ToastMessage.vue';
export default {
  components: {
    Navbar,
    ToastMessages,
  },
  
    provide () {
      return {
        emitter
      }
    },
}</script>