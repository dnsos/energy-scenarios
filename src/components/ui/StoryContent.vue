<template>
  <span>

    <span v-if="0 === displayedIndex">Primary Energy is an energy form that has not been subjected to any human engineered conversion process. Therefore it accurately describes the actual energy consumption of the world. The scenario close to what our world looks like today assumes a consumption of about 580 EJ next year, in 2020.</span>

    <span v-if="1 === displayedIndex">Primary Energy is either from fossil sources (f) like Oil or Coal or from non-fossil sources (nf) that for example include Solar and Biomass but also Nuclear energy. The consumption in 2020 is projected to consist of mostly fossil sources.</span>

    <span v-if="2 === displayedIndex">Assuming that no further climate policies will be introduced, the energy consumption will have more than doubled by 2100. In this baseline projection the ratio between fossil and non-fossil energy sources will remain nearly the same.</span>

    <span v-if="3 === displayedIndex">However, the world might develop in other ways. Five future societies (<a ref="explainer__ssps" alt="Tooltip explaining what SSPs are. Tooltip explaining what SSPs are. Tooltip content. Tooltip content." @mouseover="setTooltip('explainer__ssps')" @mouseleave="unsetTooltip">SSPs</a>) are plausible, and each one is characterised by a different total energy consumption and a ratio between fossil and non-fossil sources. These different circumstances create different levels of difficulty for handling climate change challenges.</span>

    <span v-if="4 === displayedIndex">The Paris Agreement proposes the introduction of climate policies (<a ref="explainer__rcps" alt="Tooltip explaining what RCPs are. Tooltip explaining what RCPs are. Tooltip content. Tooltip content." @mouseover="setTooltip('explainer__rcps')" @mouseleave="unsetTooltip">RCPs</a>) for keeping the increase of global average temperature to well below 2°C. The five possible futures vary in their proximities to this target. The circles' different area sizes indicate the expenditure to reaching the target – the bigger the difference between each violet and yellow circle, the more effort required.</span>

    <span v-if="5 === displayedIndex">Reaching the 2°C target in the "Middle of the Road" future requires a shift in energy sources: the share of fossil sources needs to decrease, while the share of non-fossil sources needs to increase.</span>

    <span v-if="6 === displayedIndex">Fossil and non-fossil sources each consist of a range of energy carriers. The sources can be subdivided and then looked at in detail.</span>

    <span v-if="7 === displayedIndex">Each of the major energy carriers has a projected energy volume for a future without further climate policies and one that incorporates measures for reaching a climate goal, in this case the 2°C target.</span>

    <span v-if="8 === displayedIndex">Compared to the "Middle of the Road" future, the sustainable "The Green Road" makes it fairly easy to achieve climate targets. Meeting the 2°C target would require only mild actions, such as a modest carbon price, to meet the target. This comparably small effort might receive a stronger public support.</span>

    <span v-if="9 === displayedIndex">Taking a closer look at the carrier Oil reveals interesting details: Even in the sustainable "Green Road", Oil may and will continue to be used extensively until 2050, due to an energy transitioning period, decreasing afterwards. The necessary rapid decrease in the "Middle of the Road" is projected to happen in the second half of the century as well.</span>

  </span>
</template>

<script>
export default {
  name: 'StoryContent',
  props: {
    displayedIndex: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {}
  },
  computed: {},
  methods: {
    setTooltip: function (accessor) {
      const tooltip = {
        text: this.$refs[accessor].attributes['alt'].textContent,
        x: this.$refs[accessor].offsetLeft + (this.$refs[accessor].offsetWidth / 2),
        y: this.$refs[accessor].offsetTop - (this.$refs[accessor].offsetHeight + 10)
      }
      this.$store.commit('setTooltip', tooltip)
    },
    unsetTooltip: function () {
      this.$store.commit('unsetTooltip')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  border-bottom: .1rem dashed black;
}
</style>
