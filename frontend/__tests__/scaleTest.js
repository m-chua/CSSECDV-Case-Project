import { Builder, By, Key, until } from "../node_modules/selenium-webdriver/index.js";

const link = 'http://localhost:5173/'; //https://taft-eats.onrender.com/
(async function searchfound() {
    let browser = new Builder().forBrowser('chrome').build();
    const sleepTime = 2000;
    try {
        // Open a webpage
        await browser.get(link);


        /*testing search*/ 
        await browser.sleep(sleepTime);
        console.log("TESTING SEARCH");
        var search = await browser.findElement(By.name('search'));
        var inputText = 'taco';
        var rightOutput = true;
        await search.sendKeys(inputText);

        await search.sendKeys(Key.RETURN);

        await browser.wait(until.elementLocated(By.css('.bg-white.shadow-md')), 5000);
        await browser.sleep(sleepTime); 
        
        let tableRows = await browser.findElements(By.css('.bg-white.shadow-md tbody tr'));
        
      
        if (tableRows.length > 0) {
            
            for (let row of tableRows) {
                let name = await row.findElement(By.css('td:nth-child(1)')).getText();
                
                if (name.toLowerCase().includes(inputText)==false) 
                    rightOutput=false;
                
            }

            if(rightOutput){
                console.log("Success! All search queries contain " + inputText + '.');
            }else {console.log("Failure! Search query went wrong!")}
        } 
        

        search = await browser.findElement(By.name('search'));
        inputText = 'fhsgwoifjwoeifjsdoifj';
        var rightOutput = true;
        await search.sendKeys(inputText);

        await search.sendKeys(Key.RETURN);

        await browser.wait(until.elementLocated(By.name('noResult')), 50000);
        await browser.sleep(5000); 
        var errormsg = await browser.findElement(By.name("noResult")).getText();
        
        if (errormsg.includes("No results found for \""+inputText)) {
            console.log("Successs! Error message for no resto appears!");
        }else {console.log("Failure! Error message does not appear!");
            console.log("Actual Message: "+ errormsg);
        }

        await browser.sleep(15000);

    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        // Quit the browser
        await browser.quit();
    }
})();
