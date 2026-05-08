<script setup lang="ts">
import type { GridStackWidget } from 'gridstack'
import { DashboardWidgetType } from '~/types/enums'
import type { GenericDataRecord } from '@unovis/ts'

import LinearGraph from '~/components/dashboard/LinearGraph.vue'
import StackedBar from '~/components/dashboard/StackedBar.vue'
import Scatter from '~/components/dashboard/Scatter.vue'
import GroupedBar from '~/components/dashboard/GroupedBar.vue'
import type { DashboardGridWidget } from '~/types'

const props = defineProps<{
  kind: DashboardWidgetType
  data: GenericDataRecord[]
  widget?: DashboardGridWidget
}>()
</script>

<template>
  <div>
    <slot name="widget-header" />
    <slot name="widget-content">
      <LinearGraph v-if="kind === DashboardWidgetType.LinearGraph" :data="data" :widget="widget as DashboardGridWidget" />
      <StackedBar v-else-if="kind === DashboardWidgetType.StackedBar" :data="data" />
      <Scatter v-else-if="kind === DashboardWidgetType.Scatter" :data="data" />
      <GroupedBar v-else-if="kind === DashboardWidgetType.GroupedBar" :data="data" />
      <span v-else>
        No visual representation found for that data type
      </span>
    </slot>
    <slot name="widget-footer" />
  </div>
</template>
