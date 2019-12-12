<template>
  <span>

    <span v-if="0 === displayedIndex">Primary Energy describes the energy that we obtain embodied in resources as they exist in nature: coal, oil, but also solar radiation are just a few examples that provide a vast source of energy that fuels modern human life day by day. In most cases, Primary Energy is not used directly but undergoes conversion processes before it can be used in daily life.</span>

    <span v-if="1 === displayedIndex">With regard to Climate Change, especially Primary Energy in form of fossil sources (f) is of central interest: Oil, Coal, or Gas are the energy carriers from which the majority of CO2 emissions stem that are responsible for Climate Change. Thus, energy provision has to be accomplished by a shift towards non-fossil sources (nf), e.g. Solar energy, Biomass, but also Nuclear energy play an important role in scenarios about future Primary Energy.</span>

    <span v-if="2 === displayedIndex">Assuming that no explicit climate policies are introduced, the global energy consumption will have a drastic increase. In the scenario depicted here, energy consumption has more than doubled by 2100. In this scenario the ratio between fossil and non-fossil energy sources will remain nearly the same.</span>

    <span v-if="3 === displayedIndex">However, our future is not cast in stone. The world might develop in other ways. The <a href="https://climatescenarios.org/primer/socioeconomic-development" target="_blank">SSPs</a> are five plausible future scenarios that describe global development along decisive socioeconomic factors, such as world population growth, economic development and technological progress. From a Primary Energy perspective two criteria characterize these five futures: the total Primary Energy demand (area size of circles) and the ratio between fossil and non-fossil sources.</span>

    <span v-if="4 === displayedIndex">The Paris Agreement was a historic step as countries agreed to take action to hold global mean temperature rise well below 2°C and pursue efforts to limit warming to 1.5°C. The setup of the five possible SSP futures allows to explore different plausible pathways to achieve this target, also from a Primary Energy perspective. The circles' different areas indicate the extent of change required – the bigger the difference between the violet and yellow circle, the greater the required transformation. </span>

    <span v-if="5 === displayedIndex">One possible future is the "Middle of the road" scenario – where the development of society and economy doesn’t diverge much from now. Most economies are stable, but there is also no major technologic break through. Environmental degradation declines to a certain extent and population growth slows down. Looking at the effect on Primary Energy by a climate target with max. 2°C warming one can see that total energy demand is slightly reduced. Fossil fuels need to decrease to about 20 % of total energy demand and non-fossil sources provide approximately 80 %.</span>

    <span v-if="6 === displayedIndex">To understand how this shift can be achieved, from a domination by fossil sources to a predominantly non-fossil energy supply, we take a detailed look into the types of fossil and non-fossil sources.</span>

    <span v-if="7 === displayedIndex">In the plausible future of the "Middle of the road" scenario, with a climate target of max. 2°C warming, each of the Primary Energy resources has to undergo a major transformation. The use of fossil resources like Coal, Oil, and Gas decreases while the use of non-fossil resources like Biomass, Hydro, Nuclear, Solar, and Wind power increases.</span>

    <span v-if="8 === displayedIndex">Compared to the "Middle of the road" future, another plausible future, the sustainable "The Green Road" scenario makes it much easier to achieve climate targets. Meeting the 2°C target would still require strong reductions in fossil energy supply. But renewables would already be ramped up to a great extent due to the conscious planning and investment of societies in this scenario.</span>

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
