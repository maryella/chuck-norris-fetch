"use strict";

//const getMoreQuotesButton = document.getElementById("getMoreQuotes");
//--const chuckSays = document.getElementById("chuckSays")
//--const chuckImage = document.getElementById("chuckImage")
//const chuckQuotesWrapper = document.querySelector("#chuckQuotes")

// Add an event listener to the button, DON'T FORGET TO PREVENT THE DEFAULT BEHAVIOR!
// Call a function to return a new quote, and update the DOM
//getMoreQuotesButton.addEventListener("click", function(e) {
//    console.log("button clicked")
//    updateChuckSays("dev");
//});

// above - delete old way, create new elements
const chuckQuotesForm = document.querySelector("#chuckQuotesForm")


chuckQuotesForm.addEventListener("submit", function(event){
    event.preventDefault();
    const categoryValue = chuckQuotesForm.querySelector("select").value;
    updateChuckSays(categoryValue);
})

function updateChuckSays(category) {
    const chuckQuote = get(
        `https://api.chucknorris.io/jokes/random?category=${category}`);
        
    chuckQuote.then(function(quote){
         chuckSays.innerText = quote.value;
    //     chuckImage.src = quote.icon_url;
    })

}

function getCategories(){
    const categoryList = document.createElement("select");
    const selectWrapper = document.querySelector("#selectWrapper")
    get(`https://api.chucknorris.io/jokes/categories`)
        .then(function(response){
            response.forEach(function(category){
                const categoryOption = document.createElement("option")
                categoryOption.text = category;
                categoryOption.value = category;

                if (category !== "explicit"){
                    categoryList.append(categoryOption);
                }
            });
        })
    selectWrapper.append(categoryList)
    }

//create IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
(function(){
    const defaultCategory = "dev"
    getCategories();
    updateChuckSays(defaultCategory);
})()

