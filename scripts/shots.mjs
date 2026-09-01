import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:3000'
const OUT = process.env.OUT || '/tmp/claude-1000/-home-vadym-projects-drugbin-cf/3823e821-7772-402b-b624-d927e8b3f1bc/scratchpad/shots'
const ADMIN_PW = process.env.ADMIN_PW || 'local-admin-password'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message))

const shot = async (name) => {
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  console.log('shot', name)
}

await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
await page.fill('input[name="email"]', 'admin@drugbin.ro')
await page.fill('input[name="password"]', ADMIN_PW)
await page.click('button[type="submit"]')
await page.waitForURL('**/admin/**', { timeout: 12000 }).catch(() => {})
await page.waitForLoadState('networkidle')
await shot('A1-spitale')

await page.getByRole('button', { name: 'Adaugă spital' }).click()
await shot('A2-spital-nou')
await page.mouse.click(4, 4)
await page.waitForTimeout(300)

const hrow = page.locator('tbody tr').first()
if (await hrow.count()) {
  await hrow.locator('button').first().click()
  await shot('A3-spital-detaliu')
  await page.mouse.click(4, 4)
  await page.waitForTimeout(300)
}

await page.getByText('Roboți', { exact: true }).first().click()
await page.waitForLoadState('networkidle')
await shot('A4-roboti')
await page.getByRole('button', { name: 'Adaugă robot' }).click()
await shot('A5-robot-nou')
await page.mouse.click(4, 4)
await page.waitForTimeout(300)

await page.getByText('Clasificări', { exact: true }).first().click()
await page.waitForLoadState('networkidle')
await shot('A6-clasificari')
const crow = page.locator('tbody tr').first()
if (await crow.count()) {
  await crow.click()
  await page.waitForTimeout(1500)
  await shot('A7-clasificare-detaliu')
}

await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${BASE}/admin/spitale`, { waitUntil: 'networkidle' })
await shot('A8-mobile')

await browser.close()
console.log('done ->', OUT)
