module.exports = {
    before : function(browser) {

      //Declaring Global Timeout
      browser.globals.waitForConditionTimeout = 5000;
    },

  
    'ContentCheck' : function (browser) {
    browser
      .url('http://localhost:5000/')

      .setValue('input[type=text]', 'Marvel')  //Search 1
      .click('input[type="Submit"]')
      .assert.visible('.card')

      .click('#allclr')

      .setValue('input[type=text]', 'Jones')   //Search 2
      .click('input[type="Submit"]')
      .verify.visible('.card')
  },

  'IncorrectContentCheck' : function (browser) {
    browser
      .url('http://localhost:5000/')

      .setValue('input[type=text]', 'hgfblufdhfih')  // No Results should be obtained for this keyword
      .click('input[type="Submit"]')

      .assert.containsText('#displaydata p','No results found')  

  },

  after : function(browser) {
    browser.end();
  }

}