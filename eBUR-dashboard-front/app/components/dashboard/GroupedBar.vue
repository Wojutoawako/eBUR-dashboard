<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue'
import type { GenericDataRecord, Spacing } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'
import type { GridStackOptions } from 'gridstack'

const widgetModel = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

const optionsModel = defineModel<GridStackOptions>('options', {
  required: true
})

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = [
  (d: GenericDataRecord) => d.Y,
  (d: GenericDataRecord) => d.Y as number + 2,
  (d: GenericDataRecord) => d.Y as number + randomInt(-(d.Y as number), 9)
]

const margin = { left: 5, bottom: 10, right: 10, top: 5 } as Spacing
const height = computed(() =>
  optionsModel.value.cellHeight?.valueOf() as number * (widgetModel.value.h ?? 1) - ((margin.top ?? 0) + (margin.bottom ?? 0))
)

const color = (d: GenericDataRecord, i: number) => `var(--data-color-${i})`
</script>

<template>
  <VisXYContainer :data="data" :height="height" :margin="margin">
    <VisGroupedBar
      :x="x"
      :y="y"
      :orientation="'horizontal'"
      :color="color"
    />

    <VisAxis type="x" />
    <VisAxis type="y" />
  </VisXYContainer>
</template>
