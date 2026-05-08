<script setup lang="ts">
import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue'
import type { GenericDataRecord } from '@unovis/ts'

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = [
  (d: GenericDataRecord) => d.Y,
  (d: GenericDataRecord) => d.Y as number + 2,
  (d: GenericDataRecord) => d.Y as number + randomInt(-(d.Y as number), 9)
]
</script>

<template>
  <VisXYContainer :data="data">
    <VisGroupedBar
      :x="x"
      :y="y"
      :orientation="'horizontal'"
    />

    <VisAxis type="x" />
    <VisAxis type="y" />
  </VisXYContainer>
</template>
