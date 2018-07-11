/* eslint-env detox/detox */
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('ログイン画面からメールアドレスを入力してログインできる', async () => {
    await expect(element(by.text('ログイン'))).toBeVisible()
    await element(by.id('email')).typeText('abc@example.com')
    await element(by.id('login')).tap()
    await expect(element(by.text('ユーザ'))).toBeVisible()
  })
})