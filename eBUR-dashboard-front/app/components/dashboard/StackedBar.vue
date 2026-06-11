<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip, VisStackedBarSelectors, VisAnnotations } from '@unovis/vue'
import type { GenericDataRecord, Spacing } from '@unovis/ts'
import type { DashboardGridWidget } from '~/types'
import type { GridStackOptions } from 'gridstack'

const widgetModel = defineModel<DashboardGridWidget>('widget', {
  default: { h: 1 }
})

const optionsModel = defineModel<GridStackOptions>('options', {
  required: true
})

let title = 'Рейсы водителей, (шт.)'
let isVertical = false

const mockData1 = useState('data1', () => [
  { X: 'Карасев', Y: 40 },
  { X: 'Попова', Y: 73 },
  { X: 'Антонова', Y: 44 },
  { X: 'Карасев', Y: 40 },
  { X: 'Попова', Y: 73 },
  { X: 'Антонова', Y: 44 },
  { X: 'Карасев', Y: 40 },
  { X: 'Попова', Y: 73 },
  { X: 'Антонова', Y: 44 },
  { X: 'Карасев', Y: 40 },
  { X: 'Попова', Y: 73 },
  { X: 'Антонова', Y: 44 },
  { X: 'Карасев', Y: 40 },
  { X: 'Попова', Y: 73 },
  { X: 'Антонова', Y: 44 }
])

const mockData8 = useState('data8', () => [
  { X: 1, Y: 2 },
  { X: 2, Y: 6 },
  { X: 3, Y: 8 },
  { X: 4, Y: 6 },
  { X: 5, Y: 10 },
  { X: 6, Y: 12 },
  { X: 7, Y: 6 },
  { X: 8, Y: 4 },
  { X: 9, Y: 8 },
  { X: 10, Y: 10 },
  { X: 11, Y: 12 },
  { X: 12, Y: 4 },
  { X: 13, Y: 2 },
  { X: 14, Y: 6 },
  { X: 15, Y: 10 },
  { X: 16, Y: 12 },
  { X: 17, Y: 4 },
  { X: 18, Y: 2 },
  { X: 19, Y: 2 },
  { X: 20, Y: 6 },
  { X: 21, Y: 8 }
])

const mockData9 = useState('data9', () => [
  { X: 1, Y: 20 },
  { X: 2, Y: 60 },
  { X: 3, Y: 80 },
  { X: 4, Y: 60 },
  { X: 5, Y: 100 },
  { X: 6, Y: 120 },
  { X: 7, Y: 60 },
  { X: 8, Y: 40 },
  { X: 9, Y: 80 },
  { X: 10, Y: 100 },
  { X: 11, Y: 120 },
  { X: 12, Y: 40 },
  { X: 13, Y: 20 },
  { X: 14, Y: 60 },
  { X: 15, Y: 100 },
  { X: 16, Y: 120 },
  { X: 17, Y: 40 },
  { X: 18, Y: 20 },
  { X: 19, Y: 20 },
  { X: 20, Y: 60 },
  { X: 21, Y: 80 }
])

if (widgetModel.value.id === '7') {
  title = 'Время простоя, (тыс. руб.)'
  isVertical = true
} else if (widgetModel.value.id === '6') {
  title = 'Расход топлива, (тыс. руб.)'
  isVertical = true
}

const mockData = () => {
  if (widgetModel.value.id === '7') {
    return mockData8
  } else if (widgetModel.value.id === '6') {
    return mockData9
  }

  return mockData1
}

const x = (d: GenericDataRecord, i: number) => i
const y = (d: GenericDataRecord) => d.Y

const margin = { left: 5, bottom: 5, right: 10, top: 20 } as Spacing
const height = computed(() =>
  optionsModel.value.cellHeight?.valueOf() as number * (widgetModel.value.h ?? 1)
  - ((margin.top ?? 0) + (margin.bottom ?? 0))
)

const triggers = {
  [VisStackedBarSelectors.barGroup]: (d: GenericDataRecord) => {
    return `
      <span>${d.X}: ${d.Y}</span>
    `
  }
}
</script>

<template>
  <VisXYContainer :data="mockData().value" :height="height" :margin="margin">
    <VisStackedBar
      :x="x"
      :y="y"
      :color="'var(--data-color-0)'"
      :orientation="isVertical ? 'vertical' : 'horizontal'"
    />

    <VisAxis
      :type="isVertical ? 'x' : 'y'"
      :x="x"
      :num-ticks="mockData().value.length"
      :tick-format="(i: number) => mockData().value[i]?.X ?? ''"
      :domain-line="false"
    />
    <VisAxis :type="isVertical ? 'y' : 'x'" />

    <VisTooltip :triggers="triggers" />

    <VisAnnotations :items="[{ content: { text: title, fontSize: 16 }, y: -18 }]" />
  </VisXYContainer>
</template>
