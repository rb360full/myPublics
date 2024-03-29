// Variables

const mainContainer = document.querySelector(".main");
const categoryContainer = document.querySelector(".category");
const categoryElem = document.querySelector(".category");
const dialogContainer = document.querySelector('.dialog-container')
const orderListIcon = document.querySelector('.order-list-icon');
const closeCardBtn = document.querySelector('.close-card-btn')
const orderListContent = document.querySelector('.order-list-content')
const orderListBody = document.querySelector('.order-list-body')
const orderListHeader = document.querySelector('.order-list-header')
const orderListFooter = document.querySelector('.order-list-footer')
const themeItems = document.querySelectorAll('.theme-item')
const themes = document.querySelector('.themes')
const themeSettingsIcon = document.querySelector('.theme-settings-icon')
const themeContainer = document.querySelector('.theme-container')
// let closeDialogBtn = document.querySelector('.close-dialog-btn')
let foodCardSum;
const myFirebaseApi = "https://digital-online-menu-default-rtdb.firebaseio.com/";
const myJsonDb = "./databaseJSON/db.json"
let foodToCard;
let addedToCard;
let cardPlus;
let cardCount;
let cardMinus;
let cardItems = []
let addBtns = []
let headerHeight = document.querySelector(".header").offsetHeight;
// categoryElem.addEventListener("click", (e) => {
//     e.target.closest("a")
//         ? window.scrollTo({
//             top: this.offsetHeight - headerHeight,
//             behavior: "smooth",
//         })
//         : null;
// });

// DataBase

let category = [];
// const category = [
//     { id: 1, title: "توضیحات | NOTE", imgName: "schedule.svg" },
//     { id: 2, title: "پرطرفدارها | POPULAR", imgName: "popular.svg" },
//     { id: 3, title: "پیش غذا | APPETIZER", imgName: "APPETIZER.svg" },
//     { id: 4, title: "سالاد | SALAD", imgName: "SALAD.svg" },
//     { id: 5, title: "غذای اصلی | MAIN COURSE", imgName: "MAIN-COURSE.svg" },
//     { id: 6, title: "پیتزا | PIZZA", imgName: "PIZZA.svg" },
//     { id: 7, title: "صبحانه‌ | BREAKFAST", imgName: "BREAKFAST.svg" },
//     { id: 8, title: "دسر | DESSERT", imgName: "DESSERT.svg" },
//     { id: 9, title: "نوشیدنی‌های سرد | COLD DRINKS", imgName: "COLD-DRINKS.svg" },
//     { id: 10, title: "قهوه | COFFEE", imgName: "COFFEE.svg" },
// ];

// const foods = [
//     {
//         id: 1,
//         title: "هالومی 🌶| Halloumi",
//         categoryId: 4,
//         price: [127],
//         isOptional: false,
//         OptionType: false,
//         options: [null],
//         imgName: "Halloumi.jpg",
//         description:
//             "سینه مرغ، بیبی اسفناج، کاهو رسمی، پنیر هالومی، سس سبز  Grilled Chicken, Grilled Halloumi, Cheese, Lettuce, Apples, Baby Spinach, Strawberry Dressing",
//     },
//     {
//         id: 2,
//         title: "هالومی 🌶| Halloumi",
//         categoryId: 4,
//         price: [127, 120, 110],
//         isOptional: true,
//         OptionType: "نوع شومفخ مرغ",
//         options: ["مرغ گریل", "مرغ سوخاری", "مرغ پخته"],
//         imgName: "Halloumi.jpg",
//         description:
//             "سینه مرغ، بیبی اسفناج، کاهو رسمی، پنیر هالومی، سس سبز  Grilled Chicken, Grilled Halloumi, Cheese, Lettuce, Apples, Baby Spinach, Strawberry Dressing",
//     },
//     {
//         id: 3,
//         title: "هالومی 🌶| Halloumi",
//         categoryId: 4,
//         price: [127],
//         isOptional: false,
//         OptionType: "نوع پخت مرغ",
//         options: ["مرغ گریل", "مرغ سوخاری"],
//         imgName: "Halloumi.jpg",
//         description:
//             "سینه مرغ، بیبی اسفناج، کاهو رسمی، پنیر هالومی، سس سبز  Grilled Chicken, Grilled Halloumi, Cheese, Lettuce, Apples, Baby Spinach, Strawberry Dressing",
//     },
//     {
//         id: 4,
//         title: "آووکادو تست🥑 | Avocado Toast",
//         categoryId: 7,
//         price: [187],
//         isOptional: false,
//         OptionType: "",
//         options: [],
//         imgName: "avocado-toast-normal.jpg",
//         description:
//             "آووکادو تست  یک تست خامه‌ای و کریسپی و ترد است که یک صبحانه و میان وعده به شمار می‌رود و یا یک غذای خوشمزه و ساده است و بهتر است بلافاصله مصرف شود زیرا آووکادو با گذشت زمان تغییر رنگ می‌دهد و قهوه‌ای و فاسد می‌شود Avocado toast is creamy, crisp and so satisfying. Its a delicious and simple breakfast, snack or light meal! Its best consumed immediately, since the avocado browns over time",
//     },
//     {
//         id: 5,
//         title: "آووکادو تست🥑 | Avocado Toast",
//         categoryId: 7,
//         price: [187],
//         isOptional: false,
//         OptionType: "",
//         options: [],
//         imgName: "avocado-toast-normal.jpg",
//         description:
//             "آووکادو تست  یک تست خامه‌ای و کریسپی و ترد است که یک صبحانه و میان وعده به شمار می‌رود و یا یک غذای خوشمزه و ساده است و بهتر است بلافاصله مصرف شود زیرا آووکادو با گذشت زمان تغییر رنگ می‌دهد و قهوه‌ای و فاسد می‌شود Avocado toast is creamy, crisp and so satisfying. Its a delicious and simple breakfast, snack or light meal! Its best consumed immediately, since the avocado browns over time",
//     },
// ];

let foods = [];






















// Functions

function changeTheme(themeId) {
    document.documentElement.className = themeId
    localStorage.setItem('theme', themeId)
}


function generateCategoryItems() {
    category.forEach((catItem) => {
        const catTitleShort = catItem.title.split('|')[0]
        const castItem = `
                <div class="cat-item bg-primary-subtle2 d-flex flex-column justify-content-center align-items-center rounded rounded-4 me-3 pt-1 h-70 w-25vw w-sm-17vw w-md-10vw h-md-80 w-xl-8vw">
                    <a href="#cat-${catItem.id}" class="d-flex flex-column justify-content-center align-items-center">
                        <img class="w-45 w-md-65 w-xl-60" src="images/icons/${catItem.imgName}" alt="" />
                        <p class="text-center">${catTitleShort}</p>
                    </a>
                </div>`
        categoryContainer.insertAdjacentHTML("afterbegin", castItem);
    });
}

async function generateMenuItems(...categoryArray) {

    categoryArray.forEach((cat) => {
        foods.some((item) => item.categoryId == cat.id)
            ? mainContainer.insertAdjacentHTML(
                "beforeend",
                `
    <!-- Title -->
    <p class="title-p"><a class="title-a" id="cat-${cat.id}"></a></p>
      
    <div  class="category-title d-flex flex-column justify-content-center align-items-center position-relative mt-5 mb-5 ">
        <span class="bg-secondary text-primary fw-bolder fs-5 position-absolute px-3">« ${cat.title} »</span>
        <div class="bg-secondary-subtle3 p-1s w-80 rounded rounded-1"></div>
    </div>
    <!-- Title -->
    `
            )
            : null;

        const catFoods = foods.filter((item) => item.categoryId === cat.id);

        catFoods.forEach((item) => {
            if (item.isOptional) {
                const minPrice = Math.min(...item.price);
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white w-lg-50 mx-auto my-4  pt-2 px-0 rounded rounded-4 overflow-hidden" id="food-${item.id}">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center">
                <div class="ps-2 pb-2">
                    <img class="img-fluid  rounded rounded-2" src="images/${item.imgName}" alt="" />
                </div>
            </div>
            <div class="menu-item-text col-8 col-sm-9 d-flex flex-column p-0 ">
                <h5 class="menu-item-title ps-3 ">${item.title}</h5>
                <div class="menu-item-content pt-0 px-3 fs-6s">${item.description}</div>
                <span class="fs-6l mt-2 mb-2  px-4 ">
                    <small> از </small>
                    <b>${minPrice}</b>
                    <small>هزار تومان</small>
                </span>
            </div>
            <details class="bg-secondary-subtle py-2">
                <summary>
                    <h6>قابلیت انتخاب <span class="text-primary">« ${item.OptionType} »</span></h6>
                </summary>
                <ul id="food-${item.id}-option" class="row p-0 justify-content-center align-items-center">

                </ul>
            </details>
        </div>
        <!-- item -->
        `
                );

                let summaryUl = document.querySelector(`#food-${item.id}-option`);
                for (let i = 0; i < item.options.length; i++) {
                    summaryUl.insertAdjacentHTML(
                        "beforeend",
                        `
                <li class="d-flex  justify-content-between align-items-center  w-80 py-2 ">
                    <span id="food-option-${i}">${item.options[i]}</span>
                    <strong class="text-primary fw-bold">${item.price[i]}<small class="fs-7">هزار تومان</small></strong>
                            
                            <a href="##" class="add-btn float-end text-white fs-6 px-4 py-2 bg-primary-dark rounded rounded-5" id="add-food-${item.id}"
                            onclick="cardPlusFunc(event, ${item.id}, ${i},${item.price[i]})">افزودن</a>
                </li>
                        
                `
                    );
                }
            } else {
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white w-lg-50 mx-auto my-4  pt-2 px-0 rounded rounded-4 overflow-hidden" id="food-${item.id}">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center">
                <div class="ps-2 pb-2">
                    <img class="img-fluid  rounded rounded-2" src="images/${item.imgName}" alt="" />
                </div>
            </div>
            <div class="menu-item-text col-8 col-sm-9 d-flex flex-column p-0 ">
                <h5 class="menu-item-title ps-3 ">${item.title}</h5>
                <div class="menu-item-content pt-0 px-3 fs-6s">${item.description}</div>
                <span class="fs-6l mt-2 mb-2  px-4 ">
                    <b>${item.price[0]}</b>
                    <small>هزار تومان</small>
                    
                        <a href="##" class="add-btn float-end text-white fs-6 px-4 py-2 bg-primary-dark rounded rounded-5" id="add-food-${item.id}"
                        onclick="cardPlusFunc(event, ${item.id})">افزودن</a>
                    
                </span>
            </div>
        </div>
        <!-- item -->
        `
                );
            }
        });
    });
    // addBtns = document.querySelectorAll('.add-btn')

    // console.log(addBtns);


};



async function generateCard(cardItemsArray) {

    console.log(cardItemsArray);
    let addCard;
    let cardItem;


    cardItemsArray.forEach(item => {
        orderListBody.innerHTML = ''
        orderListFooter.innerHTML = ''

        if (cardItemsArray.length > 0) {
            cardItemsArray.forEach((item, index) => {

                let flag = false

                if (!item.isOptional) {
                    flag = true
                    const optionIndex = 0
                    addCard = `
                    <a href="##" class="added-to-card fade-in text-white float-end  fs-7 fs-md-6 fs-lg-4  px-2  py-0 bg-primary-dark border rounded rounded-5" id="added-food-${item.id}">
                        <ul class="d-flex justify-content-between align-items-baseline p-0 py-1 px-lg-3 py-lg-2">
                            <li class="card-plus" id="card-plus-option-${optionIndex}" onclick="cardPlusFunc(event, ${item.id} , ${optionIndex})">+</li>
                            <li class="card-count px-2 px-lg-3">${item.isOptional ? item.quantity[optionIndex] : item.quantity}</li>
                            <li class="card-minus" id="card-minus-option-${optionIndex}"  onclick="cardMinusFunc(event, ${item.id},${optionIndex})">-</li>
                        </ul>
                    </a>`
                    cardItem = `
                    <div class="menu-item h-7vh row w-95  bg-secondary-subtle2 text-white mx-auto my-2  px-1 px-lg-5 rounded rounded-5 overflow-hidden" id="food-${item.id}">
                        <div class="menu-item-text col-8 col-sm-9 d-flex align-items-center p-0 h-100 ">
                            ${addCard}
                            <span class="fs-6 mt-2 mb-2  px-4 fs-lg-5 ">
                                <b>${item.price[optionIndex]}</b>
                                <small class="smallest">هزار تومان</small>
                            </span>
                        </div>
                        <div class="col-4 col-sm-3 d-flex p-0 py-2 align-items-center position-relative start-5-minus">
                            <h5 class="menu-item-title fs-6 fs-lg-3 p-0 m-0">${item.title}</h5>
                        </div>
                    </div>`
                    orderListBody.insertAdjacentHTML('beforeend', cardItem)
                }
                else if (item.isOptional) {

                    item.quantity.forEach((quantity, optionIndex) => {

                        if (item.quantity[optionIndex] != 0) {
                            flag = true
                            addCard = `
                            <a href="##" class="added-to-card fade-in text-white float-end  fs-7 fs-md-6 fs-lg-4  px-2  py-0 bg-primary-dark border rounded rounded-5 " id="added-food-${item.id}">
                                <ul class="d-flex justify-content-between align-items-baseline p-0 py-1 px-lg-3 py-lg-2">
                                    <li class="card-plus" id="card-plus-option-${optionIndex}" onclick="cardPlusFunc(event, ${item.id} , ${optionIndex})">+</li>
                                    <li class="card-count px-2 px-lg-3">${item.isOptional ? item.quantity[optionIndex] : item.quantity}</li>
                                    <li class="card-minus" id="card-minus-option-${optionIndex}"  onclick="cardMinusFunc(event, ${item.id},${optionIndex})">-</li>
                                </ul>
                            </a>`

                            cardItem = `
                            <div class="menu-item h-7vh row w-95  bg-secondary-subtle2 text-white mx-auto my-2  px-1 px-lg-5 rounded rounded-5 overflow-hidden " id="food-${item.id}">
                                <div class="menu-item-text col-8 col-sm-9 d-flex align-items-center p-0 h-100 ">
                                    ${addCard}
                                    <span class="fs-6 mt-2 mb-2  px-4 fs-lg-5 ">
                                        <b>${item.price[optionIndex]}</b>
                                        <small class="smallest">هزار تومان</small>
                                    </span>
                                </div>
                                <div class="col-4 col-sm-3 d-flex p-0 py-2 align-items-center position-relative start-5-minus">
                                    <h5 class="menu-item-title fs-6 fs-lg-3 p-0 m-0">${item.title}</h5>
                                    <small class="ps-0 ms-1 text-primary smallest fs-lg-6l">${item.options[optionIndex]}</small>
                                </div>
                            </div>`
                            orderListBody.insertAdjacentHTML('beforeend', cardItem)


                        }
                    })

                }
            })

        }
    })

    const sumCardItems = `
        <div class="menu-item h-7vh row w-95 justify-content-between bg-secondary-subtle2 text-white mx-auto my-2  px-4 rounded rounded-5 overflow-hidden">
                <div class="col-4 col-sm-3 d-flex p-0 py-2 align-items-center">
                    <h3 class="menu-item-title text-warning fw-bolder p-0 ps-2 m-0 fs-5 fs-lg-3">مجموع</h3>
                </div>
                <div class="menu-item-text col-8 col-sm-9 d-flex align-items-center p-0 h-100 text-end w-auto">
                    <span class="fs-6 fs-lg-4 mt-2 mb-2  ps-4 ">
                        <b id="food-card-sum">${(cardSumFunc(cardItems) * 1000).toLocaleString()}</b>
                        <small>تومان</small>
                    </span>
                </div>
        </div>`
    orderListFooter.insertAdjacentHTML('beforeend', sumCardItems)
    foodCardSum = document.getElementById('food-card-sum')




}




function generateDialog(item) {
    const minPrice = Math.min(...item.price);
    const smallElem = item.price.length > 1 ? `<small class="text-primary fs-6s"> از </small> ` : ''

    const dialogElement = `
    <div class="dialog fade-in col-12 col-sm-10 col-md-7 col-lg-5 col-xl-3 w-xl-30 d-flex flex-column mx-auto rounded rounded-4 overflow-hidden position-fixed">
        <div class=" w-100 d-flex justify-content-center align-items-center rounded rounded-top-4 overflow-hidden ">
        <b class="close-dialog-btn text-primary text-center position-absolute top-1 start-5 fs-2 translate-middle rounded-4 px-3 pt-1" >✕</b>    
        <img src="images/${item.imgName}" class="rounded-top-4 w-100" alt="" />
        </div>
        <div class="dialog-cart py-3 w-100 d-flex justify-content-center  rounded-bottom-4 overflow-hidden align-items-center bg-secondary">
            <div class="dialog-desc w-90 h-80 rounded rounded-3">
                <div class="dialog-title-container d-flex justify-content-around w-100 text-white pt-1">
                <h1 class="dialog-title fs-6s fs-sm-6l">${item.title}</h1>
                <h1 class="dialog-title fs-6s fs-sm-6l">
                        ${smallElem}
                        ${minPrice}
                        <small class="text-primary fs-6s"> هزار تومان </small>
                    </h1>
                </div>

                <div class="d-flex justify-content-center w-100">
                <!-- <button class="bg-primary py-3 w-80 border-0 rounded rounded-5 user-select-none mt-4 fs-6s fs-sm-6l" id="add-to-card">افزودن به یادداشت سفارش</button>  -->
                <div class="text-white text-justify lh-lg pt-0 fs-6s">${item.description}</div>
                </div>
            </div>
         </div>
    </div>
    
    `

    dialogContainer.insertAdjacentHTML('afterbegin', dialogElement)
    dialogContainer.querySelector('.dialog').classList.add('dialog-show');
    const closeDialogBtn = document.querySelector('.close-dialog-btn')
    closeDialogBtn.addEventListener('click', closeDialog)
    document.body.classList.remove('overflow-auto')
    document.body.classList.add('overflow-hidden')


}

async function callApiFunctions() {
    await getRequest("category")
        .then((result) => {
            category = result.filter(item => item);
            generateCategoryItems();
        })
        .catch((err) => {
            callApiFunctions();
        });
    await getRequest("foods")
        .then((result) => {
            foods = result.filter(item => item);
            generateMenuItems(...category).then(res => getCardItems());

        })
        .catch((err) => {
            callApiFunctions();
        });

    await carouselHandler();
}

async function callJsonFunctions() {
    await getJson("category")
        .then((result) => {
            category = result.filter(item => item);
            generateCategoryItems();
        })
        .catch((err) => {
            console.error('Reading Json file Error : ', err);
        });
    await getJson("foods")
        .then((result) => {
            foods = result.filter(item => item);
            generateMenuItems(...category).then(res => {

                getCardItems()

            })

        })
        .catch((err) => {
            console.error('Reading Json file Error : ', err);
        });

    await carouselHandler();
}

async function carouselHandler() {
    const categoty = document.querySelector(".category");
    const catItems = document.querySelectorAll(".cat-item");
    catItems.forEach((cat, index) => {
        cat.addEventListener("click", (e) => {
            // e.preventDefault();

            const catLink = e.target.closest(".category a");
            const catHref = catLink.getAttribute("href").split("#")[1];
            const section = document.getElementById(catHref);
            section && section.scrollIntoView({ behavior: "smooth" });

            // Remove 'black' class from all cat elements
            catItems.forEach((d) => d.classList.remove("black"));
            // Add 'black' class to the clicked cat element
            cat.classList.add("black");

            const rect = cat.getBoundingClientRect();

            // Get the width of the div element
            const categoryWidth = categoty.clientWidth;
            const catItemWidth = rect.width;
            const scrollableWidth = categoty.scrollWidth;

            // Calculate the scroll position to center the clicked cat element
            const scrollX = rect.left + categoty.scrollLeft - categoryWidth / 2 + catItemWidth / 2;

            // Ensure the scroll position is within the bounds of the scrollable area
            const maxScrollX = scrollableWidth - categoryWidth;
            const finalScrollX = Math.max(0, Math.min(maxScrollX, scrollX));

            // Scroll the div element horizontally to position the clicked cat element in the middle

            categoty.scrollTo({
                left: finalScrollX,
                behavior: "smooth",
            });

            e.target.click()


        });
    });

    categoryContainer.scrollLeft = categoryElem.scrollWidth - categoryElem.clientWidth;
}

function cardSumFunc(cardArray) {
    let sum = 0
    cardArray.forEach(item => {
        if (!item.isOptional) {
            sum += Number(item.price) * Number(item.quantity)
        }
        else {
            item.quantity.forEach((q, index) => {
                sum += Number(q) * Number(item.price[index])
            })
        }
    })


    console.log('sum = ', sum);
    return sum
}



function cardPlusFunc(event, foodId, optionIndex) {

    foodToCard = cardItems.find(item => item.id == foodId) || foods.find(item => item.id == foodId)
    const index = cardItems.indexOf(foodToCard)
    cardCount = event.target.nextElementSibling;
    console.log(event);
    console.log(cardCount);
    const isInCard = cardItems.some(item => item.id == foodToCard.id)
    if (!isInCard || index < 0) {
        !foodToCard.isOptional ? foodToCard.quantity = 1 : null
        if (foodToCard.isOptional) {
            foodToCard = { ...foodToCard, quantity: [] }
            foodToCard.price.forEach((price, priceIndex) => {
                if (foodToCard.isOptional && optionIndex == priceIndex) {

                    foodToCard.quantity[priceIndex] = 1
                }
                else if (foodToCard.isOptional && optionIndex != priceIndex) {

                    foodToCard.quantity[priceIndex] = 0
                }
            })
        }

        // foodToCard.isOptional ? foodToCard.quantity = [1] : null
        cardItems.push(foodToCard)
    }
    else {

        if (!foodToCard.isOptional) {
            cardItems[index].quantity++
            cardCount.innerHTML = cardItems[index].quantity
        }
        else if (foodToCard.isOptional && cardItems[index].quantity[optionIndex]) {
            foodToCard.quantity[optionIndex]++
            cardCount.innerHTML = cardItems[index].quantity[optionIndex]
        }
        else if (foodToCard.isOptional && !cardItems[index].quantity[optionIndex]) {
            foodToCard.quantity[optionIndex] = 1
        }



    }
    console.log(cardItems);
    localStorage.setItem('cardItems', JSON.stringify(cardItems))
    addBtns = document.querySelectorAll('.add-btn')
    addedBtns = document.querySelectorAll('.added-to-card')
    cardCount && btnUpdateFunc(foodId, optionIndex, cardCount.innerHTML)
    foodCardSum.innerHTML = cardItems ? (cardSumFunc(cardItems) * 1000).toLocaleString() : 0
}

function cardMinusFunc(event, foodId) {
    foodToCard = cardItems.find(item => item.id == foodId) || foods.find(item => item.id == foodId)

    const optionIndex = event.target.id.split('-')[3]
    console.log(event);
    console.log(optionIndex);
    const index = cardItems.indexOf(foodToCard)
    cardCount = event.target.previousElementSibling;
    if (!foodToCard.isOptional) {
        cardItems[index].quantity--
        cardCount.innerHTML = cardItems[index].quantity
    }
    else if (foodToCard.isOptional && cardItems[index].quantity[optionIndex]) {
        foodToCard.quantity[optionIndex]--
        cardCount.innerHTML = cardItems[index].quantity[optionIndex]
    }
    // else if (foodToCard.isOptional && !cardItems[index].quantity[optionIndex]) {
    //     foodToCard.quantity[optionIndex] = 1
    //     cardCount = event.target.nextElementSibling;
    //     console.log(cardCount);
    //     cardCount.innerHTML = cardItems[index].quantity[optionIndex]
    // }
    // const isInCard = cardItems.some(item => item == foodToCard)
    // foodToCard.quantity--;

    if (foodToCard.quantity == 0 || cardItems[index].quantity[optionIndex] == 0) {
        if (cardItems[index].quantity == 0 || cardItems[index].quantity.length == 1) {
            cardItems.splice(index, 1)
            const addCard = event.target.closest('.added-to-card')
            const addBtn = `
                    <a href="##" class="add-btn fade-in float-end text-white fs-6 px-4 py-2 bg-primary-dark rounded rounded-5" id="add-food-${foodToCard.id}"
                            onclick="cardPlusFunc(event, ${foodToCard.id},${optionIndex})">افزودن</a>`

            addCard.outerHTML = addBtn
        }

        else {
            // cardItems[index].quantity.splice(optionIndex, 1)
            cardItems[index].quantity[optionIndex] = 0
            console.log(cardItems[index].quantity);
            console.log(event);
            const addCard = event.target.closest('.added-to-card')
            const addBtn = `
                <a href="##" class="add-btn fade-in float-end text-white fs-6 px-4 py-2 bg-primary-dark rounded rounded-5" id="add-food-${foodToCard.id}"
                        onclick="cardPlusFunc(event, ${foodToCard.id},${optionIndex})">افزودن</a>`


            addCard.outerHTML = addBtn
            generateCard(cardItems)
            addedBtns = document.querySelectorAll('.added-to-card')
            btnUpdateFunc(foodId, optionIndex, cardCount.innerHTML)
        }


    }
    console.log(cardItems);

    const quantityArray = foodToCard.quantity[optionIndex]
    const maxQuantity = quantityArray && Math.max(...foodToCard.quantity) || foodToCard.quantity
    if (!quantityArray && maxQuantity == 0) {
        cardItems.splice(index, 1)
        generateCard(cardItems)
    }

    localStorage.setItem('cardItems', JSON.stringify(cardItems))
    addedBtns = document.querySelectorAll('.added-to-card')
    btnUpdateFunc(foodId, optionIndex, cardCount.innerHTML)
    foodCardSum.innerHTML = (cardSumFunc(cardItems) * 1000).toLocaleString();
}


function btnUpdateFunc(foodId, optionIndex, cardCount) {
    console.log(foodId, optionIndex);
    console.log(addedBtns.length);

    [...addedBtns].forEach(btn => {
        if (btn.id == `added-food-${foodId}` && btn.children[0].children[0].id == `card-plus-option-${optionIndex}`) {
            let count = btn.children[0].children[1]
            count.innerHTML = cardCount
            if (cardCount == 0) {
                count.remove()
                const addBtn = `
                    <a href="##" class="add-btn fade-in float-end text-white fs-6 px-4 py-2 bg-primary-dark rounded rounded-5" id="add-food-${foodId}"
                        onclick="cardPlusFunc(event, ${foodId},${optionIndex})">افزودن</a>`



                btn.outerHTML = addBtn
            }
        }

    })


}

async function cardUpdateFunc(btns) {

    console.log(btns.length);
    if (cardItems.length > 0) {



        btns.forEach((addBtn, index) => {

            const foodId = addBtn.id.split('-')[2]
            foodId ? foodToCard = cardItems.find(item => item.id == foodId) : null
            const optionIndex = addBtn.previousElementSibling.previousElementSibling.id.split('-')[2] || 0

            let flag = false

            // foodToCard && console.log(foodToCard.quantity.length);
            if (foodToCard) {
                if (!foodToCard.quantity.length) { flag = true }
                else if (foodToCard.quantity[optionIndex] != 0) flag = true
            }






            if (flag) {
                const addCard = `
                <a href="##" class="added-to-card fade-in text-white float-end  fs-6 px-3 py-0 bg-primary-dark border rounded rounded-5" id="added-food-${foodId}">
                    <ul class="d-flex justify-content-between align-items-baseline p-0 pb-1 ">
                        <li class="card-plus pt-2 pe-2" id="card-plus-option-${optionIndex}" onclick="cardPlusFunc(event, ${foodId} , ${optionIndex})">+</li>
                        <li class="card-count pt-2 px-1">${foodToCard.isOptional ? foodToCard.quantity[optionIndex] : foodToCard.quantity}</li>
                        <li class="card-minus pt-2 ps-2" id="card-minus-option-${optionIndex}"  onclick="cardMinusFunc(event, ${foodId},${optionIndex})">-</li>
                    </ul>
                </a>`
                addBtn.outerHTML = addCard

            }
        })

    }
    addBtns = document.querySelectorAll('.add-btn')

}

async function getCardItems() {
    localStorage.getItem('cardItems') ? cardItems = JSON.parse(localStorage.getItem('cardItems')) : null
    addBtns = document.querySelectorAll('.add-btn')
    console.log(addBtns.length);
    cardUpdateFunc(addBtns)

}
async function changeAddBtn(e) {
    const addBtn = e.target.closest('.add-btn')
    if (addBtn) {
        const optionIndex = e.target.previousElementSibling.previousElementSibling.id.split('-')[2] || 0
        const foodId = addBtn.id.split('-')[2]
        foodToCard = foods.find(item => item.id == foodId)
        const addCard = `
        <a href="##" class="added-to-card fade-in text-white float-end  fs-6 px-3 py-0 bg-primary-dark border rounded rounded-5" id="added-food-${foodId}">
            <ul class="d-flex justify-content-between align-items-baseline p-0 pb-1 ">
                <li class="card-plus pt-2 pe-2" id="card-plus-option-${optionIndex}" onclick="cardPlusFunc(event, ${foodId} , ${optionIndex})">+</li>
                <li class="card-count pt-2 px-1">1</li>
                <li class="card-minus pt-2 ps-2" id="card-minus-option-${optionIndex}"  onclick="cardMinusFunc(event, ${foodId},${optionIndex})">-</li>
            </ul>
        </a>`
        addBtn.outerHTML = addCard
        // cardCount = e.target.closest('.card-count')
    }


}

function closeCard() {
    orderListBody.classList.remove('fade-in')
    orderListBody.classList.add('fade-out')
    orderListHeader.classList.remove('fade-in')
    orderListHeader.classList.add('fade-out')
    setTimeout(() => {
        orderListContent && orderListContent.classList.remove('fade-in-width');
        orderListContent && orderListContent.classList.add('fade-out-width');
    }, 170);

    setTimeout(() => {
        orderListContent && orderListContent.classList.add('visually-hidden');
    }, 1000);
    document.body.classList.remove('overflow-hidden')
    document.body.classList.add('overflow-auto')
}


function closeDialog() {
    const dialog = document.querySelector('.dialog')
    dialog && dialog.classList.add('fade-out')
    dialog && setTimeout(() => {
        dialog.remove()
    }, 600);
    document.body.classList.remove('overflow-hidden')
    document.body.classList.add('overflow-auto')

}




// Events

document.addEventListener('click', e => {
    const dialog = document.querySelector('.dialog')
    const foodItem = e.target.closest('.menu-item')
    const addBtn = e.target.closest('.add-btn')
    const addedBtn = e.target.closest('.added-to-card')
    if (foodItem && !dialog && !addBtn && !addedBtn) {
        const foodId = foodItem.id.split('-')[1]
        const food = foods.find(item => item.id == foodId)
        let isSummaryClicked = e.target.closest('details')
        !isSummaryClicked && generateDialog(food)
    }



    else {
        if (!e.target.closest('.dialog')) {
            dialog && dialog.classList.add('fade-out')
            dialog && setTimeout(() => {
                dialog.remove()
            }, 600);
        }
        document.body.classList.remove('overflow-hidden')
    document.body.classList.add('overflow-auto')
    }




})



document.addEventListener('keydown', e => {
    const dialog = document.querySelector('.dialog')
    if (e.key == 'Escape') {
        dialog && dialog.classList.add('fade-out');
        dialog && setTimeout(() => {
            dialog.remove()
        }, 600);

        closeCard()
    }
    document.body.classList.remove('overflow-hidden')
    document.body.classList.add('overflow-auto')

})

closeCardBtn.addEventListener('click', closeCard)



mainContainer.addEventListener('click', e => {
    changeAddBtn(e)
})



document.addEventListener('click', e => {

    addedToCard = e.target.closest('.added-to-card')
    if (addedToCard) {
        cardPlus = e.target.closest('.card-plus')
        cardCount = e.target.closest('.card-count')
        cardMinus = e.target.closest('.card-minus')
    }
})


orderListIcon.addEventListener('click', e => {
    document.body.classList.remove('overflow-auto')
    document.body.classList.add('overflow-hidden')
    orderListContent.classList.remove('visually-hidden');
    orderListContent.classList.remove('w-0');
    orderListContent && orderListContent.classList.remove('fade-out-width');
    orderListContent && orderListContent.classList.add('fade-in-width');
    setTimeout(() => {
        document.body.classList.remove('overflow-auto')
    document.body.classList.add('overflow-hidden')
        orderListBody.classList.remove('fade-out')
        orderListBody.classList.add('fade-in')
        orderListHeader.classList.remove('fade-out')
        orderListHeader.classList.add('fade-in')
    }, 500);
    generateCard(cardItems)


})


themes.addEventListener('click', e => {
    if (e.target.classList.contains("theme-item")) {
        const themeId = e.target.id
        changeTheme(themeId)
    }
})

window.addEventListener('load', () => {
    themeId = localStorage.getItem('theme') || 'default-theme'
    changeTheme(themeId)
})





themeSettingsIcon.addEventListener('click', e => {
    themeContainer.classList.toggle('theme-hide')
    themeContainer.classList.toggle('theme-active')

})













// API Functions 
async function postRequest(array, arrayStringName) {
    let req = `${myFirebaseApi}${arrayStringName}.json`;
    let res = await fetch(req, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array)
    });

    return res;
}
async function setRequest(array, arrayStringName, index) {

    // let req = `${myFirebaseApi}${arrayStringName}.json`;
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`
    console.log(req);
    let res = await fetch(req, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array)
    });

    return res;
}

async function getRequest(arrayStringName, index) {
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`
    // let req = `${myFirebaseApi}${arrayStringName}.json`;
    let res = await fetch(req);
    let resJson = await res.json();

    return Object.values(resJson);
}

async function deleteRequest(arrayStringName, index) {
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`
    // let req = `${myFirebaseApi}${arrayStringName}.json`;
    let res = await fetch(req, {
        method: "DELETE",
    });

    return res;
}

async function getJson(arrayStringName) {
    let req = `${myJsonDb}`
    let res = await fetch(req)

    let resJson = await res.json();
    console.log('res', resJson[arrayStringName]);

    return resJson[arrayStringName];
    return Object.values(resJson);

}

// Call Faunctions

// callApiFunctions(); // Fetch data from FireBase 
callJsonFunctions() // Fetch data from dbJSON