<template>
  <div id="pokemon-list">
    <div class="md-field">
      <input type="text" class="md-input" v-model="searchTerm" placeholder="Search">
    </div>
    <div class="pokemon-list clearfix" v-if="pokemons.length > 0">
      <pokemon-list-item v-for="(pokemon, index) in shownPokemon" :key="index+1" v-bind:name="pokemon.name" v-bind:url="pokemon.url" v-on:update:pokemon="selectedPokemon = $event" v-on:showModal="showModal = true"/>    
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
import _ from "lodash";

// Components
import PokemonListItem from "./Pokemon-list-item";
import PokemonDetailModal from "./Pokemon-detail-modal";

export default {
  data() {
    return {
      pokemons: [],
      showModal: false,
      selectedPokemon: null,
      searchTerm: "",
      errors: []
    };
  },
  computed: {
    pokemonsWithId() {
      let arr = new Array();
      this.pokemons.forEach(pokemon => {
        const urlArr = pokemon.url.split("/");
        let auxPokemon = pokemon;
        auxPokemon.id = urlArr[urlArr.length - 2];
        arr.push(auxPokemon);
      });
      return arr;
    },
    shownPokemon() {
      if (this.searchTerm !== "") {
        const that = this;

        const nameResults = _.filter(this.pokemons, function(pokemon) {
          return pokemon.name.includes(that.searchTerm);
        });

        const idResults = _.filter(this.pokemonsWithId, function(pokemon) {
          return pokemon.id.includes(that.searchTerm);
        });

        return idResults.concat(nameResults);
      } else {
        return this.pokemons;
      }
    }
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
.clearfix {
  overflow: auto;
}
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.md-field {
  width: 100%;
  margin: 1em 0.5em;
}
.md-input {
  font-size: 1.2em;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ddd;
  color: #757575;
  background: #ededed;
  padding: 0.5em 1em;

  &:focus {
    outline: none;
  }
}
</style>
