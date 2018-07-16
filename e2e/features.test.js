const APP_BASE_URL = 'http://localhost:8080';

module.exports = {
  'Users can see home page': (client) => {
    client
      .url(APP_BASE_URL)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_URL}/`)
      .pause(2000)
      .assert.visible('body')
      .assert.visible('.navbar')
      .assert.containsText('#brand-logo', 'Party palace')
      .assert.containsText('#centers', 'CENTERS')
      .assert.containsText('#register', 'REGISTER')
      .assert.containsText('#login', 'LOGIN')
      .assert.visible('section#introduction')
      .assert.visible('h1')
      .assert.containsText('h1','Party like there is no tomorrow!')
      .assert.visible('p')
      .assert.containsText(
        'p', `Do you plan to hold your dream event, we have centers that can meet your needs.`)
      .assert.visible('#cta-btn')
      .assert.containsText('#cta-btn','Book a center')
      .assert.visible('#header')
      .assert.visible('#footer')
  },

  'Users cannot signup if username is taken': (client) => {
    client
      .url(`${APP_BASE_URL}/register`)
      .waitForElementVisible('body', 2000)
      .assert.visible('body')
      .assert.visible('.register-page')
      .pause(3000)
      .url(`${APP_BASE_URL}/register`)
      .waitForElementVisible('body', 2000)
      .setValue('input[name=username]', 'demola')
      .setValue('input[name=email]', 'demola1@test.com')
      .setValue('input[name=password]', '123456')
      .setValue('input[name=confirmPassword]', '123456')
      .click('#register-btn')
      .pause(3000)
      .waitForElementVisible('div.toast', 3000)
      .assert.visible('div.toast')
      .assert.containsText('div.toast', 'Username taken!')
      .pause(2000)
      .clearValue('input[name=username]')
  },

  'Users cannot signup if email is taken': (client) => {
    client
      .setValue('input[name=username]', 'sam')
      .click('#register-btn')
      .pause(3000)
      .waitForElementVisible('div.toast', 3000)
      .assert.visible('div.toast')
      .assert.containsText('div.toast', 'Another account uses this email!')
      .pause(2000)
  },

  'Users can signup': (client) => {
    client
      .clearValue('input[name=username]')
      .clearValue('input[name=email]')
      .clearValue('input[name=password]')
      .clearValue('input[name=confirmPassword]')
      .setValue('input[name=username]', 'thor')
      .setValue('input[name=email]', 'thor@test.com')
      .setValue('input[name=password]', '123456')
      .setValue('input[name=confirmPassword]', '123456')
      .click('#register-btn')
      .pause(3000)
      .waitForElementVisible('div.toast', 3000)
      .assert.visible('div.toast')
      .assert.containsText('div.toast', 'Registration successful!')
      .pause(2000)
  },

  'Users can get the details of a center': (client) => {
    client
      .click('.center-list')
      .waitForElementVisible('body', 2000)
      .assert.visible('.card-main')
      .assert.visible('.card-img')
      .assert.visible('.name-capacity')
      .assert.visible('.price')
      .pause(2000)
  },

  'Users can logout': (client) => {
    client
      .click('#logout')
      .pause(2000)
      .waitForElementVisible('body', 2000)
      .assert.containsText('#brand-logo', 'Party palace')
  },

  'Users can login': (client) => {
    client
    .url(`${APP_BASE_URL}/login`)
    .waitForElementVisible('body', 2000)
    .assert.visible('.login-page')
    .setValue('input[name=email]', 'demola@test.com')
    .setValue('input[name=password]', '123456')
    .click('#login-btn')
    .pause(3000)
    .waitForElementVisible('div.toast', 3000)
    .assert.visible('div.toast')
    .assert.containsText('div.toast', 'Welcome Demola!')
    .pause(2000)
  },

  'Users can create a center': (client) => {
    client
      .url(`${APP_BASE_URL}/centers`)
      .waitForElementVisible('body', 2000)
      .assert.visible('a.float')
      .click('a.float')
      .waitForElementVisible('body', 3000)
      .pause(2000)
      .assert.visible('.add-center-page')
      .setValue('input[name=name]', 'enders hall')
      .setValue('input[name=location]', 'lagos')
      .setValue('input[name=capacity]', '4000')
      .setValue('input[name=price]', '50000')
      .setValue(
        'input[type="file"]',
        require('path').resolve('/Users/andeladeveloper/Desktop/testimage.jpg'))

  },

  'Users can update a center': () => {

  },

  'Users can delete a center': () => {

  },
}
