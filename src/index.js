const fetchAllDogs = () => {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(json => json.forEach(pup => listPups(pup)))
}
fetchAllDogs()
const listPups = (pup) => {
  let dogBar  = document.getElementById('dog-bar')
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
  .then(json => {
    let div =  document.getElementById('dog-info')
    let currentBtn = document.getElementById('Toggle')
    currentBtn.remove()
    let btn = document.createElement('button')
    btn.innerText = json.isGoodDog ? "Good Dog!" : "Bad Dog!"
    btn.id = "Toggle"
    btn.addEventListener('click', (e) => changeStatus(e, json))
  div.appendChild(btn)
      // let div =  document.getElementById('dog-info')
      // const pupButton = document.querySelector('#Toggle')
      // pupButton.innerText = ''
      // pupButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
      // div.appendChild(pupButton)
      // console.log(div)
      // console.log(pupButton)
  })
}