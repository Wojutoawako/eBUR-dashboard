<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisStackedBarSelectors } from '@unovis/vue'
import type { GenericDataRecord, Spacing } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'

const model = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = (d: GenericDataRecord) => d.Y

const margin = { left: 5, bottom: 10, right: 10, top: 5 } as Spacing
const height = computed(() => 128 * (model.value.h ?? 1) - ((margin.top ?? 0) + (margin.bottom ?? 0)))

const triggers = {
  [VisStackedBarSelectors.barGroup]: (d: GenericDataRecord) => {
    return `
      <span>${d.X}, ${d.Y}</span>
    `
  }
}
</script>

<template>
  <VisXYContainer :data="data" :height="height" :margin="margin">
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
