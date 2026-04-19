import {
  createDirectus,
  readItems,
  readItem,
  readSingleton,
  rest,
  staticToken,
} from '@directus/sdk'
import Queue from 'p-queue'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchRetry = async (count: number, ...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args)

  if (count > 2 || response.status !== 429) return response

  console.warn(`[429] Too Many Requests (Attempt ${count + 1})`)
  await sleep(500)
  return fetchRetry(count + 1, ...args)
}

const queue = new Queue({
  intervalCap: 10,
  interval: 500,
  carryoverConcurrencyCount: true,
})

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL as string
const directusToken = process.env.DIRECTUS_PUBLIC_TOKEN as string

export const directusInstance = createDirectus(
  directusUrl || 'http://localhost:8055',
  {
    globals: {
      fetch: (...args) => queue.add(() => fetchRetry(0, ...args)),
    },
  },
).with(staticToken(directusToken)).with(rest())

export { readItems, readItem, readSingleton, staticToken }
