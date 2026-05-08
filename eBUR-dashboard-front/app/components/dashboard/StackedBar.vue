<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisStackedBarSelectors } from '@unovis/vue'
import type { GenericDataRecord } from '@unovis/ts'

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = (d: GenericDataRecord) => d.Y

const triggers = {
  [VisStackedBarSelectors.barGroup]: (d: GenericDataRecord) => {
    return `
      <span>${d.X}, ${d.Y}</span>
    `
  }
}
</script>

<template>
  <VisXYContainer :data="data">
    <VisStackedBar
      :x="x"
      :y="y"
      :color="'var(--ui-secondary)'"
    />

    <VisAxis type="x" />
    <VisAxis type="y" />

    <VisTooltip :triggers="triggers" />
  </VisXYContainer>
</template>
