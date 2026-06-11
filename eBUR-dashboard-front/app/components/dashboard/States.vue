<script setup lang="ts">
import type { DashboardGridWidget } from '~/types'

const widgetModel = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

let title = 'Статус рейса'

const mockData4 = useState('data4', () => [
  { Status: 'Активные', StatusValue: 44, Color: 'success' },
  { Status: 'В ожидании', StatusValue: 45, Color: 'warning' }
])

const mockData7 = useState('data7', () => [
  { Status: 'Назначенные', StatusValue: 55, Color: 'success' },
  { Status: 'Не назначенные', StatusValue: 206, Color: 'warning' }
])

if (widgetModel.value.id === '8') {
  title = 'Назначенный транспорт'
}

const mockData = () => {
  if (widgetModel.value.id === '0') {
    return mockData4
  }

  return mockData7
}
</script>

<template>
  <UCard
    class="list-card"
    :ui="{
      root: 'border-white outline-white',
      header: 'text-center text-highlighted bg-white',
      body: 'bg-white sm:px-6 sm:py-2.5'
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
        :ui="{
          td: 'text-highlighted',
          separator: 'hidden',
          thead: 'hidden',
          tr: 'border-0'
        }"
        :column-visibility="{
          ['Color']: false,
          ['StatusValue']: false
        }"
      >
        <template #Status-cell="{ row }">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <!-- <UIcon
                name="i-lucide:circle"
                class="size-2.5"
              /> -->

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
              <span>{{ row.getValue('Status') }}</span>
            </div>

            <UBadge :label="row.getValue('StatusValue')" :variant="'subtle'" :color="row.getValue('Color')" />
          </div>
        </template>
      </UTable>
    </template>
  </UCard>
</template>
