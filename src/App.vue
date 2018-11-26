<template>
  <div id="app">
    <div class="nav-bar">Vue Pokèdex</div>
    <div class="container">
      <PokemonList/>
    </div>
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
}
.container {
  width: 98%;
  margin: 0 auto;  
}
.nav-bar {
  background: #f74537;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
  padding: 1em;
  padding-left: 2em;
}
html {
  background: #ededed;
}
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
