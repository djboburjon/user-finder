var api_link = "https://randomuser.me/api/?results=9"

const body = document.querySelector("body")
const cards = document.querySelector(".cards")
const mode = document.querySelector(".mode")
const moon = document.querySelector(".moon")
const sun = document.querySelector(".sun")
const trash = document.querySelector(".trash")
const form = document.querySelector(".form")
const searchUser = document.querySelector(".searchUser")
const refresh_btn = document.querySelector(".refresh_btn")
const clear_btn = document.querySelector(".clear_btn")

moon.addEventListener("click", () => {
  body.classList.add("active")
  moon.style = "display: none;";
  sun.style = "display: block;";
  
})
sun.addEventListener("click", () => {
  body.classList.remove("active")
  moon.style = "display: block;";
  sun.style = "display: none;";  
})

const getData = async (link) => {
  const request = await fetch(link)
  const data = await request.json()
  dataUser(data.results)
}

getData(api_link)

const dataUser = (info) => {
  info.forEach((item) => {
    cards.innerHTML += `
    <div class="card">
      <div class="trash"><i class="fa-solid fa-trash trashBtn"></i></div>
      <img src="${item.picture.large}" alt="">
      <div class="name">${item.name.title} ${item.name.first} ${item.name.last}</div>
      <div class="old">${item.dob.age} years old.</div>
      <div class="address">${item.location.state}, ${item.location.country}</div>
      <div class="gender">${item.gender}</div>
    </div>
      `
    })
}

refresh_btn.addEventListener("click", ()=> {
  cards.innerHTML = ""
  getData(api_link);
  searchUser.value = ""
})

clear_btn.addEventListener("click", () => {
  cards.innerHTML = ""
  searchUser.value = ""
})

searchUser.addEventListener("input", () => {
  const card = document.querySelectorAll(".card")
  card.forEach((item) => {
    let name = item.querySelector(".name").textContent.replaceAll(" ", "").toLowerCase()
    let inputValue = searchUser.value.toLowerCase().replaceAll(" ", "")
  
    if(!name.includes(inputValue)) {
      item.classList.add("hidden")
    }else {
      item.classList.remove("hidden")
  }
  })
})


document.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("trashBtn")) {
    e.target.parentElement.parentElement.remove()
  }
})