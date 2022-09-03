const loadCategory = () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (categorys) => {
    categorys.forEach(category => {
        // console.log(category);
        const ulCon = document.getElementById('ul-con');

        const li = document.createElement("li");
        li.innerHTML = `<a onclick= "loadAllNews(${category.category_id})" href="#" class="text-decoration-none"> ${category.category_name} </a>`;

        ulCon.appendChild(li);
    });
}

const loadAllNews = (news_id) => {
    // console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = (datas) => {
    //  console.log(datas);
    console.log(datas.length);
    const newsAlert = document.getElementById('newsAlert')
    if(datas.length === 0){
        newsAlert.classList.remove("d-none")
    }
    else{
        newsAlert.classList.add("d-none")  
    }
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = ``;
    datas.forEach(data => {
        // console.log(data);
         
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("card");
        newsDiv.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.author.name}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural
                                lead-in to
                                additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
       
       `
        newsContainer.appendChild(newsDiv);

    });
}


loadCategory();