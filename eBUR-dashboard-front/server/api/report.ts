import { read } from 'xlsx'
import { readFileSync } from 'fs'

export default defineEventHandler((event) => {
  // const data = readFile('server/api/eBUR_Report.xlsx')
  const file = readFileSync('server/api/eBUR_Report.xlsx')

  const wb = read(file.buffer)

  return wb
})
