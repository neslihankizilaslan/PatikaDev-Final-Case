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

describe('Car Rental App Test - Sign Up', () => {
  it('should sign up successfully', async () => {
    // Sign Up İşlemi
    const signUpButton = await driver.$('~sign_up_button_id');
    await signUpButton.click();

    const usernameField = await driver.$('~sign_up_username_field_id');
    await usernameField.setValue('newuser');

    const emailField = await driver.$('~sign_up_email_field_id');
    await emailField.setValue('newuser@example.com');

    const passwordField = await driver.$('~sign_up_password_field_id');
    await passwordField.setValue('password123');

    const confirmPasswordField = await driver.$('~sign_up_confirm_password_field_id');
    await confirmPasswordField.setValue('password123');

    const submitSignUpButton = await driver.$('~sign_up_submit_button_id');
    await submitSignUpButton.click();

    // Sign Up sonrası assert işlemi
    const welcomePageElement = await driver.$('~welcome_page_id');
    await expect(welcomePageElement).toBeDisplayed();  // Kayıt sonrası hoşgeldiniz sayfasının göründüğünü kontrol ediyoruz.
  });
});

after(async () => {
  await driver.deleteSession();
});
