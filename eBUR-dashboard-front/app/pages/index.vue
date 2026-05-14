<script setup lang="ts">
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DashboardGridWidget, DashboardLayout, Period, Range } from '~/types'
import { GridStack, type GridStackOptions } from 'gridstack'
import DashboardWidget from '~/components/dashboard/DashboardWidget.vue'

import 'gridstack/dist/gridstack.min.css'

const { isNotificationsSlideoverOpen } = useDashboard()

const layoutConfig = useState<DashboardLayout>('layoutConfig')

await callOnce(async () => {
  const { data: fetchLayout } = await useFetch('/api/dashboard/layout', { method: 'get' })
  layoutConfig.value = JSON.parse(fetchLayout.value as string)
})

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

const tempData = useState('data', () => [{ X: 1, Y: 1 }, { X: 2, Y: 4 }, { X: 3, Y: 9 }, { X: 4, Y: 16 }])

GridStack.saveCB = (node, widget) => {
  const dashboardWidget = widget as DashboardGridWidget
  const layoutNode = layoutConfig.value.children?.findLast(w => w.id === node.id) as DashboardGridWidget

  dashboardWidget.kind = layoutNode.kind
}

onMounted(() => {
  const dashboardGrid = GridStack.init(layoutConfig.value.options)

  dashboardGrid.on('change', () => {
    const options = dashboardGrid.save(false, true) as GridStackOptions
    const children = options.children as DashboardGridWidget[]

    options.children = undefined

    const saveLayout: DashboardLayout = {
      options: options,
      children: children
    }

    /** Сохранение конфигурации у пользователя */
    layoutConfig.value = saveLayout
  })
})

const serverSaveCallback = () => {
  /** Сохранение на web-сервере */
  $fetch('/api/dashboard/layout', { method: 'patch', body: layoutConfig.value })
}

watchDebounced(layoutConfig, serverSaveCallback, { debounce: 1500 })
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
          <UButton
            label="Download report"
            download="Report"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer class="grid-stack">
        <DashboardWidget
          v-for="widget in layoutConfig.children"
          :key="widget.id"
          :widget="widget"
          class="grid-stack-item"
          :gs-x="widget.x"
          :gs-y="widget.y"
          :gs-w="widget.w"
          :gs-h="widget.h"
          :gs-id="widget.id"
          :data="tempData"
        />
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
