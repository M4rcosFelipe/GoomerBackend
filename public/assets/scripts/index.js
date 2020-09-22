let listaRestaurantes

const restaurantSection=document.querySelector("#restaurant-container")
const inputSearch=document.querySelector("#search")
const botaoBuscar=document.querySelector("#buscar")


async function getRestaurants(){
  try{
    const response=await fetch("https://challange.goomer.com.br/restaurants")
    const data=await response.json()
    listaRestaurantes=data
    return data
  }catch(error){
    console.log("Fetch failed: ",error)
  }
}

async function loadRestaurants(){
  
  const data=await getRestaurants()
  document.querySelector("#loading").remove()
  renderRestaurants(data)
  setInterval(()=>verifyStatus(),100)
}


////////////////////////////////////////////////////

function converteHora(stringHora){
  let hora=""
  for(let i=0;i<2;i++){
     hora+=stringHora[i]
  }

  if(hora[0]==="0"){
      hora=hora[1]
  }
  return hora

}



function verificaDia(dias){//array com os dias

    
  //verifica se é DIA de promoção

  const today=new Date()

       //teste
  // today.setDate() 

  const diaAtual=today.getDay()+1

  // console.log(`Dia atual: ${diaAtual}`)


  const isDay=dias.indexOf(diaAtual)

  return isDay!==-1?true:false
}


function verificaHora(horas){//elemento do array hours

  const from=converteHora(horas.from)
  const to=converteHora(horas.to)

  const now=new Date()
      //teste
  // now.setHours()

  // console.log(`Hora atual: ${now.getHours()}`)
  // console.log(`from: ${from}`)
  // console.log(`to: ${to}`)

  if(now.getHours()>=from && now.getHours()<=to){

      return true
  }else{

      return false
  }

}


function isOpen(restaurante){

  for(let i=0;i<restaurante.hours.length;i++){

    //verifica so dia
        isOpenDay=verificaDia(restaurante.hours[i].days)

    //verifica a hora
        isOpenHour=verificaHora(restaurante.hours[i])

        if(isOpenHour && isOpenDay){
            return true
        }

    }
    return false
}


function createRestaurantCard(restaurant){
  let status="aberto"
  let statusText="Aberto agora"

  if(restaurant.hours){

    if(isOpen(restaurant)===false){
      status="fechado"
      statusText="Fechado"
    }
  }

  return `<a  href="restaurante.html?restaurante=${restaurant.id}" class="restaurant-status">
  <div class="status ${status}">${statusText}</div>

    <div class="restaurant">
        <img class="restaurant-image" src=${restaurant.image}>
        <p class="restaurant-name">${restaurant.name}</p>
        <p class="restaurant-address">${restaurant.address}</p>
    </div>
  </a>`

 

}

function trocaClasse(elemento, antiga, nova) {
  elemento.classList.remove(antiga);
  elemento.classList.add(nova);
}

function verifyStatus(){

  const restaurantes=document.querySelectorAll(".restaurant-status")
  // console.log(restaurantes)

  for(let i=0;i<listaRestaurantes.length;i++){

    const restaurant=listaRestaurantes[i]

    if(restaurant.hours){

      if(isOpen(restaurant)===false){

        if(!restaurantes[i].children[0].classList.contains("fechado")){
          trocaClasse(restaurantes[i].children[0],"aberto","fechado")
          restaurantes[i].children[0].innerText="Fechado"
        }
      }else{
        if(!restaurantes[i].children[0].classList.contains("aberto")){
          trocaClasse(restaurantes[i].children[0],"fechado","aberto")
          restaurantes[i].children[0].innerText="Aberto agora"
        }      
      }
    }
  }
}

 function renderRestaurants(data){

  restaurantSection.innerHTML=""

  for(let i=0;i<data.length;i++){
    restaurantSection.innerHTML+=createRestaurantCard(data[i])
  }
}

function toCleanString(string){

  return retiraEspacos(string)
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g,"")
                
}

function retiraEspacos(string){
  newString=""
  for(let i=0;i<string.length;i++){
    if(string[i]!==" "){
      newString+=string[i]
    }
  }
  return newString
}

function search(){

  const palavra=toCleanString(inputSearch.value)
  console.log("palavra= ",palavra)
  console.log("'palavra' limpa= ",palavra)

  let findedRestaurants=[]

  for(let i=0;i<listaRestaurantes.length;i++){
   
    if(palavra === toCleanString(listaRestaurantes[i].name)){

      // console.log("nome do restaurante ",listaRestaurantes[i].name)
      // console.log("nome do restaurante limpo= ",toCleanString(listaRestaurantes[i].name))

      findedRestaurants.push(listaRestaurantes[i])
    }
    
  }

  if(findedRestaurants.length===0){
    putErrorElement()
    console.log("nenhum encontrado")
  }else{
    renderRestaurants(findedRestaurants)
  }
}

function putLoading(){
  
  restaurantSection.innerHTML=""

  const loadingElement=`<div id="loading"></div>`

  restaurantSection.insertAdjacentHTML('afterbegin',loadingElement)

}

function putErrorElement(){

  
  restaurantSection.innerHTML=""

  const errorElement=`<div id="error">
        <img id="error-image" src="images/sad_4209.png">
        <p>Nenhum item encontrado</p>
        <a id="voltar" href="index.html">Voltar</a>
    </div>`

  restaurantSection.insertAdjacentHTML('afterbegin',errorElement)
}


inputSearch.addEventListener("keyup",function(event){
  if(event.keyCode===13){
    event.preventDefault()
    botaoBuscar.click()
  }
})

botaoBuscar.addEventListener("click",function(){
  putLoading()
  setTimeout(search,100)
})

loadRestaurants()
