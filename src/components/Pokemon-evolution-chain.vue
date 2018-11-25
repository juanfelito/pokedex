<template>
  <div class="evolutions">
    <div class="evolutions__title">
      Evolutions
    </div>
    <div class="evolutions__container clearfix">
      <div class="evolutions__step" v-for="(step, index) in sortedChain" :key="index">
        <template v-if="typeof step.value == 'string'">
          <img :src="step.value" alt="">
        </template>
        <template v-else-if="typeof step.value == 'number'">
          <div class="evolutions__step__level">
            LVL<br><span class="evolutions__step__level__value">{{step.value}}</span>
          </div>
        </template>
        <template v-else>
          <div class="evolutions__step__level">
            LVL<br><span class="evolutions__step__level__value">--</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  data() {
    return {
      chainData: [],
      chainDataWithImages: [],
      errors: []
    };
  },
  props: ["evolutionChainUrl"],
  computed: {
    sortedChain() {
      return _.orderBy(this.chainDataWithImages, "index", "asc");
    }
  },
  methods: {
    hasEvolution: function(chain) {
      if (chain.evolves_to.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    generateChainData: function(chain) {
      this.chainData.push(chain.species.url);
      if (this.hasEvolution(chain)) {
        this.chainData.push(chain.evolves_to[0].evolution_details[0].min_level);
        this.generateChainData(chain.evolves_to[0]);
      } else {
        this.obtainChainImagesUrl();
      }
    },
    obtainChainImagesUrl: function() {
      const that = this;
      this.chainData.forEach(function(elem, index) {
        if (typeof elem == "string") {
          axios
            .get(elem)
            .then(function(response) {
              const defaultVariety = _.find(response.data.varieties, function(
                variety
              ) {
                return variety.is_default == true;
              });

              axios
                .get(defaultVariety.pokemon.url)
                .then(response => {
                  that.chainDataWithImages.push({
                    value: response.data.sprites.front_default,
                    index: index
                  });
                })
                .catch(e => {
                  that.errors.push(e);
                });
            })
            .catch(e => {
              that.errors.push(e);
            });
        } else {
          that.chainDataWithImages.push({
            value: elem,
            index: index
          });
        }
      });
    }
  },
  created() {
    axios
      .get(this.evolutionChainUrl)
      .then(response => {
        this.generateChainData(response.data.chain);
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style lang="scss">
.evolutions {
  &__title {
    color: #fff;
    background: #f74537;
    font-size: 1.2em;
    font-weight: 500;
    display: block;
    text-align: left;
    padding: 0.1em 0.625em;
  }
  &__container {
    text-align: center;
    display: inline-block;
    margin: 0 auto;
  }
  &__step {
    float: left;
    color: #f74537;
    height: 100%;
    position: relative;
    &__level {
      padding-top: 25px;
      &__value {
        font-size: 1.5em;
      }
    }
  }
}
</style>
