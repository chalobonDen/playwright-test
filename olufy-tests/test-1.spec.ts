import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto(
    'https://www.google.com/search?q=youtube&oq=youtube&aqs=chrome..69i57.5515j0j2&sourceid=chrome&ie=UTF-8',
  )
  await page.goto('https://www.youtube.com/')
  await page.getByPlaceholder('Search').click()
  await page.getByPlaceholder('Search').fill('playw')
  await page.getByPlaceholder('Search').press('ArrowDown')
  await page.getByPlaceholder('Search').press('ArrowDown')
  await page.getByPlaceholder('Search').press('ArrowUp')
  await page.getByPlaceholder('Search').press('Enter')
})
