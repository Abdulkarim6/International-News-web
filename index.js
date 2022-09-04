/* load all news categories */
const loadCategory = () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}
/* display All news categories  */
const displayCategory = (categorys) => {
    categorys.forEach(category => {
        // console.log(category);
        const ulCon = document.getElementById('ul-con');

        const li = document.createElement("li");
        li.classList.add("list");
        li.innerHTML = `<a onclick= "loadAllNews(${category.category_id})" href="#" class="text-decoration-none h6"> ${category.category_name} </a>`;

        ulCon.appendChild(li);
    });
}
/* load all news by dynamicly */
const loadAllNews = (news_id) => {
    /* loder spinner start */
    toggelSpinner(true);
    // console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
/* display all news by dynamicly */
const displayNews = (datas) => {
    //  console.log(datas);
    // const sort = datas.sort();
    // console.log(sort);
    // console.log(datas.length);
    /* news items number */
    const cetagoryItemNumber = document.getElementById("cetagoryItemNumber");
    cetagoryItemNumber.innerHTML = `
              <h4> ${datas.length} items found for category Entertainment </h4>
          `
    /* news found alert */
    const newsAlert = document.getElementById('newsAlert');
    if (datas.length === 0) {
        newsAlert.classList.remove("d-none");
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
                        <img src="${data.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text mt-5">${data.details.slice(0, 300)} ... </p>
                            <div class="d-flex align-items-center justify-content-around mt-4">

                                <div class="d-flex align-items-center" >
                                    <img class="blogerImg" src="${data.author.img}" alt="">
                                    <div class = "ms-2">
                                        <h4>${data.author.name}</h4>
                                        <p class="mb-0">${data.author.published_date}</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                     <i class="fa-regular fa-eye"></i>
                                     <p class= "mb-0 ms-1"> ${data.total_view} </p>
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
    /* loder spinner stop */
    toggelSpinner(false);
}
/* load news detail */
const getDetails = (detailsId) => {

    // console.log('button clicked');
    // console.log(detailsId);
    const url = `https://openapi.programming-hero.com/api/news/${detailsId}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
/* display news detail */
const displayDetails = (datas) => {
    // console.log(datas);
    datas.forEach(data => {
        // console.log(data);
        const blogDetailModalLabel = document.getElementById('blogDetailModalLabel')
        blogDetailModalLabel.innerText = data.title;
        const blogDetailBody = document.getElementById('blogDetailBody');
        blogDetailBody.innerHTML = `
             <img class="blogerImg" src="${data.author.img}" alt="">
            <h4> Author : ${data.author.name ? data.author.name : "No Name"}</h4>
            <p class="mb-0"> Published_date : ${data.author.published_date}</p>
        `
    });

}
/* function for spinner */
const toggelSpinner = isloading => {
    const spinner = document.getElementById('spinner');
    if (isloading) {
        spinner.classList.remove("d-none")
    }
    else {
        spinner.classList.add("d-none")
    }
}


loadAllNews(04);
loadCategory();
