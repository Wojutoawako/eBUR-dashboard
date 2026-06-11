<script setup lang="ts">
import { DashboardWidgetType } from '~/types/enums'
import type { GenericDataRecord } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'

import LinearGraph from '~/components/dashboard/LinearGraph.vue'
import StackedBar from '~/components/dashboard/StackedBar.vue'
import Scatter from '~/components/dashboard/Scatter.vue'
import GroupedBar from '~/components/dashboard/GroupedBar.vue'
import List from './List.vue'
import States from './States.vue'
import Differences from './Differences.vue'
import type { GridStackOptions } from 'gridstack'

defineModel<DashboardGridWidget>('widget')
defineModel<GridStackOptions>('options', {
  required: true
})

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
          :options="options"
          :data="data"
        />
        <StackedBar
          v-else-if="widget?.kind === DashboardWidgetType.StackedBar"
          :widget="widget"
          :options="options"
        />
        <Scatter
          v-else-if="widget?.kind === DashboardWidgetType.Scatter"
          :widget="widget"
          :options="options"
          :data="data"
        />
        <GroupedBar
          v-else-if="widget?.kind === DashboardWidgetType.GroupedBar"
          :widget="widget"
          :options="options"
          :data="data"
        />
        <List
          v-else-if="widget?.kind === DashboardWidgetType.List"
          :widget="widget"
        />
        <States
          v-else-if="widget?.kind === DashboardWidgetType.States"
          :widget="widget"
        />
        <Differences
          v-else-if="widget?.kind === DashboardWidgetType.Differences"
          :widget="widget"
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
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: white;

  box-shadow: 0px 4px 4px 0px #00000040;
}
</style>
