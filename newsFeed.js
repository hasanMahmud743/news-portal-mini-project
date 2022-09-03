const news = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => catagory(data.data.news_category))
}

const catagory = datas =>{
    for(const data of datas){
        // console.log(data)
        const heading = document.getElementById('news-heading')
        const creatDiv = document.createElement('a')
        creatDiv.innerHTML = `
        <a class="catagory-link" onclick="myclick('${data.category_id}')" href="#"> ${data.category_name} </a>
        `
        heading.appendChild(creatDiv)
    }
}

news()


const myclick = (catId) =>{
    // console.log(catId)

    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
    .then(res => res.json())
    .then(data => cardFeture(data.data))

}


const cardFeture = (cardDetails) =>{
    // console.log(cardDetails)

    const cardId = document.getElementById('card-id')
    cardId.innerHTML = ''
    for(const cardDetail of cardDetails){
        console.log(cardDetail)

        

        const creat = document.createElement('div')
        const details = cardDetail.details
        const shortArr = details.split(' ')
        const short = shortArr.slice(0, 40)
        const join = short.join(' ')

        console.log(join)
        creat.innerHTML = `
        <div class="card rounded-3 my-5 p-4">
             <div class="row">
                <div class="col-md-5">
                    <img class="card-img" src=" ${cardDetail.image_url}" alt="">
                </div>

                <div class="col-md-7">
                        <h4 class="fw-bold"> ${cardDetail.title} </h4>
                        <p> ${join} ....</p>


                        <div class="d-flex pt-4 justify-content-between" >

                            <div class="d-flex "> 
                                <img class="author-img mx-3" src="${cardDetail.author.img}" alt="">

                                <div class="lh-sm">
                                    <p class="lh-1 fw-bold">${cardDetail.author.name}</p>
                                    <p class="lh-1">${cardDetail.author.published_date}</p>
                                </div>
                            
                            </div>

                            <p> <span> <i class="fa-solid fa-eye"></i> </span>${cardDetail.total_view}</p>

                            <p > <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i> 
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half"></i>
                            </p>

                            <p><i class="fa-solid text-danger fa-arrow-right"></i></p>
                    </div>
                </div>

            </div>
        

         </div>
        `

        cardId.appendChild(creat)
    }
}

cardFeture()