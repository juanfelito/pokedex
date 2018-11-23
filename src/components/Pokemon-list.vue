<template>
  <div id="pokemon-list">
    <div class="pokemon-list" v-if="pokemons.length > 0">
      <pokemon-list-item v-for="n in 10" :key="n+1" v-bind:name="pokemons[n].name" v-bind:url="pokemons[n].url" v-on:update:pokemon="selectedPokemon = $event" v-on:showModal="showModal = true"/>    
    </div>
    <PokemonDetailModal v-if="showModal" @close="showModal = false" v-bind:pokemon="selectedPokemon">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <!-- <h3 slot="header">{{selectedPokemon.id}}</h3> -->
    </PokemonDetailModal>
  </div>
</template>

<script>
import axios from "axios";

// Components
import PokemonListItem from "./Pokemon-list-item";
import PokemonDetailModal from "./Pokemon-detail-modal";

export default {
  data() {
    return {
      pokemons: [],
      showModal: false,
      selectedPokemon: null
    };
  },
  created() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        this.pokemons = response.data.results;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  components: {
    PokemonListItem,
    PokemonDetailModal
  }
};
</script>

<style lang="scss">
</style>
