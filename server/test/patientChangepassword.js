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
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input")).clear(); 
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[1]/div/input")).sendKeys("PA1"); 
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input")).clear(); 
driver.findElement(By.xpath("//div[@id='app']/div/div/div[2]/div/form/div[2]/div/input")).sendKeys("max@123"); 
driver.findElement(By.xpath("//div[@id='app']//button[.='Submit']")).click(); 
driver.findElement(By.id("imgSize")).click(); 
driver.findElement(By.xpath("//div[@id='app']//button[.='Change password']")).click(); 
driver.findElement(By.id("pwd")).clear(); 
driver.findElement(By.id("pwd")).sendKeys("max@123"); 
driver.findElement(By.id("pwd2")).clear(); 
driver.findElement(By.id("pwd2")).sendKeys("max@1234"); 
driver.findElement(By.id("pwd3")).click(); 
driver.findElement(By.id("pwd2")).clear(); 
driver.findElement(By.id("pwd2")).sendKeys("max@123"); 
driver.findElement(By.id("pwd3")).clear(); 
driver.findElement(By.id("pwd3")).sendKeys("max@123"); 
driver.findElement(By.css("button.btn.btn-warning")).click(); 
driver.findElement(By.id("iconPosition1")).click(); 
driver.findElement(By.css("body")).click(); 

driver.quit();
