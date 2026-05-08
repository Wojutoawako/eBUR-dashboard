<script setup lang="ts">
import { VisXYContainer, VisScatter, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { GenericDataRecord } from '@unovis/ts'

const _ = defineProps<{ data: GenericDataRecord[] }>()

const x = (d: GenericDataRecord) => d.X
const y = (d: GenericDataRecord) => d.Y

const template = (d: GenericDataRecord) => `${d.X}, ${d.Y}`
</script>

<template>
  <VisXYContainer :data="data">
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
