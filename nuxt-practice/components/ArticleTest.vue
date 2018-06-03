<template>
<div>
  <p>this is article</p>
  <div id="app-6">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</div>
</template>
<script>
import Vue from "vue"
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
console.log(app6)
</script>