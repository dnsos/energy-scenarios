<template>
  <g
    class="icon__infeasible"
    :transform="'translate(-20,-20)'"
  >
    <path style="fill: #fff7e5;" d="M21.4,41.37a20,20,0,1,1,20-20A20,20,0,0,1,21.4,41.37Z"/><path style="fill:#feae00;" d="M21.4,2.18A19.22,19.22,0,1,1,2.18,21.4,19.24,19.24,0,0,1,21.4,2.18m0-1.5A20.72,20.72,0,1,0,42.12,21.4,20.72,20.72,0,0,0,21.4.68Z"/><line x1="13.16" y1="12.16" x2="30.84" y2="29.84"/><line x1="13.16" y1="29.84" x2="30.84" y2="12.16"/>
  </g>
</template>

<script>
export default {
  name: 'InfeasibleIcon',
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
line {
  fill: none;
  stroke: #feae00;
  stroke-linecap:round;
  stroke-miterlimit:10;
  stroke-width:3px;
}
</style>
