

fetch(`https://dummyjson.com/recipes`)
.then(function(val){
    return val.json();
})
.then((data)=>{
    document.querySelector("#recipes-space").innerHTML = ""
   let dataInArray = data.recipes
   function renderRecipes(arr){
       arr.forEach((val)=>{
    //   console.log(val)

    // recipe-card
    const recipeCard = document.createElement("div")
    recipeCard.classList.add("recipe-card")
    //image
    const img = document.createElement("img")
    img.classList.add("recipe-image")
    img.src = val.image
    //recipes heading
    const recipeCardH2 = document.createElement("h2");
    recipeCardH2.id = "recipes-heading"
    recipeCardH2.textContent = val.name
    
    const pId = document.createElement("p")
      pId.className = "idList"
      pId.textContent = `${val.id - 1}`
      // paragraph
      const paragraph = document.createElement("p")
      paragraph.id = "paragraph"
      paragraph.textContent = `A Fantastic ${val.cuisine} dish with ${val.ingredients[0]} ${val.ingredients[1]} ${val.ingredients[2]} ${val.ingredients[3]}.`
      
      const divModules = document.createElement("div")
      divModules.className = "modules"
      const viewBtn = document.createElement("button")
      viewBtn.className = "view-btn"
      viewBtn.textContent = `🔗VIEW RECIPES` 
      viewBtn.append(pId)
      divModules.append(viewBtn) 
      recipeCard.append(img , recipeCardH2 , paragraph , divModules )
      document.querySelector("#recipes-space").appendChild(recipeCard)
      
    })
}

renderRecipes(dataInArray)


function renderMakingContainer(view){
    const recipeImage = document.getElementById("rs2")
    const recipeTitle = document.querySelector(".recipe-title")
    let recipeViewObject = dataInArray[view]
    console.log(recipeViewObject)
    recipeTitle.textContent = recipeViewObject.name
    recipeImage.src = recipeViewObject.image
    document.querySelector(".stars").textContent = recipeViewObject.rating
    document.querySelector(".type").textContent = recipeViewObject.mealType[0]
    recipeViewObject.ingredients.forEach((val)=>{
        const ingredientsP = document.createElement("li")
        ingredientsP.textContent = val
        document.getElementById("ingredients-list").append(ingredientsP)
    })
    
    recipeViewObject.instructions.forEach((val)=>{
        const instructionsP = document.createElement("li")
        instructionsP.textContent = val
        document.getElementById("instructions-list").append(instructionsP)
    })
    
}
const leftArrow = document.getElementById("leftarrow")

leftArrow.addEventListener("click",(e)=>{
   window.location.reload()
})

// making recipe container content
const recipeCards = document.getElementsByClassName("recipe-card")

Array.from(recipeCards).forEach((card)=>{
    card.addEventListener("click",(e)=>{
        if(e.target.classList.contains("view-btn")){
            leftArrow.style.display = "flex"
            const index = e.target.childNodes[1].textContent
               document.getElementById("recipe-container").style.display = "none"
               document.querySelector(".recipe-making-container").style.display = "flex"
               renderMakingContainer(index)
            }
        })
    })
   const input = document.getElementById("inputValue") 
   input.addEventListener("input",(e)=>{
    document.querySelector("#recipes-space").innerHTML = ""
    let filter = dataInArray.filter((val)=>{
        return val.name.toLowerCase().startsWith(input.value.toLowerCase()) 
    })
     renderRecipes(filter)
    })  

})
.catch(function(err){
    console.log(err)
})




