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
}
