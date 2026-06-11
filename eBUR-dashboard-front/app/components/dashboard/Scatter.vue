<script setup lang="ts">
import { VisXYContainer, VisScatter, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'
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
const y = (d: GenericDataRecord) => d.Y

const margin = { left: 5, bottom: 10, right: 10, top: 5 } as Spacing
const height = computed(() =>
  optionsModel.value.cellHeight?.valueOf() as number * (widgetModel.value.h ?? 1) - ((margin.top ?? 0) + (margin.bottom ?? 0))
)

const template = (d: GenericDataRecord) => `${d.X}, ${d.Y}`
</script>

<template>
  <VisXYContainer :data="data" :height="height" :margin="margin">
    <VisScatter
      :x="x"
      :y="y"
      :color="'var(--ui-primary)'"
    />

    <VisAxis type="x" />
    <VisAxis type="y" />

    <VisTooltip />

    <VisCrosshair :template="template" />
  </VisXYContainer>
</template>
