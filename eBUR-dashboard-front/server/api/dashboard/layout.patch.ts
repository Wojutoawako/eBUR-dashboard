import { writeFileSync } from 'node:fs'

export default defineEventHandler(async (event) => {
  const body = await readBody<object>(event)
  writeFileSync('server/utils/dashboard/layout/default.json', JSON.stringify(body, null, 2))
  console.log('Layout file write')
  return
})
