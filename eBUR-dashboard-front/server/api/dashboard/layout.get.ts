import { readFileSync } from 'node:fs'

export default defineEventHandler((event) => {
  const data = readFileSync('server/utils/dashboard/layout/default.json', 'utf-8')

  return data
})
