const news = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => catagory(data.data.news_category))
}

const catagory = datas =>{
    // console.log(datas.category_name)

    for(const data of datas){
        console.log(data.category_name)
        const heading = document.getElementById('news-heading')
        // console.log(heading)
        const creatDiv = document.createElement('a')
        const ternary = data.category_id || 01
        creatDiv.innerHTML = `
        <a class="catagory-link" onclick="myclick('${ternary}')" href="#"> ${data.category_name} </a>
        `
       
        heading.appendChild(creatDiv)
    }
}


news()




const myclick = (catId) =>{
    spinner(true)
    // console.log(catId)

    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
    .then(res => res.json())
    .then(data => cardFeture(data.data))
    
}
spinner(true)


myclick('01')


const cardFeture = (cardDetails) =>{
    
    console.log(cardDetails.length)

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

    // let emArr = []

    // for(total of cardDetails){
    //     emArr.push(total.total_view) 
    // }
    // emArr.sort((a,b) => b-a)
    
    // console.log(emArr)
    for(const cardDetail of cardDetails){
        // const sort = cardDetail.total_view.sort((a,b)=> b-a)
        // console.log(sort)
    
        
        

        

        const creat = document.createElement('div')
        const details = cardDetail.details
        const shortArr = details.split(' ')
        const short = shortArr.slice(0, 40)
        const join = short.join(' ')



        // console.log(join)
        creat.innerHTML = `
        <div class="card rounded-3 my-5 p-4">
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
                                    <p class="lh-1 fw-bold">${cardDetail.author.name}</p>
                                    <p class="lh-1">${cardDetail.author.published_date}</p>
                                </div>
                            
                            </div >

                            <p class="text-center"> <span> <i class="fa-solid fa-eye"></i> </span>${cardDetail.total_view}</p>

                           <div class="d-flex d-md-none">


                                <p class="me-auto"> <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i> 
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half"></i>
                                </p>
                                
                                <a class="ms-auto " href="#"> <i class="fa-solid text-danger  fa-arrow-right border fw-bold p-1 rounded-circle"></i></a>
                                    
                                
                            </div>

                            <p class=" d-none d-md-block"> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half"></i>
                            </p>

                            <a class=" d-none d-md-block " data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="#"> <i class="fa-solid text-danger  fa-arrow-right border fw-bold p-1 rounded-circle"></i></a>
                                    
                    </div>
                </div>

            </div>
        

         </div>
        `

        cardId.appendChild(creat)
    }
    spinner(false)
}





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