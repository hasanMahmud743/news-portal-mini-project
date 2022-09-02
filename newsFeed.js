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
        creat.innerHTML = `
        <img class="card-img m-5" src="${cardDetail.image_url}" alt="">
        `

        cardId.appendChild(creat)
    }
}

cardFeture()