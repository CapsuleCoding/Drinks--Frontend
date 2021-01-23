const drinksURL = "http://localhost:3000/drinks"
const ingredientsURL = "http://localhost:3000/ingredients"
const drinkForm = document.getElementById("drink-form")
const imageInput = document.getElementById("input-image-url")
const drinkNameInput = document.getElementById("input-drink-name")
const instructionsInput = document.getElementById("input-instructions")
const drinkList = document.getElementById("drink-list")
const searchBar = document.getElementById("searchBar")
const liquor = document.getElementById("liquor")


liquor.addEventListener("change", function(e){
let arr = Drink.allDrinks.filter(drink => {
    for( let ing of drink.ingredients){
        if(ing.name.toLowerCase().includes(e.target.value)){
            return true
        }}
})

Drink.renderDrinks(arr)
})


searchBar.addEventListener("keyup", function(e){
    const searchInput = e.target.value.toLowerCase()
    const searchResult = Drink.allDrinks.filter( drink => {
    
      if ( drink.name.toLowerCase().includes(searchInput)){
        return true
        
      } 
  })

Drink.renderDrinks(searchResult)
 })

 drinkForm.addEventListener("submit",  Drink.submitDrink)

Drink.fetchDrinks()