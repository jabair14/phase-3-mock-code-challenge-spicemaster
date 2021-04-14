// write your code here
//***********MY CLASS ATTEMPT; EVERYTHING WORKING********/

// function renderFirstImage() {
//     fetch('http://localhost:3000/spiceblends/')
//         .then(resp => resp.json())
//         .then(spiceBlendArr => {
//             firstSpice = spiceBlendArr.shift()

//             let img = document.querySelector('#spice-blend-detail > img')
//             img.src = firstSpice.image
//             img.alt = firstSpice.title

//             let h2 = document.querySelector('#spice-blend-detail > h2')
//             h2.innerText = firstSpice.title

//             updateForm.dataset.id = firstSpice.id
//         })
// }

// function fetchIngredients() {
//     fetch('http://localhost:3000/ingredients')
//         .then(resp => resp.json())
//         .then(ingredientsArr => {
//             const firstSpiceIngredients = ingredientsArr.filter(function (e) {
//                 return e.spiceblendId === 1
//             })
//             let ingredientsList = document.querySelector('#spice-blend-detail > div > ul')
//             findNames = firstSpiceIngredients.map(function (e) { return e.name })
//             findNames.forEach(function (name) {
//                 let li = document.createElement('li')
//                 li.textContent = name
//                 ingredientsList.appendChild(li)
//             })

//         })
// }

// const updateForm = document.querySelector('form#update-form')

// updateForm.addEventListener('submit', event => {
//     event.preventDefault()
//     console.log(event.target)

//     const newTitle = event.target.title.value

//     fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ title: newTitle })
//     })
//         .then(resp => resp.json())
//         .then(updatedfirstSpice => {
//             console.log(updatedfirstSpice)
//         })
// })

// const spiceForm = document.querySelector('form#ingredient-form')

// spiceForm.addEventListener('submit', event => {
//     event.preventDefault()

//     const newIngredient = event.target.name.value

//     fetch('http://localhost:3000/ingredients', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: newIngredient,
//             spiceblendId: 1
//         })
//     })
//         .then(resp => resp.json())
//         .then(addNewIngredient => {
//             console.log(addNewIngredient)
//         })
// })

// fetchIngredients()
// renderFirstImage()



/******************CLASS CODE**************/
// take note of the OTHER routes in the deliverables
const spiceImagesMenu = document.querySelector('div#spice-images')


function addIngredientToList(name){
    const li = document.createElement('li')
    li.textContent = name

    const ingredientsUl = document.querySelector('ul.ingredients-list')
    ingredientsUl.append(li)
}

fetch ('http://localhost:3000/spiceblends/1') //hard code this first; get it to work
    .then(resp => resp.json())
    .then(spiceBlendObj => {
        
        const detailImg = document.querySelector('img.detail-image')
        detailImg.src = spiceBlendObj.image

        const detailH2 = document.querySelector('h2.title')
        detailH2.textContent = spiceBlendObj.title

        spiceBlendObj.ingredients.forEach(ingredientsObj => {
            addIngredientToList(ingredientsObj.name)
            // const li = document.createElement('li')
            // li.textContent = ingredientsObj.name
            // const ingredientsUl = document.querySelector('ul.ingredients-list')
            // ingredientsUl.append(li)
            //refactored
        })
    })

// see all spice blends ADVANCE DELIVERABLE 

fetch('http://localhost:3000/spiceblends')
    .then(resp => resp.json())
    .then(spiceBlendArr => {
        console.log(spiceBlendArr)
        spiceBlendArr.forEach(spiceBlendObj => {
            const img = document.createElement('img')
            img.src = spiceBlendObj.image

            img.dataset.id = spiceBlendObj.id //adds id of spice to image object

            // const spiceImagesMenu = document.querySelector('div#spice-images')
            spiceImagesMenu.append(img)
        })
    })

const updateTitleForm = document.querySelector('form#update-form')

updateTitleForm.addEventListener('submit', event => {
    event.preventDefault()

    //get user input
    const title = event.target.title.value //get title from name of input field in html
    fetch('http://localhost:3000/spiceblends/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
    .then (resp => resp.json())
    .then (updatedObj => {
        const detailH2 = document.querySelector('h2.title')
        detailH2.textContent = updatedObj.title 
    })
})

const newIngredientForm = document.querySelector('form#ingredient-form')

newIngredientForm.addEventListener('submit', event => {
    event.preventDefault()

    // const newIngredient = event.target.name.value

    // console.log(newIngredient)
    // const li = document.createElement('li')
    // li.textContent = newIngredient
    // const ingredientsUl = document.querySelector('ul.ingredients-list')
    // ingredientsUl.append(li)
    // REFACTORED

    const name = event.target.name.value
    addIngredientToList(name)

    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, spiceblendId: 1})
    })
    .then (resp => resp.json()) // you could do error handling here, but it's not needed in this situation
    .then (newIngredientObj => console.log(newIngredientObj))

    event.target.reset()
})

spiceImagesMenu.addEventListener('click', event => {
    
    if (event.target.matches('img')) {
        
        fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`)
            .then (resp => resp.json())
            .then (spiceBlendObj => {
                const detailImg = document.querySelector('img.detail-image')
                detailImg.src = spiceBlendObj.image

                const detailH2 = document.querySelector('h2.title')
                detailH2.textContent = spiceBlendObj.title

                const ingredientsUl = document.querySelector('ul.ingredients-list')
                ingredientsUl.innerHTML = ''

                spiceBlendObj.ingredients.forEach(ingredientsObj => {
                    addIngredientToList(ingredientsObj.name)
                    // const li = document.createElement('li')
                    // li.textContent = ingredientsObj.name
                    // const ingredientsUl = document.querySelector('ul.ingredients-list')
                    // ingredientsUl.append(li)
                    //refactored
                })
            })
    }
})

// all deliverables done; refactor time












