const loadCategory = () => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = (categorys) => {
    categorys.forEach(category => {
        // console.log(category.category_name);
        const ulCon = document.getElementById('ul-con')

        const li = document.createElement("li")
        li.innerHTML = `<a href="#" class="text-decoration-none"> ${category.category_name} </a>`

        ulCon.appendChild(li)

    });
}





loadCategory();