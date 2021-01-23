class Ingredient{

    constructor(ingredient){
       
        this.id = ingredient.id
        this.name = ingredient.name
        this.drink_id = ingredient.drink_id
    
    }

    static createIngredient(e){
        
        e.preventDefault()
        const li = document.createElement('li')
        const ingredientName = e.target.children[0].value
        const ingredientList = e.target.previousElementSibling
        const drinkId = e.target.parentElement.dataset.id
       
        Ingredient.submitIngredient(ingredientName, ingredientList, drinkId)
        e.target.reset()
        
    }
    
    renderIngredient(ingredientList){
      
        const li = document.createElement('li')
        li.className = "list-group-item"
        li.dataset.id = this.id
        li.innerText = this.name
       
        const lnbr = document.createElement('br')
        const deleteBtn = document.createElement('button')
        deleteBtn.className = "badge badge-pill badge-primary"
        deleteBtn.innerText = "Remove"
        
        li.append(lnbr, deleteBtn)

        deleteBtn.addEventListener("click", this.deleteIngredient)
        ingredientList.appendChild(li)
        
}

     static submitIngredient(ingredientName, ingredientList, drinkId){

        fetch(ingredientsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
           name: ingredientName,
           drink_id: drinkId,
           ingredientList: ingredientList
        })
    })
        .then(response => response.json())
        .then(ingredient => {
       
        let newIngredient = new Ingredient(ingredient)
           
        const drink = Drink.allDrinks.find(c => parseInt(c.id) === newIngredient.drink_id)
        drink.ingredients.push(newIngredient)

        newIngredient.renderIngredient(ingredientList)
    
    })
   
    }
    
    deleteIngredient(){
        
        const ingrId = this.parentElement.dataset.id
             fetch(`${ingredientsURL}/${ingrId}`,{
             method: "DELETE"
         })
         
         this.parentElement.remove()
     }
}