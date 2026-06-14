<script setup lang="ts">
import { sub } from 'date-fns'
import { breakpointsTailwind } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DashboardGridWidget, DashboardLayout, Range } from '~/types'
import { GridStack, type GridStackOptions } from 'gridstack'
import { utils as xlsxUtils, writeFile } from 'xlsx'
import DashboardWidget from '~/components/dashboard/DashboardWidget.vue'

import 'gridstack/dist/gridstack.min.css'

const { isNotificationsSlideoverOpen } = useDashboard()

const { active } = await useBreakpoints(breakpointsTailwind)

const layoutConfig = useState<DashboardLayout>('layoutConfig')

await callOnce(async () => {
  const { data: fetchLayout } = await useFetch('/api/dashboard/layout', { method: 'get' })
  layoutConfig.value = JSON.parse(fetchLayout.value as string)
})

const { t } = useI18n()

const items = [[{
  label: t('homeAddMail'),
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: t('homeAddCustomer'),
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<string>(t('periodSelectDaily'))

const tempData = useState('tempData', () => [
  { LastName: 'Карасев', Score: 40 },
  { LastName: 'Попова', Score: 73 },
  { LastName: 'Антонова', Score: 44 },
  { LastName: 'Карасев', Score: 40 },
  { LastName: 'Попова', Score: 73 },
  { LastName: 'Антонова', Score: 44 },
  { LastName: 'Карасев', Score: 40 },
  { LastName: 'Попова', Score: 73 },
  { LastName: 'Антонова', Score: 44 },
  { LastName: 'Карасев', Score: 40 },
  { LastName: 'Попова', Score: 73 },
  { LastName: 'Антонова', Score: 44 },
  { LastName: 'Карасев', Score: 40 },
  { LastName: 'Попова', Score: 73 },
  { LastName: 'Антонова', Score: 44 }
])

const mockData = () => {
  return tempData
}

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

  watch(active(), (value) => {
    switch (value) {
      case '':
        // dashboardGrid.column(1)
        break
      case 'sm':
        break
      case 'md':
        // dashboardGrid.column(3)
        break
      case 'lg':
        break
      case 'xl':
        // dashboardGrid.column(4)
        break
      case '2xl':
        break
    }
  })
})

const serverSaveCallback = () => {
  /** Сохранение на web-сервере */
  $fetch('/api/dashboard/layout', { method: 'patch', body: layoutConfig.value })
}

watchDebounced(layoutConfig, serverSaveCallback, { debounce: 1500 })

const onDownloadClicked = () => {
  const sheet = xlsxUtils.json_to_sheet(tempData.value)

  const wb = xlsxUtils.book_new(sheet, 'eBUR_Report')

  // const res = write(wb, { bookType: 'ods', type: 'file' })

  writeFile(wb, 'eBUR_Report.ods', { bookType: 'ods', type: 'file' })
}
</script>

<template>
  <UDashboardPanel id="home" grow>
    <template #header>
      <UDashboardNavbar :title="t('homePageTitle')" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip :text="t('homeNotificationsTooltip')" :shortcuts="['N']">
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
            :label="t('reportButtonLabel')"
            @click="onDownloadClicked()"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <UContainer class="grid-stack">
        <DashboardWidget
          v-for="widget in layoutConfig.children"
          :key="widget.id"
          class="grid-stack-item"

          :gs-x="widget.x"
          :gs-y="widget.y"
          :gs-w="widget.w"
          :gs-h="widget.h"
          :gs-id="widget.id"
          :gs-no-resize="widget.noResize"

          :widget="widget"
          :options="layoutConfig.options"
          :data="mockData().value"
        />
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
