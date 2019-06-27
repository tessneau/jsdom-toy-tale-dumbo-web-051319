const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
// const actualToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

function slapOneCardToTheDOM(toyCollection, toyData) {
  const toyCard = document.createElement('div')
  toyCard.id = toyData.id
  toyCard.className = 'card'
  toyCard.innerHTML = `
    <h2>${toyData.name}</h2>
    <img src="${toyData.image}" class="toy-avatar" />
    <p> ${toyData.likes} Likes </p>
    <button class ="like-btn"> Like <3 </button>
    <button class ="delete-btn"> Delete </button>
  `
  toyCollection.append(toyCard)
}



function slapCardsToTheDOM(cards) {
  const toyCollection = document.querySelector('#toy-collection')
  cards.forEach(function(card) {
    slapOneCardToTheDOM(toyCollection, card)
  })
}

toyCollection.addEventListener('click', handleClick)

function handleClick(event) {
  if (event.target.className === 'delete-btn') {
    // let toyId = event.target.parentElement.id;
    deleteToy(event)
  } else if (event.target.className === 'like-btn') {
    // let toyId = event.target.parentElement.id;
    likeToy(event)
  }
}

function deleteToy(event) {
  let id = event.target.parentElement.id;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE",
  }).then(function(){
    event.target.parentElement.remove();
  })
}

// function likeToy

document.addEventListener("DOMContentLoaded", function(){
  allToys();
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    const form = document.querySelector('.add-toy-form')
    const toyCollection = document.querySelector('#toy-collection')
    form.addEventListener("submit", function(event){
      // debugger
      event.preventDefault();
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": form.name.value,
          "image": form.image.value,
          "likes": 0,
        })
    })
      .then(res => res.json())
      .then(data => slapOneCardToTheDOM(toyCollection, data))
    })
  } else {
    toyForm.style.display = 'none'
  }
})


function allToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(slapCardsToTheDOM)
}
