<script setup lang="ts">
import type { DashboardGridWidget } from '~/types'

const widgetModel = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

let title = 'Ремонт транспорта'

const mockData2 = useState('data2', () => [
  { TransportName: 'A335EY_96', Color: 'error' },
  { TransportName: 'A336EY_96', Color: 'info' },
  { TransportName: 'A337EY_96', Color: 'bg' },
  { TransportName: 'A338EY_96', Color: 'warning' }
])
const mockData3 = useState('data3', () => [
  { TransportName: 'Активный', Amount: 44, Color: 'success' },
  { TransportName: 'В магазине', Amount: 45, Color: 'warning' },
  { TransportName: 'Не активный', Amount: 47, Color: 'info' },
  { TransportName: 'Не работает', Amount: 49, Color: 'error' }
])

if (widgetModel.value.id === '5') {
  title = 'Статус транспорта'
}

const mockData = () => {
  if (widgetModel.value.id === '5') {
    return mockData3
  }

  return mockData2
}
</script>

<template>
  <UCard
    class="list-card"
    :ui="{
      root: 'border-white outline-white',
      header: 'text-center text-highlighted bg-white',
      body: 'bg-white'
    }"
  >
    <template #header>
      <span class="list-header__title">
        {{ title }}
      </span>
    </template>

    <template #default>
      <UTable
        :data="mockData().value"
        :ui="{ td: 'text-highlighted', thead: 'hidden' }"
        :column-visibility="{ ['Color']: false }"
      >
        <template #TransportName-cell="{ row }">
          <div class="flex items-center gap-2">
            <!-- <UIcon :name="'i-lucide-circle'" :class="'size-2.5'" :mode="'css'" /> -->
            <svg
              width="12"
              height="13"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="6.32118"
                cy="6.60433"
                rx="6.32118"
                ry="6.60433"
                class="dark"
                :fill="`var(--ui-${row.getValue('Color')})`"
              />
            </svg>
            <span>{{ row.getValue('TransportName') }}</span>
          </div>
        </template>

        <template #Amount-cell="{ row }">
          <UBadge :label="row.getValue('Amount')" :variant="'soft'" :color="row.getValue('Color')" />
        </template>
      </UTable>
    </template>
  </UCard>
</template>

<style scoped>
.list-card {
  /* max-height: calc(100% - 20px); */
  overflow-y: auto;

  scrollbar-color: gray white;
}
</style>
