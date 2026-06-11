<script setup lang="ts">
import type { DashboardGridWidget } from '~/types'

const widgetModel = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

const mockData5 = useState('data5', () => [
  { Title: 'Доходы', Icon: 'i-lucide:arrow-up', Value: '557000р.', Difference: '+24%', Color: 'success' },
  { Title: 'Расходы', Icon: 'i-lucide:arrow-down', Value: '112000р.', Difference: '+24%', Color: 'error' }
])

const mockData6 = useState('data6', () => [
  { Title: 'Количество рейсов', Icon: 'i-lucide:truck', Value: 357, Difference: '+24%', Color: 'success' },
  { Title: 'Стоимость простоя', Icon: 'i-lucide:russian-ruble', Value: '5000р.', Difference: '+24%', Color: 'error' }
])

const mockData = () => {
  if (widgetModel.value.id === '3') {
    return mockData5
  }

  return mockData6
}
</script>

<template>
  <UCard
    class="list-card"
    :ui="{
      root: 'border-white outline-white',
      body: 'bg-white'
    }"
  >
    <template #default>
      <UTable
        :data="mockData().value"
        :ui="{ td: 'text-highlighted sm:px-2.5 sm:py-2', thead: 'hidden', tr: 'border-0' }"
        :column-visibility="{
          ['Color']: false,
          ['Icon']: false,
          ['Value']: false,
          ['Difference']: false
        }"
      >
        <template #Title-cell="{ row }">
          <div class="flex flex-col items-center">
            <span class="text-base">{{ row.getValue('Title') }}</span>

            <div class="flex justify-between self-stretch items-center gap-5">
              <UIcon :name="row.getValue('Icon')" :size="'30px'" />
              <span>{{ row.getValue('Value') }}</span>

              <UBadge
                :label="row.getValue('Difference')"
                :variant="'soft'"
                :color="row.getValue('Color')"
              />
            </div>
          </div>
        </template>
      </UTable>
    </template>
  </UCard>
</template>

<style scoped>
</style>
