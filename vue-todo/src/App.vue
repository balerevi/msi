<template>
  <div id="app">
    <TodoList/>
  </div>
</template>

<script>
  import TodoList from "./components/TodoList";

  export default {
    name: 'App',
    components: {
      TodoList
    }
  }
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
