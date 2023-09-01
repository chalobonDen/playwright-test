import { test, devices, expect } from '@playwright/test'

const BASE_URL = 'https://staging.olufy.com/th'

const USER_DATA = {
  email: 'chalobon129@gmail.com',
  password: 'Test123456',
}

const NEW_USER_DATA = {
  email: 'chalobon-jaje@hotmail.com',
  password: 'Test123456',
}

const USER_REGISTER = {
  email: 'chalobon129+02@gmail.com',
  password: 'Test123456',
}

test.use({
  ...devices['iPhone 13 Pro'],
})

test.describe('user login', () => {
  test('login failed', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await page.fill('id=email', USER_DATA.email)
    await page.fill('id=password', 'Test12345677')
    await page.getByRole('main').getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page).toHaveURL(/login/)
  })

  test('login success', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await page.type('id=email', USER_DATA.email)
    await page.type('id=password', USER_DATA.password)
    await page.getByRole('main').getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page).toHaveURL(/app/)
  })

  test('login new user', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await page.fill('id=email', NEW_USER_DATA.email)
    await page.type('id=password', NEW_USER_DATA.password)
    await page.getByRole('main').getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page).toHaveURL(/setup-profile/)
  })
})

test.describe('register', () => {
  test('register', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'สมัครสมาชิก' }).click()
    await page.getByPlaceholder('กรอกอีเมล').click()
    await page.getByPlaceholder('กรอกอีเมล').fill(USER_REGISTER.email)
    await page.getByPlaceholder('กรอกรหัสผ่าน', { exact: true }).click()
    await page.getByPlaceholder('กรอกรหัสผ่าน', { exact: true }).fill(USER_REGISTER.password)
    await page.getByPlaceholder('กรอกรหัสผ่านอีกครั้ง').fill(USER_REGISTER.password)
    await page.getByRole('main').getByRole('button', { name: 'สมัครสมาชิก' }).click()
    await expect(page).toHaveURL(/setup-profile/)
  })

  test('setup-profile', async ({ page }) => {
    await page.goto('https://staging.olufy.com/th/login')
    await page.getByPlaceholder('กรอกอีเมล').fill(USER_REGISTER.email)
    await page.getByPlaceholder('กรอกรหัสผ่าน').fill(USER_REGISTER.password)
    await page.getByRole('main').getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await expect(page).toHaveURL(/setup-profile/)
    await page.getByPlaceholder('กรอกชื่อ - นามสกุล ภาษาไทย').fill('ชโลบล เด่นนินนาท')
    await page.getByPlaceholder('กรอกชื่อ - นามสกุล ภาษาอังกฤษ').fill('Chalobon Denninnart')
    await page.getByPlaceholder('กรอกเบอร์โทรศัพท์มือถือ').fill('0632529590')
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click()
    await page.getByPlaceholder('กรอกที่อยู่').fill('201')
    await page.getByPlaceholder('กรอกตำบล/แขวง').type('พระสิ')
    await page.getByRole('option', { name: 'พระสิงห์ / เมืองเชียงใหม่ / เชียงใหม่ / 50200' }).click()
    await page.getByLabel('ฉันยอมรับเงื่อนไขข้อตกลงการบริการ และและนโยบายความเป็นส่วนตัว').check()
    await page.getByRole('main').getByRole('button', { name: 'ยืนยัน' }).click()
    await expect(page).toHaveURL(/app/)
  })
})

test.describe('user logout', () => {
  test('user logout', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await page.type('id=email', USER_DATA.email)
    await page.type('id=password', USER_DATA.password)
    await page.getByRole('main').getByRole('button', { name: 'เข้าสู่ระบบ' }).click()
    await page.getByRole('button', { name: 'Chalobon Denninnart' }).click()
    await page.getByRole('menuitem', { name: 'ออกจากระบบ' }).click()
  })

  test('user logout with setup profile page (new user)', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)
    await page.getByPlaceholder('กรอกอีเมล').fill(NEW_USER_DATA.email)
    await page.getByPlaceholder('กรอกรหัสผ่าน').fill(NEW_USER_DATA.password)
    await page.getByPlaceholder('กรอกรหัสผ่าน').press('Enter')
    await page.locator('[id="headlessui-menu-button-\\:rl\\:"]').getByRole('button').click()
    await page.getByRole('menuitem', { name: 'ออกจากระบบ' }).click()
  })
})
