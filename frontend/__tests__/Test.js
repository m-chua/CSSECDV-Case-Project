import { Builder, By, Key, until } from "../node_modules/selenium-webdriver/index.js";

const link = 'http://localhost:5173/'; //https://taft-eats.onrender.com/

(async function frontendTests() {
    let browser = new Builder().forBrowser('chrome').build();
    const sleepTime = 3500;
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
        /* test login invalid then valid*/ 
        console.log("TESTING INVALID LOGIN");
        await browser.sleep(sleepTime);
        var loginButton = await browser.findElement(By.partialLinkText('Log In'));
        await loginButton.click();
        var usernameBox = await browser.findElement(By.id('loginUsername'));
        var passBox = await browser.findElement(By.id('loginPassword'));
        var user = "invalid username sdfghjkl";
        var pass = "invalid password sdfghjk";
        await usernameBox.sendKeys(user);
        await passBox.sendKeys(pass);
        await passBox.sendKeys(Key.RETURN);

        try {
        browser.findElements(By.name('invalidAuth'));
        console.log("Success! Invalid Auth error message appears.")
        } catch (err) {
        console.log("Failure! Invalid Auth error message missing.")
        }
        //test valid
        console.log("TESTING VALID LOGIN");
        usernameBox.clear();
        passBox.clear();
        var user = "jane_smith";
        var pass = "password123";
        await usernameBox.sendKeys(user);
        await passBox.sendKeys(pass);
        await passBox.sendKeys(Key.RETURN);
        await browser.sleep(sleepTime); 
        var currentUrl = await browser.getCurrentUrl()

        if(currentUrl==link+"profile")
            console.log("Success! Login redirected to target link.");
        else{
            console.log("Failure! Login redirected to wrong link.");
            console.log("Target link: " + link);
            console.log("Current link:" + browser.getCurrentUrl())
        }

        
        //test logout (redirect to link/login)
        console.log("TESTING LOGOUT");
        await browser.sleep(sleepTime);
        var profileDropdown = await browser.findElement(By.name('NavBarPFP'));
        await browser.sleep(sleepTime);
        await profileDropdown.click();
        var logoutButton = await browser.findElement(By.name('logoutButton'));
        await logoutButton.click();
        await browser.sleep(sleepTime); 
        var currentUrl = await browser.getCurrentUrl()

        if(currentUrl==link+"login")
            console.log("Success! Logout redirected to target link.");
        else{
            console.log("Failure! Logout redirected to wrong link.");
            console.log("Target link: " + link+"login");
            console.log("Current link:" + browser.getCurrentUrl())
        }

        //registration
        console.log("TESTING SIGN UP")
        var SignUpButton = await browser.findElement(By.name('SignUp'));
        await SignUpButton.click();
        console.log("TESTING INVALID SIGN UP");
        usernameBox = await browser.findElement(By.id('username'));
        passBox = await browser.findElement(By.id('password'));
        var passBox2 = await browser.findElement(By.id('confirmPassword'));
        user = "john_doe" // user already used == invalid
        pass = "invalid password sdfghjk"
        await usernameBox.sendKeys(user);
        try {
            await browser.findElements(By.name('UserExists'));
            console.log("Success! User Exists error message appears.")
            } catch (err) {
            console.log("Failure! User Exists error message missing.")
            }
        await passBox.sendKeys(pass);
        await passBox2.sendKeys(pass+"asdfghj");
        await passBox2.sendKeys(Key.RETURN);
        try {
            await browser.findElements(By.name('PassDiff'));
            console.log("Success! Passwords different error message appears.");
            } catch (err) {
            console.log("Failure! Passwords different error message missing.");
            }

        
        console.log("TESTING VALID SIGN UP");
        await usernameBox.clear();
        
        
        user = "bob_ross"; 
        pass = "valid pass";
        await usernameBox.sendKeys(user);
        
        await passBox.clear();
        
        await passBox.sendKeys(pass);
        await passBox2.clear();
        await passBox2.sendKeys(pass);
        await passBox2.sendKeys(Key.RETURN);

        await browser.sleep(sleepTime);
        var usernameBoxLogin = await browser.findElement(By.id('loginUsername'));
        var passBoxLogin = await browser.findElement(By.id('loginPassword'));
        
        await usernameBoxLogin.sendKeys(user);
        await passBoxLogin.sendKeys(pass);
        await passBoxLogin.sendKeys(Key.RETURN);
        await browser.sleep(sleepTime);
        var currentUrl = await browser.getCurrentUrl();

        if(currentUrl==link+"profile")
            console.log("Success! Registered details saved and usable.");
        else{
            console.log("Failure! Registered details not usable.");
        }
        console.log("TESTING EDIT PROFILE");
        browser.navigate().to(link+"profile");
        var editProf = await browser.findElement(By.name('editProf'));
        await editProf.click();
        var newUser = "new Username";
        var newBio = "new Bio";
        var cuisineChoice = "Italian";
        await browser.sleep(sleepTime);
        var newUserField = await browser.findElement(By.id('newUsername'));
        var newBioField = await browser.findElement(By.id('newBio'));
        var cuisine = await browser.findElement(By.name(cuisineChoice));
        var submit = await browser.findElement(By.name('submit'));

        await newUserField.clear();
        
        await newUserField.sendKeys(newUser);
        await newBioField.sendKeys(newBio);
        await cuisine.click();
        await browser.sleep(sleepTime)
        await submit.click();

        await browser.sleep(sleepTime);
        var user = await browser.findElement(By.name('user')).getText();
        if(user == newUser)
            console.log("Success! Username changed.")
        else   
            console.log("Failure! Username not updated .")
            
        var bio = await browser.findElement(By.name('bio')).getText();
        if(bio == newBio)
            console.log("Success! Bio changed.")
        else 
        console.log("Failure! Bio not updated.")
            
        console.log(cuisineChoice);
        var cuisineText = await browser.findElement(By.name(cuisineChoice)).getText();
        if( cuisineText == cuisineChoice)
            console.log("Success! Cuisine changed.");
        else
            console.log("Failure! Cuisine not updated.");
        //go to home
        browser.navigate().to(link);
        await browser.navigate().to(link);
        await browser.sleep(sleepTime);
        var firstResto = await browser.findElement(By.linkText("View Details"));
        await firstResto.click();
        await browser.sleep(sleepTime);
        var RevTitle = "Test Title";
        var starRating = "3";
        var content = "Test content";

        console.log("TESTING LEAVE REVIEW");
        var review = await browser.findElement(By.name("writeReviewButton"));
        await review.click();
        await browser.wait(until.elementLocated(By.id('title')), 500);
        
        var title = await browser.findElement(By.id("title"));
        var stars = await browser.findElement(By.name(starRating));
        var reviewactual = await browser.findElement(By.id("content"));
        await title.sendKeys(RevTitle);
        await stars.click();
        await reviewactual.sendKeys(content);
        var submit = await browser.findElement(By.name("submit"));
        await submit.click();
        console.log("TESTING EDIT REVIEW");
        var newTitle = "New Title";
        var starRating = "1";
        var content = "I hate this place!";
        await browser.sleep( sleepTime);
        var editrevbutton = await browser.findElement(By.name("editReviewButton"));
        await editrevbutton.click(); 
        var title = await browser.findElement(By.id("title"));
        var stars = await browser.findElement(By.name(starRating));
        var reviewactual = await browser.findElement(By.id("content"));
        await title.clear();
        await title.sendKeys(newTitle);
        await stars.click();
        await reviewactual.clear();
        await reviewactual.sendKeys(content);
        var submit = await browser.findElement(By.name("submit"));
        await submit.click();
        
        console.log("Success! Review was made and edited!");
        console.log("TESTING DELETE REVIEW")
        await browser.sleep( sleepTime);
        var deleteRev = await browser.findElement(By.name("deleteReviewButton"));
        await deleteRev.click();
        var deleteRev = await browser.findElement(By.name("confirmDelete"));
        await deleteRev.click();
        console.log("Review deleted with delete confirmation.")
        var key = "Pizza"
        await browser.sleep(sleepTime);
        var search = await browser.findElement(By.id("revsearch"));
        await search.sendKeys(key);
        await browser.wait(until.elementsLocated(By.css('.revsearch')), 5000);

        // Get all result rows
        const resultRows = await browser.findElements(By.css('.revsearch'));
        console.log(`Found ${resultRows.length} results.`);

        // Verify each result contains the search key
        let allContainSearchKey = true;
        for (let row of resultRows) {
            const rowText = await row.getText();
            if (!rowText.toLowerCase().includes(key.toLowerCase())) {
                allContainSearchKey = false;
                console.error(`Row does not contain search key: ${rowText}`);
            }
        }

        if (allContainSearchKey) {
            console.log(`Success! All results contain the search key: "${key}"`);
        } else {
            console.log('Failusre! ome results do not contain the search key.');
        }

        
        var replybutton = await browser.findElement(By.name("replyToReview"));
        await replybutton.click();
        var replybutton = await browser.findElement(By.name("replyContent"));
        var content = "sample reply asdfgh";
        await replybutton.sendKeys(content);
        var submitrep = await browser.findElement(By.name("submitReply"));
        await submitrep.click();
        await browser.sleep(sleepTime);
        var search = await browser.findElement(By.id("revsearch"));
        await search.sendKeys(content);
        var replies = await browser.findElements(By.css(".replyText"));

        let findingNewReply = true;
        for (let row of replies) {
            const rowText = await row.getText();
            if (!rowText.toLowerCase().includes(content.toLowerCase())) {
                findingNewReply = false;
                console.error(`Row does not contain search key: ${rowText}`);
            }
        }

        if (findingNewReply) {
            console.log(`Success! Found new reply with the search key: "${content}"`);
        } else {
            console.log('Failusre! New reply not found.');
        }


        browser.navigate().to(link);
        await browser.navigate().to(link);
        console.log("ABOUT PAGE");
        await browser.sleep(sleepTime*3);
        
        var about = await browser.findElement(By.linkText("About"));
        about.click();
        await browser.sleep(sleepTime);
        currentUrl = await browser.getCurrentUrl();
        if(currentUrl==link+"about"){
            console.log("Success! About page found.");
        }
        else {console.log("Failure! About page missing!");
            console.log("Current URL"+ currentUrl);
            console.log("Target URL: " + link + "about");
        }
        
        console.log("TESTING ADDING RESTO")
        browser.navigate().to(link);
        await browser.sleep(sleepTime);
        var restoSignUp = await browser.findElement(By.linkText("Add Your Restaurant"));
        await restoSignUp.click();
        await browser.sleep(sleepTime);

        var restoUser = "resto Username";
        var averageCost = 300;
        var description = "resto desc";
        var add = "DLSU";
        var phoneNum = "phone Num";
        var web = "website.com";
        var hrs = "Monday- Tuesday";
        var cuisineChoice = "Italian";
        var username = "Fake Resto";
        var picture ="C:/Users/mla/Documents/micole/coding/priv-sweng/backend/public/uploads/avatars/1730445679857-201075277.jpg"
        var password = "Fake password";
        var amm = "Offers Delivery"
        await browser.sleep(sleepTime);

        var restoname = await browser.findElement(By.id('name'));
        var cost = await browser.findElement(By.id('averageCost'));
        var desc = await browser.findElement(By.id('description'));
        var address = await browser.findElement(By.id('address'));
        var phone = await browser.findElement(By.id('phone'));
        var pic = await browser.findElement(By.id('media'));
        var website = await browser.findElement(By.id('website'));
        var hours = await browser.findElement(By.id('hours'));
        var cuisine = await browser.findElement(By.name(cuisineChoice));
        //console.log(cuisine);
        var user = await browser.findElement(By.id('username'));
        var pass = await browser.findElement(By.id('password'));
        var ammenities = await browser.findElement(By.name(amm));
        var confirmPass = await browser.findElement(By.id('confirmPassword'));
        var submit = await browser.findElement(By.id('submit'));

        await browser.sleep(sleepTime)
        await restoname.sendKeys(restoUser);

        await cuisine.click();
        await cost.sendKeys(averageCost);
        await desc.sendKeys(description);
        await pic.sendKeys(picture);
        await address.sendKeys(add);
        await phone.sendKeys(phoneNum);
        await website.sendKeys(web);
        await hours.sendKeys(hrs);
        await user.sendKeys(username);
        await pass.sendKeys(password);
        await confirmPass.sendKeys(password);
        await ammenities.click();

        await submit.click();
        await browser.sleep(sleepTime);
        /* add verification*/
        console.log("TESTING EDIT RESTO")

        var profileDropdown = await browser.findElement(By.name('NavBarPFP'));
        await browser.sleep(sleepTime);
        await profileDropdown.click();
        var logoutButton = await browser.findElement(By.name('logoutButton'));
        await logoutButton.click();
        await browser.sleep(sleepTime); 
        var usernameBoxLogin = await browser.findElement(By.id('loginUsername'));
        var passBoxLogin = await browser.findElement(By.id('loginPassword'));
        
        await usernameBoxLogin.sendKeys(username);
        await passBoxLogin.sendKeys(password);
        await passBoxLogin.sendKeys(Key.RETURN);
        await browser.sleep(sleepTime);
        console.log("Success! Resto Added + can log in");
        console.log("TESTING EDIT RESTO");
        
        browser.executeScript("window.scrollTo(0, -250)");
        var editRestoButton = await browser.findElement(By.name('editResto'));
        await browser.executeScript('arguments[0].scrollIntoView(true);', editRestoButton);
        await browser.executeScript("window.scrollTo(0, -100);");
        await browser.sleep(sleepTime)
        await editRestoButton.click();
        
        await browser.executeScript('arguments[0].click();', editRestoButton);
        var newRestoName = "mcdo";
        var newWebsite = "https://mcdo.com";
        var restoName = await browser.findElement(By.name('name'));
        var web = await browser.findElement(By.name("website"));
        await restoName.clear();
        await restoName.sendKeys(newRestoName);
        await web.clear();
        await web.sendKeys(newWebsite);
        await browser.sleep(sleepTime);
        await browser.executeScript("window.scrollTo(0, 250);");
        var submit = await browser.findElement(By.name('submit'));
        await submit.click();
        await browser.sleep(sleepTime);
        var updatedName = await browser.findElement(By.name("restoName")).getText();
        var updatedWeb = await browser.findElement(By.name("restoWebsite")).getText();

        if((updatedName == newRestoName) & (updatedWeb==newWebsite)){
            console.log("Success! Resto details updated.");
            
        }else{ 
            console.log("Failure! Resto details not updated.");
            console.log(updatedName+" : "+newRestoName);
            console.log(updatedWeb+" : "+newWebsite);
        }

        //logout
        var profileDropdown = await browser.findElement(By.name('NavBarPFP'));
        await browser.sleep(sleepTime);
        await profileDropdown.click();
        var logoutButton = await browser.findElement(By.name('logoutButton'));
        await logoutButton.click();
        await browser.sleep(sleepTime); 

        var usernameBox = await browser.findElement(By.id('loginUsername'));
        var passBox = await browser.findElement(By.id('loginPassword'));
        var user = "pastaLover";
        var pass = "securePassword1";
        await usernameBox.sendKeys(user);
        await passBox.sendKeys(pass);
        await passBox.sendKeys(Key.RETURN);
        await browser.sleep(sleepTime);
        var replybutton = await browser.findElement(By.name("replyToReview"));
        await replybutton.click();
        var replybutton = await browser.findElement(By.name("replyContent"));
        var content = "sample reply asdfgh";
        await replybutton.sendKeys(content);
        var submitrep = await browser.findElement(By.name("submitReply"));
        await submitrep.click();
        await browser.sleep(sleepTime);
        var replies = await browser.findElements(By.name("replyText"));

        let findingNewReplyResto = true;
        for (let row of replies) {
            const rowText = await row.getText();
            if (!rowText.toLowerCase().includes(content.toLowerCase())) {
                findingNewReplyResto = false;
                console.error(`Row does not contain search key: ${rowText}`);
            }
        }

        if (findingNewReplyResto) {
            console.log(`Success! Found new reply with the search key: "${content}"`);
        } else {
            console.log('Failusre! New reply not found.');
        }

        await browser.sleep(15000);

    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        // Quit the browser
        await browser.quit();
    }
})();
