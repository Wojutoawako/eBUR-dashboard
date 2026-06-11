<script setup lang="ts">
import { eachDayOfInterval } from 'date-fns'
import type { Range } from '~/types'

const model = defineModel<string>({ required: true })

const { t } = useI18n()

const props = defineProps<{
  range: Range
}>()

const days = computed(() => eachDayOfInterval(props.range))

const periods = computed<string[]>(() => {
  if (days.value.length <= 8) {
    return [
      t('periodSelectDaily')
    ]
  }

  if (days.value.length <= 31) {
    return [
      t('periodSelectDaily'),
      t('periodSelectWeekly')
    ]
  }

  return [
    t('periodSelectWeekly'),
    t('periodSelectMonthly')
  ]
})

// Ensure the model value is always a valid period
watch(periods, () => {
  if (!periods.value.includes(model.value)) {
    model.value = periods.value[0]!
  }
})
</script>

<template>
  <USelect
    v-model="model"
    :items="periods"
    variant="ghost"
    class="data-[state=open]:bg-elevated"
    :ui="{ value: 'capitalize', itemLabel: 'capitalize', trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
  />
</template>
