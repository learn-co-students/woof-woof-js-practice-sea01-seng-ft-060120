let btn = document.getElementById('good-dog-filter')
let dogBar  = document.querySelector('#dog-bar')


const fetchAllDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(puppies => {
        btn.addEventListener('click', (e) => filterDogs(e, puppies))
        puppies.forEach(pup => listPups(pup))
    })
}
fetchAllDogs()

const listPups = (pup) => {
    let dogBar  = document.querySelector('#dog-bar')
    let span = document.createElement('span')
    span.id = pup.id
    span.innerText = pup.name
    dogBar.appendChild(span)

    span.addEventListener('click', (e) => dogShow(e, pup))
}

const dogShow = (e, pup) => {
    let div =  document.getElementById('dog-info')

    div.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
    `
   const pupButton = document.createElement('button')
   pupButton.setAttribute("id", "Toggle")
   pupButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

   div.appendChild(pupButton)

   pupButton.addEventListener('click', (e) => changeStatus(e, pup))
}

const changeStatus = (e, pup) => {
    e.preventDefault()

    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: !(pup.isGoodDog)
        })
    })
    .then(res => res.json())
    .then(pupper => {
        let div =  document.getElementById('dog-info')
        let currentBtn = document.getElementById('Toggle')
        currentBtn.remove()
        let btn = document.createElement('button')
        btn.innerText = pupper.isGoodDog ? "Good Dog!" : "Bad Dog!"

        btn.id = 'Toggle'
        btn.addEventListener('click', (e) => changeStatus(e, pupper))

        div.appendChild(btn)
    })
}
//if off nothing
//if on add/remove dog from bar
    


const filterDogs = (e, pup) => {
    console.log(btn.innerText)
console.log(pup)
let span = document.getElementById(pup.id)
console.log(span)

let filter
if (btn.innerText === 'Filter good dogs: OFF') {
    btn.innerText = 'Filter good dogs: ON';
    let goodPup = pup.filter(pup => pup.isGoodDog == true)
    dogBar.innerHTML = ''
    goodPup.forEach(pup => listPups(pup))
} else {
    btn.innerText = 'Filter good dogs: OFF';
    dogBar.innerHTML = ''
    pup.forEach(pup => listPups(pup))
}

}
