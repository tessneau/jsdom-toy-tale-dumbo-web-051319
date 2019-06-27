const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false




// YOUR CODE HERE

function slapCardOnTheDOM(toyData){
  toyData.forEach(function(toy){
    const toyCollection = document.querySelector('#toy-collection')
    const toyCard = document.createElement('div')
    const h2Test = document.createElement('h2')
    const p = document.createElement('p')
    const image = `<img src="${toy.image}" class="toy-avatar" />`
    const button = document.createElement('button')
    // toyCard.setAttribute('class', 'card') same as line 18
    toyCard.className="card"
    button.className="like-btn"
    toyCard.append(h2Test)
    h2Test.innerHTML = (toy.name)
    p.innerHTML = `${toy.likes} Likes`
    button.innerText = ("Like <3")
    toyCard.innerHTML += image
    toyCard.append(p)
    toyCard.append(button)
    toyCollection.append(toyCard)

  })
}




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

document.addEventListener("DOMContentLoaded", function(){
  allToys()
})

function allToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(slapCardOnTheDOM)
}
