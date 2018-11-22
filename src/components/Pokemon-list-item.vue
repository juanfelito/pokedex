<template>
  <div class="pokemon-list-item">
    <div class="pokemon-list-item__sprite">
        <img v-bind:src="urlImagen" alt="">
    </div>
    <div class="pokemon-list-item__name">{{name | iniciaConMayuscula}} #{{id}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            greeting: 'Hello',
            name: '',
            urlImagen: '',
            errors: []
        }
    },
    filters:{
        iniciaConMayuscula: function(valor) {
            return valor.charAt(0).toUpperCase() + valor.slice(1);
        }
    },
    props: ['id'],
    mounted () {
        axios
            .get('https://pokeapi.co/api/v2/pokemon/'+this.id+'/')
            .then(response => {
                this.name = response.data.name;
                this.urlImagen = response.data.sprites.front_default;
            })
            .catch(e => {
                this.errors.push(e);
            })
    }
}
</script>

<style lang="scss">
.pokemon-list-item {
  padding: 10px;
  width: 100px;
  float: left;
  margin: 2px;
  background: #eee;
}
</style>
