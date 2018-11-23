<template>
  <div id="app">
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <PokemonList/>
    <PokemonDetailModal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
    </PokemonDetailModal>
  </div>
</template>

<script>
// Components
import PokemonList from "./components/Pokemon-list";
import PokemonDetailModal from "./components/Pokemon-detail-modal";

export default {
  name: "app",
  data () {
    return {
      showModal: false
    }
  },
  components: {
    PokemonList,
    PokemonDetailModal
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
