// page link
document.getElementById('blog-btn').addEventListener('click', function(){
    window.location.href = "http://127.0.0.1:5500/blog.html#" 
})

document.getElementById('news-btn').addEventListener('click', function(){
    window.location.href = "http://127.0.0.1:5500/index.html#" 
})


const news = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => catagory(data.data.news_category))
    .catch(error => console.log(error))
}

const catagory = datas =>{
   

    
    datas.forEach(data => {

        const heading = document.getElementById('news-heading')
        const creatDiv = document.createElement('a')
        const ternary = data.category_id

        creatDiv.innerHTML = `
        <a class="catagory-link"  onclick="myclick('${ternary}')" href="#"> ${data.category_name} </a>
        `
        heading.appendChild(creatDiv)
    })
}


news()




const myclick = (catId, titleName) =>{
    spinner(true)
    

    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
    .then(res => res.json())
    .then(data => cardFeture(data.data))
    .catch(error => console.log(error))
}
spinner(true)

myclick('01')


const cardFeture = (cardDetails) =>{
    
    // array sorting
    
    const sort = cardDetails.sort((a, b) => {
        return (b.total_view - a.total_view)
    })
    
    const notification = document.getElementById('qty')
    notification.innerText = cardDetails.length
    const warning = document.getElementById('warning')
     
    if(cardDetails.length === 0){
      warning.classList.remove('d-none')

    } else{
        warning.classList.add('d-none')
    }

    const cardId = document.getElementById('card-id')
    cardId.innerHTML = ''

    cardDetails.forEach( cardDetail =>{
      
        const creat = document.createElement('div')
        const details = cardDetail.details
        const shortArr = details.split(' ')
        const short = shortArr.slice(0, 40)
        const join = short.join(' ')

        creat.innerHTML = `
        <div class=" shadow rounded-3 my-5 p-4">
             <div class="row">
                <div class="col-md-5">
                    <img class="card-img" src=" ${cardDetail.image_url}" alt="">
                </div>

                <div class="col-md-7 mt-4 mt-md-auto">
                        <h4 class="fw-bold"> ${cardDetail.title} </h4>
                        <p class="text-muted"> ${join} ...</p>


                        <div class="d-flex flex-column  flex-md-row pt-4 justify-content-between" >

                            <div class="d-flex "> 
                                <img class="author-img mx-3" src="${cardDetail.author.img}" alt="">

                                <div class="lh-sm">
                                    <p class="lh-1 fw-bold">${cardDetail.author?.name || 'No Author found'}</p>
                                    <p class="lh-1">${cardDetail.author?.published_date || 'No date found'}</p>
                                </div>
                            
                            </div >

                            <p class="text-center"> <span> <i class="fa-solid fa-eye"></i> </span>${cardDetail?.total_view || 'No Views'}</p>

                           <div class="d-flex d-md-none">


                                <p class="me-auto"> <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i> 
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half"></i>
                                </p>
                                
                                <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="ms-auto" onclick="modalOn('${cardDetail._id}')"  href="#"> <i class="fa-solid text-danger  fa-arrow-right border fw-bold p-1 rounded-circle"></i></a>
                                    
                                
                            </div>

                            <p class=" d-none d-md-block"> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half"></i>
                            </p>

                            <a onclick="modalOn('${cardDetail._id}')" class=" d-none d-md-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#"> <i class="fa-solid text-danger  fa-arrow-right border fw-bold p-1 rounded-circle"></i></a>
                                    
                    </div>
                </div>

            </div>
        

         </div>
         `

        cardId.appendChild(creat)

      
    })
    spinner(false)
}

// modal handler here

const modalOn = data =>{
    spinner(true)
    fetch(`https://openapi.programming-hero.com/api/news/${data}`)
    .then(res => res.json())
    .then(data => modalDisplay(data.data[0]))
    .catch(error => console.log(error))
}

const modalDisplay = (details) =>{
    
    const modalId = document.getElementById('modal-id')
    modalId.innerText = details.author?.name || 'No author found'

    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
        <h5 class="fw-bold"> ${details.title} </h5>
        <p class="text-muted"> ${details.details} </p>
    `
    spinner(false)
}



// spinner function

function spinner(isSpinnig){
    const spinner = document.getElementById('spinner')

    if(isSpinnig){
        spinner.classList.remove('d-none')
    } else{
        spinner.classList.add('d-none')
    }
} 

spinner(true)

// cardFeture()