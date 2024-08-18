const { remote } = require('webdriverio');

let driver;

before(async () => {
  driver = await remote({
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "11.0",
      deviceName: "Android Emulator",
      app: "/path/to/your/app.apk",
      automationName: "UiAutomator2"
    }
  });
});

describe('Car Rental App Test', () => {
  it('should log in and log out successfully', async () => {
    // Login İşlemi
    const loginButton = await driver.$('~login_button_id');
    await loginButton.click();

    const usernameField = await driver.$('~username_field_id');
    await usernameField.setValue('FMSS Software');

    const passwordField = await driver.$('~password_field_id');
    await passwordField.setValue('FmSs1234');

    const submitButton = await driver.$('~submit_button_id');
    await submitButton.click();

    // Başarılı girişten sonra assert ekleyebiliriz
    const homePageElement = await driver.$('~home_page_id');
    await expect(homePageElement).toBeDisplayed();  // Örneğin ana sayfada bir elementin görünür olduğunu kontrol edebiliriz.

    // Logout İşlemi
    const profileButton = await driver.$('~profile_button_id');
    await profileButton.click();

    const logoutButton = await driver.$('~logout_button_id');
    await logoutButton.click();

    // Çıkış sonrası assert işlemi
    const loginPageElement = await driver.$('~login_page_id');
    await expect(loginPageElement).toBeDisplayed();  // Login sayfasına dönüldüğünü kontrol ediyoruz.
  });
});

after(async () => {
  await driver.deleteSession();
});
