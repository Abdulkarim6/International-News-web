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
        li.innerHTML = `<a onclick= "loadAllNews(${category.category_id})" href="#" class="text-decoration-none"> ${category.category_name} </a>`;

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
    const sort = datas.sort();
    console.log(sort);
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
    sort.forEach(data => {
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
                            <p class="card-text">${data.details.slice(0, 300)} ... </p>
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
                                     <p class= "mb-0 ms-2"> ${data.total_view} </p>
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

/* blogs frequently asked question start */
document.getElementById("blogsFAQ").addEventListener("click", function () {
    console.log("blog for ok");

    const div = document.createElement("div");
    div.innerHTML = `
        
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
        
        
        `






})
/* blogs frequently asked question end */

loadCategory();