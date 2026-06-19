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

// const item = useTemplateRef('item')
// const thumb = useTemplateRef('scroll-thumb')
// const cont = useTemplateRef('scroll-container')

// const trackHeight = ref(0)
// const thumbHeight = ref(10)

// const scroll = useScroll(item)

// watch(item, (val) => {
//   if (val?.clientHeight < val?.scrollHeight) {

//   }
// })

// watchOnce(cont, (val) => {
//   trackHeight.value = val!.clientHeight
//   thumbHeight.value = (trackHeight.value / val!.scrollHeight) * trackHeight.value

//   watchOnce(thumb, (val) => {
//     val!.style.height = `${thumbHeight.value}px`
//   })
// })

// watch(y, (val) => {
//   const top = val - val / thumbHeight.value

//   thumb.value!.style.top = `${top}px`
//   console.log(val, top, trackHeight.value, thumbHeight.value)
// })
</script>

<template>
  <UContainer>
    <div
      ref="item"
      class="
        grid-stack-item-content
        simplebar-content
        bg-white
        border-[1px]
        border-solid
        border-transparent
        rounded-[10px]
        shadow-[0_4px_4px_0_#00000040]
        [&>ui-resizable-se]:hidden
      "
    >
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

    <!-- <ClientOnly>
      <div
        ref="scroll-container"
        class="
          flex
          justify-end
          items-center
          h-[100%]
          w-[100%]
        "
      >
        <div
          ref="scroll-track"
          class="
            flex
            justify-center
            relative
            h-[80%]
            w-[12px]

            bg-gray-300
          "
        >
          <div
            ref="scroll-thumb"
            :class="`
              relative
              transition
              duration-300
              ${isScrolling ? 'bg-gray-500' : 'bg-gray-300'}
              w-[8px]
              h-[64px]
              rounded-[10px]
            `"
          />
        </div>
      </div>
    </ClientOnly> -->
  </UContainer>
</template>
