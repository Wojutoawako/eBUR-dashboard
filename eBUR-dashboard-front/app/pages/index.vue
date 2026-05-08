<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DashboardGridWidget, DashboardLayout, Period, Range } from '~/types'
import { GridStack, type GridStackOptions } from 'gridstack'
import DashboardWidget from '~/components/dashboard/DashboardWidget.vue'

import 'gridstack/dist/gridstack.min.css'

const { isNotificationsSlideoverOpen } = useDashboard()

const { data: fetchLayout } = await useFetch('/api/dashboard/layout', { method: 'get' })

const items = [[{
  label: 'New mail',
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: 'New customer',
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')

const data = useState('data', () => [{ X: 1, Y: 1 }, { X: 2, Y: 4 }, { X: 3, Y: 9 }, { X: 4, Y: 16 }])

// const defaultLayout = `{
//   "options":
//   {
//     "minRow":1,
//     "column":4,
//     "float":true,
//     "margin":5,
//     "alwaysShowResizeHandle":true,
//     "cellHeight":128
//   },
//   "children": [
//     {"x":0, "y":0, "w":3, "h":2, "id":"0", "kind":0},
//     {"x":3, "y":0, "h":2, "id":"1", "kind":3},
//     {"x":0, "y":2, "w":2, "h":2, "id":"2", "kind":2},
//     {"x":2, "y":2, "w":2, "h":2, "id":"3", "kind":1}
//   ]
// }`

const layout: DashboardLayout = JSON.parse(fetchLayout.value as string)

GridStack.saveCB = (node, widget) => {
  const dashboardWidget = widget as DashboardGridWidget
  const layoutNode = layout.children?.findLast(w => w.id === node.id) as DashboardGridWidget

  dashboardWidget.kind = layoutNode.kind
}

onMounted(() => {
  const dashboardGrid = GridStack.init(layout.options)

  dashboardGrid.on('change', () => {
    const options = dashboardGrid.save(false, true) as GridStackOptions
    const children = options.children as DashboardGridWidget[]

    options.children = undefined

    const saveLayout: DashboardLayout = {
      options: options,
      children: children
    }

    $fetch('/api/dashboard/layout', { method: 'patch', body: saveLayout })

    console.log('Update current dashboard grid layout config')
  })
})

function onRemoveClicked() {
  localStorage.removeItem('layout.cfg')

  console.log('Remove current dashboard grid layout config')
}
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>

        <template #right>
          <UButton class="remove" @click="onRemoveClicked()">
            <span>Remove saved config</span>
          </UButton>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer class="grid-stack">
        <UContainer
          v-for="widget in layout.children"
          :key="widget.id"
          class="grid-stack-item"
          :gs-x="widget.x"
          :gs-y="widget.y"
          :gs-w="widget.w"
          :gs-h="widget.h"
          :gs-id="widget.id"
        >
          <DashboardWidget
            class="grid-stack-item-content"
            :widget="widget"
            :kind="widget.kind!"
            :data="data"
          />
        </UContainer>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>

<style>
  .grid-stack-item-content {
    border: 1px solid black;
    border-radius: 10px;
  }
</style>
