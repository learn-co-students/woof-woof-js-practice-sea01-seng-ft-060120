const fetchAllDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.forEach(pup => listPups(pup)))
}
fetchAllDogs()

const listPups = (pup) => {
    let dogBar  = document.querySelector('#dog-bar')
    let span = document.createElement('span')
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
    console.log(pup.isGoodDog)
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
        console.log(pupper)
        let currentBtn = document.getElementById('Toggle')
        currentBtn.remove()
        let btn = document.createElement('button')
        btn.innerText = pupper.isGoodDog ? "Good Dog!" : "Bad Dog!"

        btn.id = 'Toggle'
        btn.addEventListener('click', (e) => changeStatus(e, pupper))

        div.appendChild(btn)
    })
}

//div.querySelector('button') - removes the need to add the id, only selecting the button on this card
//can do querySelector on specific parts of your code, in this case you wouldn't have to re-add the id













// const dogSpan = (dog) => {

//     let dogBar = document.getElementById('dog-bar')
//     let span = document.createElement('span')
//     span.innerText = `${dog.name}`
//     span.id = `${dog.id}`
//     dogBar.appendChild(span)

//     let whichDog = document.getElementById(dog.id)
//     whichDog.addEventListener('click', (e) => showDog(dog))
// }

// const showDog = (dog) => {
//     let dogInfo = document.getElementById('dog-info')
//     dogInfo.innerHTML = `
//         <img src='${dog.image}'/>
//         <h2>${dog.name}</h2>
//         <button class="good-dog">Good Dog!</button>
//     `

//     let btn = dogInfo.querySelector('.good-dog')
//     btn.addEventListener('click', (e) => changeStatus(e, dog))
// }

// const changeStatus = (e, dog) => {

//     console.log(dog)
//     function updateStatus() {
//             if(dog.isGoodDog === true)
//                     {let data = {isGoodDog: "Good Dog!"}}
//             else {
//                 let data = {isGoodDog: "Bad Dog!"}
//             }
    
//     fetch(`http://localhost:3000/pups/${dog.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/pupper',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(data),
//     })
//     .then(res => res.json())
//     .then(json => console.log(json))

//     }
// }

