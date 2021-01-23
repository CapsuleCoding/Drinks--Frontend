class Drink{

    static allDrinks = []

    constructor(drink){
     
        this.id = drink.id
        this.name = drink.attributes.name
        this.image = drink.attributes.image
        this.instructions = drink.attributes.instructions
        this.ingredients = drink.attributes.ingredients
     
        Drink.allDrinks.push(this)
        this.renderDrink()
    }

        static renderDrinks(drinks){
            drinkList.innerHTML = ""
          for (let drink of drinks){
            drink.renderDrink()

        }
    }
         static fetchDrinks(){
             fetch(drinksURL)
            .then(response => response.json())
            .then(drinks => {
                   for(let drink of drinks.data){
                let newDrinkList = new Drink(drink)
                   }

        })
     
    }
        renderDrink(){
     
        // const drinkList = document.getElementById("drink-list")
        const drinkLi = document.createElement('li')
        
        drinkLi.dataset.id = this.id
        drinkList.appendChild(drinkLi)
        const h3 = document.createElement('h3')
        h3.className=("card-header")
        h3.innerText = this.name
        const img = document.createElement('img')
        img.src = this.image
        img.width = 200
        const p = document.createElement('p')
        p.className = "card-text"
        p.innerText = this.instructions

        //delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-primary btn-sm"
        deleteBtn.innerText = "Delete Drink"
        deleteBtn.addEventListener("click", this.deleteDrink)

        //ingredient form
        const ingredientForm = document.createElement('form')
        ingredientForm.innerHTML += `<input type="text"  class="form-control" id="ingredient-input" placeholder ="Ingredient">
        <input type="submit" class="btn btn-primary btn-sm" value="Add">`

    
        ingredientForm.addEventListener("submit", Ingredient.createIngredient)

        const ingredientList = document.createElement("ul")
        ingredientList.className = "list-group list-group-flush"
          ingredientList.dataset.id = this.id
        //rendering ingredients per drink
       
        this.ingredients.forEach(ingredient =>{
          
            let newIngr = new Ingredient(ingredient)
          
            newIngr.renderIngredient(ingredientList)
        })
    
    drinkLi.append( h3, img, ingredientList, ingredientForm, p, deleteBtn)

}

    static submitDrink(e){
        e.preventDefault()
        fetch(drinksURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
            image: imageInput.value,
            name: drinkNameInput.value,
            instructions: instructionsInput.value
            })
            
        })
        .then(response => response.json())
        .then(drink => {
            let newDrink = new Drink(drink.data)
        
            drinkForm.reset()
        })
        
    }

    deleteDrink(){

        const drinkId = this.parentElement.dataset.id
        
        fetch(`${drinksURL}/${drinkId}`,{
                 method: "DELETE"
        })
       
             this.parentElement.remove()
    }


     
}

