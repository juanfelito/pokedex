<template>
  <div id="app">
    Pokemon, tengo que atraparlos
    <PokemonListItem v-bind:id="1"/> 
    <PokemonListItem v-bind:id="2"/> 
    <PokemonListItem v-bind:id="3"/> 
  </div>
</template>

<script>
// Components
import PokemonListItem from "./components/Pokemon-list-item";

export default {
  name: "app",
  components: {
    PokemonListItem
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
</style>
