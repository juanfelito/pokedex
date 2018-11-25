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
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 99%;
  margin: 0 auto;
}
html {
  background: #ededed;
}
* {
  box-sizing: border-box;
}
</style>
