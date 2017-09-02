var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var _ = require('underscore');
var VARS = {};

var globalTimeout = 60*1000;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.controlFlow().on('uncaughtException', function(err) {
    console.log('There was an uncaught exception: ' + err);
});

driver.get("http://localhost:3000/");
console.log("successfully opened url");
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input")).clear();
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input")).sendKeys("PA1");
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input")).clear();
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input")).sendKeys("max@123");
driver.findElement(By.xpath("//div[@id='app']//button[.='Submit']")).click();

driver.quit();
