<template>
  <div id="app">
    <PokemonList/>    
  </div>
</template>

<script>
// Components
import PokemonList from "./components/Pokemon-list";

export default {
  name: "app",
  components: {
    PokemonList
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
html {
  background: #ededed;
}
</style>
