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
    // console.log(datas.length);
    const newsAlert = document.getElementById('newsAlert')
    if (datas.length === 0) {
        newsAlert.classList.remove("d-none")
    }
    else {
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
                        <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.details.slice(0, 400)} </p>
                            <div class="d-flex align-items-center justify-content-around mt-4">

                                <div class="d-flex align-items-center w-50 " >
                                    <img class="blogerImg" src="${data.author.img}" alt="">
                                    <div>
                                        <h4>${data.author.name}</h4>
                                        <p class="mb-0">${data.author.published_date}</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                     <i class="fa-regular fa-eye"></i>
                                     <p class= "mb-0"> ${data.total_view} </p>
                                </div>
                                <div>
                               <button onclick="getDetails('${data._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#blogDetailModal">Details</button>
                            </div>  
                        </div>
                    </div>
                </div>
       `
        newsContainer.appendChild(newsDiv);

    });
}

const getDetails = (detailsId) =>{
    // console.log('button clicked');
    // console.log(detailsId);
    const url = `https://openapi.programming-hero.com/api/news/${detailsId}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = (datas) => {
    // console.log(datas);
    datas.forEach(data => {
        // console.log(data);
        const blogDetailModalLabel = document.getElementById('blogDetailModalLabel')
        blogDetailModalLabel.innerText = data.title;
        const blogDetailBody = document.getElementById('blogDetailBody');
        blogDetailBody.innerHTML = `
             <img class="blogerImg" src="${data.author.img}" alt="">
            <h4> Author : ${data.author.name}</h4>
            <p class="mb-0"> Published_date : ${data.author.published_date}</p>

        `
    });

}



loadCategory();