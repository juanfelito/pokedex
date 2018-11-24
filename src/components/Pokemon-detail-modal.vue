<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header clearfix">
            <img class="header__image" v-bind:src="pokemon.urlImagen" alt="">
            <div v-if="description != undefined" class="header__description">{{description.flavor_text}}</div>
          </div>

          <div class="modal-body">
            <PokemonPokedexStats v-bind:stats="this.pokemon.stats"/>
            <PokemonAttributes v-bind:height="this.pokemon.height" v-bind:weight="this.pokemon.weight" v-bind:types="this.pokemon.types"/>
            <PokemonEvolutionChain v-bind:evolutionChainUrl="evolutionChainUrl" v-if="evolutionChainUrl != ''"/>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import PokemonAttributes from "./Pokemon-attributes";
import PokemonPokedexStats from "./Pokemon-pokedex-stats";
import PokemonEvolutionChain from "./Pokemon-evolution-chain";

export default {
  data() {
    return {
      errors: [],
      evolutionChainUrl: "",
      descriptions: null
    };
  },
  computed: {
    description() {
      return _.find(this.descriptions, function(description) {
        return description.language.name == "en";
      });
    }
  },
  props: ["pokemon"],
  components: {
    PokemonAttributes,
    PokemonPokedexStats,
    PokemonEvolutionChain
  },
  created() {
    axios
      .get(this.pokemon.speciesUrl)
      .then(response => {
        this.descriptions = response.data.flavor_text_entries;
        this.evolutionChainUrl = response.data.evolution_chain.url;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style lang="scss">
.header__image {
  width: 33%;
  float: left;
}
.header__description {
  width: 66%;
  float: left;
  text-align: left;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 32%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
