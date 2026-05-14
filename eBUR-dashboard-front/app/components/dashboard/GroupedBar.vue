<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue'
import type { GenericDataRecord, Spacing } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'

const model = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = [
  (d: GenericDataRecord) => d.Y,
  (d: GenericDataRecord) => d.Y as number + 2,
  (d: GenericDataRecord) => d.Y as number + randomInt(-(d.Y as number), 9)
]

const margin = { left: 5, bottom: 10, right: 10, top: 5 } as Spacing
const height = computed(() => 128 * (model.value.h ?? 1) - ((margin.top ?? 0) + (margin.bottom ?? 0)))
</script>

<template>
  <VisXYContainer :data="data" :height="height" :margin="margin">
    <VisGroupedBar
      :x="x"
      :y="y"
      :orientation="'horizontal'"
    />

    <VisAxis type="x" />
    <VisAxis type="y" />
  </VisXYContainer>
</template>
