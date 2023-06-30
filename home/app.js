var path = window.location.pathname;
var page = path.split("/").pop();


async function showCategories() {
    var categoryDiv = document.getElementById("category")
    const response = await fetch('https://dummyjson.com/products/categories')
    const data = await response.json()
    for (const itr of data) {
        categoryDiv.innerHTML += `<li class="nav-item m-1 shadow fw-semibold rounded-pill colourThemeBtn">
                    <a class="nav-link text-white text-capitalize" onclick="showProd(1,'prodDiv', this.textContent)">${itr}</a>
                </li>`
    }
}


async function showProd(prods, Id, limit = 0) {
    var search = "";
    if (prods == 1) {
        let thisCategory = limit
        if (page != "products.html") {
            localStorage.setItem("searchCat", limit)
            location.href = "products.html"
        }
        search = "/category/" + thisCategory
        document.getElementById("prodDivText").innerText = `Category: ${thisCategory}`
    } else if (prods == 2) {
        let searchVal = document.getElementById("searchProd")
        search = "/search?q=" + searchVal.value
        if (page != "products.html") {
            localStorage.setItem("searchVal", searchVal.value)
            searchVal.value = null
            location.href = "products.html"
        }
        document.getElementById("prodDivText").innerText = `Searched for "${searchVal.value}"`
    } else if (prods == 3) {
        search = `?limit=${limit}&skip=${Math.floor(Math.random() * 100 + 1)}`
    }
    let cards = document.getElementById(Id)
    cards.innerHTML = null
    const response = await fetch(`https://dummyjson.com/products${search}`)
    const data = await response.json().then((data) => {
        for (const itr of data.products) {
            var dis = itr.price - (itr.price * itr.discountPercentage / 100)
            cards.innerHTML += `<div class="d-flex col justify-content-center">
                            <div class="card cardBase shadow p-2 h-100">
                                <img src="${itr.thumbnail}"
                                    class="card-img-top" alt="..." height="140px">
                                <div class="d-flex flex-column card-body p-0">
                                    <p class="d-block fw-semibold titleText my-1">${itr.title.slice(0, 40)}...</p>
                                    <hr class="my-0">
                                    <p class="d-block text-danger fw-bold disPrice">Rs.${dis.toFixed()}</p>
                                    <p class="d-block text-body-secondary priceText"><s>Rs.${itr.price}</s></p>
                                    <p class="d-block text-body-secondary priceText">
                                        ${itr.discountPercentage.toFixed()}%
                                        Discount</p>
                                    <span class="d-block fw-bold ratingText">Rating:${itr.rating}<i
                                            class="fa-solid fa-star" style="color: #ffd500;"></i></span>
                                    <a href="#" class="btn btn-primary cartBtn mt-auto">Add to Cart</a>
                                </div>
                            </div>
                        </div>`
        }
    })
}


(() => {
    showCategories()
    if (page === "home.html") {
        showProd(3, "flashDeal", 12)
        showProd(3, "featured", 12)
        showProd(3, "recommended", 12)
    } else if (page === "products.html") {
        searchProd = localStorage.getItem("searchVal")
        let category = localStorage.getItem("searchCat")
        if (searchProd) {
            document.getElementById("searchProd").value = searchProd
            showProd(2, "prodDiv")
            localStorage.removeItem("searchVal")
        } else if (category) {
            showProd(1, "prodDiv", category)
            localStorage.removeItem("searchCat")
        } else {
            showProd(3, "prodDiv", 50)
        }
    }
})()
