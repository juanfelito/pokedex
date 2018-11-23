<template>
  <div class="pokemon-list" v-if="pokemons.length > 0">
    <pokemon-list-item v-for="n in 10" :key="n+1" v-bind:name="pokemons[n].name" v-bind:url="pokemons[n].url"/>    
  </div>
</template>

<script>
import axios from "axios";

// Components
import PokemonListItem from "./Pokemon-list-item";

export default {
  data () {
    return {
        pokemons: []
    }
  },
  created () {
    axios
        .get('https://pokeapi.co/api/v2/pokemon/')
        .then(response => {
            this.pokemons = response.data.results;
        })
        .catch(e => {
            this.errors.push(e);
        });
  },
  components: {
      PokemonListItem
  }
};
</script>

<style lang="scss">

</style>