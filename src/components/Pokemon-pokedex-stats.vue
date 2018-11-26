<template>
  <ul class="indexes clearfix">
    <li class="indexes__item">
        <span class="indexes__item__name">HP</span><br>{{hp.base_stat}}
    </li>
    <li class="indexes__item">
        <span class="indexes__item__name">ATK</span><br>{{attack.base_stat}}
    </li>
    <li class="indexes__item">
      <span class="indexes__item__name">DEF</span><br>{{defense.base_stat}}
    </li>
    <li class="indexes__item">
      <span class="indexes__item__name">SPD</span><br>{{speed.base_stat}}
    </li>
  </ul>
</template>

<script>
import _ from "lodash";

export default {
  props: ["stats"],
  computed: {
    hp() {
      return _.find(this.stats, function(stat) {
        return stat.stat.name == "hp";
      });
    },
    speed() {
      return _.find(this.stats, function(stat) {
        return stat.stat.name == "speed";
      });
    },
    attack() {
      return _.find(this.stats, function(stat) {
        return stat.stat.name == "attack";
      });
    },
    defense() {
      return _.find(this.stats, function(stat) {
        return stat.stat.name == "defense";
      });
    }
  }
};
</script>

<style lang="scss">
.indexes {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-bottom: 1em;
  border-bottom: 2px solid #f9f9f9;
  &__item {
    width: 50%;
    float: left;
    text-align: center;

    &__name {
      font-weight: 500;
      font-size: 1.3em;
      color: #f74537;
    }
  }
}
@media screen and (min-width: 600px){
  .indexes__item {
    width: 25%;    
  }
}

</style>
