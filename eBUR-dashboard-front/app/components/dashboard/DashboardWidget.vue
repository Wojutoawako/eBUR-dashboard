<script setup lang="ts">
import { DashboardWidgetType } from '~/types/enums'
import type { GenericDataRecord } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'

import LinearGraph from '~/components/dashboard/LinearGraph.vue'
import StackedBar from '~/components/dashboard/StackedBar.vue'
import Scatter from '~/components/dashboard/Scatter.vue'
import GroupedBar from '~/components/dashboard/GroupedBar.vue'

defineModel<DashboardGridWidget>('widget')

defineProps<{
  data: GenericDataRecord[]
}>()
</script>

<template>
  <UContainer>
    <div class="grid-stack-item-content">
      <slot name="widget-header" />
      <slot name="widget-content">
        <LinearGraph
          v-if="widget?.kind === DashboardWidgetType.LinearGraph"
          :widget="widget"
          :data="data"
        />
        <StackedBar
          v-else-if="widget?.kind === DashboardWidgetType.StackedBar"
          :widget="widget"
          :data="data"
        />
        <Scatter
          v-else-if="widget?.kind === DashboardWidgetType.Scatter"
          :widget="widget"
          :data="data"
        />
        <GroupedBar
          v-else-if="widget?.kind === DashboardWidgetType.GroupedBar"
          :widget="widget"
          :data="data"
        />
        <span v-else>
          No visual representation found for that data type
        </span>
      </slot>
      <slot name="widget-footer" />
    </div>
  </UContainer>
</template>

<style scoped>
.grid-stack-item-content {
  border: 1px solid black;
  border-radius: 10px;
}
</style>
