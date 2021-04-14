// write your code here
//***********MY CLASS ATTEMPT; EVERYTHING WORKING********/

function renderFirstImage() {
    fetch('http://localhost:3000/spiceblends/')
        .then(resp => resp.json())
        .then(spiceBlendArr => {
            firstSpice = spiceBlendArr.shift()

            let img = document.querySelector('#spice-blend-detail > img')
            img.src = firstSpice.image
            img.alt = firstSpice.title

            let h2 = document.querySelector('#spice-blend-detail > h2')
            h2.innerText = firstSpice.title

            updateForm.dataset.id = firstSpice.id
        })
}

function fetchIngredients() {
    fetch('http://localhost:3000/ingredients')
        .then(resp => resp.json())
        .then(ingredientsArr => {
            const firstSpiceIngredients = ingredientsArr.filter(function (e) {
                return e.spiceblendId === 1
            })
            let ingredientsList = document.querySelector('#spice-blend-detail > div > ul')
            findNames = firstSpiceIngredients.map(function (e) { return e.name })
            findNames.forEach(function (name) {
                let li = document.createElement('li')
                li.textContent = name
                ingredientsList.appendChild(li)
            })

        })
}

const updateForm = document.querySelector('form#update-form')

updateForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event.target)

    const newTitle = event.target.title.value

    fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
    })
        .then(resp => resp.json())
        .then(updatedfirstSpice => {
            console.log(updatedfirstSpice)
        })
})

const spiceForm = document.querySelector('form#ingredient-form')

spiceForm.addEventListener('submit', event => {
    event.preventDefault()

    const newIngredient = event.target.name.value

    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newIngredient,
            spiceblendId: 1
        })
    })
        .then(resp => resp.json())
        .then(addNewIngredient => {
            console.log(addNewIngredient)
        })
})

fetchIngredients()
renderFirstImage()



/******************CLASS CODE**************/








