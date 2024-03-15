// variables

let foodPhotoName;
const myFirebaseApi = 'https://digital-online-menu-default-rtdb.firebaseio.com/'
const uid = '076cdb8b-2f9a-4bc1-a0af-d606e3086180'
const categoryElement = document.getElementById("category-selection");
const mainContainer = document.getElementById("main-container");
const formSubmit = document.querySelector("form");
const categorySelection = document.getElementById("category-selection");
const foodName = document.getElementById("food-name");
const optionallity = document.getElementById("optionallity");
const foodOption = document.getElementById("food-option");
const foodPrice = document.getElementById("food-price");
const foodDesc = document.getElementById("food-desc");
const foodPhoto = document.getElementById("food-photo");


// DataBase

let category = []
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


let foods = []
// foods = [
//     {
//         id: 0,
//         title: "deleted",
//         categoryId: 0,
//         price: [0],
//         isOptional: false,
//         OptionType: "",
//         options: [],
//         imgName: "",
//         description: ""
//     },
//     {

//         id: 1,
//         title: "هالومی 🌶| Halloumi",
//         categoryId: 4,
//         price: [127, 120],
//         isOptional: true,
//         OptionType: "نوع پخت مرغ",
//         options: ["مرغ گریل", "مرغ سوخاری"],
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


let foodsInStorage = JSON.parse(localStorage.getItem("foods"));
let foodsArray = !foodsInStorage ? [...foods] : foodsInStorage;

let foodIds = [];

let foodOptionType = []
// const foodOptionType = [
//     { type: "طعم", options: ["نیویورکی", "فندق", "کارامل", "نوتلا"] },
//     { type: "نوع مرغ", options: ["سینه", "ران"] },
//     { type: "نوع پخت مرغ", options: ["مرغ گریل", "مرغ سوخاری"] },
//     { type: "ادویه مخصوص", options: ["مالایی", "هندی (تند)", "ایرانی"] },
//     { type: "نوع پروتئین", options: ["گوشت", "مرغ"] },
//     { type: "طعم بستنی", options: ["شاتوت", "بلوبری", "تمشک"] },
//     { type: "کاپ", options: ["سینگل", "دبل"] },
// ];








// functions

function generateCategoryItems() {
    categoryElement.innerHTML = `<option selected value="">Select one</option>`
    category.forEach((item) => {
        let itemElem = `<option value="${item.id} - ${item.title}">${item.id} - ${item.title}</option>`;
        categoryElement.insertAdjacentHTML("beforeend", itemElem);
    });
}
async function generateFoodOptionallity() {
    optionallity.innerHTML = `<option selected value="">Select one</option>`
    foodOptionType.forEach((item) => {
        let itemElem = `<option value="${item.type}">${item.type}</option>`;
        optionallity.insertAdjacentHTML("beforeend", itemElem);
    });
}
function generateFoodOptions(optionType) {
    foodOption.innerHTML = `<option selected value="">Select one</option>`;
    optionType.forEach((item) => {
        let itemElem = `<option value="${item}">${item}</option>`;
        foodOption.insertAdjacentHTML("beforeend", itemElem);
    });
}

const generateMenuItems = (cat) => {
    mainContainer.innerHTML = `<h2 class="text-center fw-bolder">لیست کامل محصولات</h2>`;
    console.log('cat ', cat);
    cat.forEach((cat) => {
        foods.some((item) => item.categoryId == cat.id)
            && mainContainer.insertAdjacentHTML(
                "beforeend",
                `
    <!-- Title -->
    <p id="cat-${cat.id}" class="pt-1" ></p>    
    <div  class="category-title d-flex flex-column justify-content-center align-items-center position-relative mt-5 mb-5 ">
        <span class=" text-primary fw-bolder fs-5 position-absolute px-3">« ${cat.title} »</span>
    </div>
    <!-- Title -->
    `
            )

        const catFoods = foods.filter((item) => item.categoryId === cat.id);

        catFoods.forEach((item) => {
            if (item.isOptional) {
                const minPrice = Math.min(...item.price);
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white  my-4  pt-2 px-0 rounded rounded-4 overflow-hidden">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center">
                <div class="ps-2 pb-2">
                    <img class="img-fluid  rounded rounded-2" src="../images/${item.imgName}" alt="image" />
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
                <button class="btn btn-danger" id="delete-item-${item.id}">Delete</button>

                

            </div>
            <details class="bg-secondary-subtle py-2">
                <summary>
                    <h6>قابلیت انتخاب <span class="text-primary">« ${item.OptionType} »</span></h6>
                </summary>
                <ul id="food-${item.id}-option" class="row p-0 justify-content-center">

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
                <li class="d-flex  justify-content-between w-80 py-2">
                    <span class="">${item.options[i]}</span>
                    <strong class="text-primary fw-bold">${item.price[i]}<small class="fs-7">هزار تومان</small></strong>
                </li>
                `
                    );
                }
            } else {
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white  my-4  pt-2 px-0 rounded rounded-4 overflow-hidden">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center">
                <div class="ps-2 pb-2">
                    <img class="img-fluid  rounded rounded-2" src="../images/${item.imgName}" alt="" />
                </div>
            </div>
            <div class="menu-item-text col-8 col-sm-9 d-flex flex-column p-0 ">
                <h5 class="menu-item-title ps-3 ">${item.title}</h5>
                <div class="menu-item-content pt-0 px-3 fs-6s">${item.description}</div>
                <span class="fs-6l mt-2 mb-2  px-4 ">
                    <b>${item.price[0]}</b>
                    <small>هزار تومان</small>
                </span>
                <button class="btn btn-danger" id="delete-item-${item.id}">Delete</button>
            </div>
        </div>
        <!-- item -->
        `
                );
            }
        });
    });
};



function clearForm() {
    generateMenuItems(category);
    generateCategoryItems();
    generateFoodOptionallity();
    foodName.value = ''
    foodOption.innerHTML = `<option selected value="">Select one</option>`
    foodPrice.value = ''
    foodDesc.value = ''
    foodPhoto.value = ''
}

async function deleteItem(table, id) {

    // getRequest(`${table}`).then(res=>{
    //     foods = res.json().files(item=> item)
    //     foods.find
    // })

    console.log(id);
    console.log(foods);

    let itemDelete = foods.find(item => item.id == id)
    let arrayIndex = foods.indexOf(itemDelete)

    console.log(itemDelete);
    console.log(arrayIndex);


    let deletedFood = {
        id: 0,
        title: "deleted",
        categoryId: 0,
        price: [0],
        isOptional: false,
        OptionType: "",
        options: [],
        imgName: "",
        description: ""
    }
    // deleteRequest(`${table}`, arrayIndex)
    await setRequest(deletedFood, `${table}`, arrayIndex)
    await callApiFunctions()
}


async function submit(e) {
    const categorySelectionValue = categorySelection.value;
    const foodNameValue = foodName.value;
    const optionallityValue = optionallity.value;
    const foodOptionValue = foodOption.value;
    const foodPriceValue = foodPrice.value;
    const foodDescValue = foodDesc.value;
    // const foodPhotoName = foodPhoto.files[0].name;
    const catId = categorySelectionValue.split("-")[0];

    let duplicateFood = foods.find((food) => food.title === foodNameValue);
    let duplicateFoodIndex = foods.indexOf(duplicateFood);
    // console.log(foods);
    // console.log(foods[1]);
    // console.log(foods[duplicateFoodIndex]);
    if (duplicateFood) {
        foods[duplicateFoodIndex] = {
            id: foods[duplicateFoodIndex].id,
            title: foodNameValue,
            categoryId: catId ? Number(catId) : duplicateFood.categoryId,
            price: [...duplicateFood.price, foodPriceValue],
            isOptional: optionallityValue !== "" ? true : false,
            OptionType: optionallityValue !== "" ? optionallityValue : false,
            options: !duplicateFood.options ? [foodOptionValue] : [...duplicateFood.options, foodOptionValue],
            imgName: foodPhotoName,
            description: foodDescValue,
        };
    } else {
        // Generate Food id
        foods.forEach((food) => {
            foodIds.push(food.id);
        });
        let lastId = Math.max(...foodIds);

        let foodId = !lastId ? 0 : lastId;
        foodId++;

        const foodObject = {
            id: foodId,
            title: foodNameValue,
            categoryId: Number(catId),
            price: [foodPriceValue],
            isOptional: optionallityValue !== "" ? true : false,
            OptionType: optionallityValue !== "" ? optionallityValue : false,
            options: [foodOptionValue !== "" ? foodOptionValue : null],
            imgName: foodPhotoName,
            description: foodDescValue,
        };

        foods.push(foodObject);
    }

    localStorage.setItem("foods", JSON.stringify(foods));

    await setRequest(foods, 'foods')
    await callApiFunctions()

    clearForm()
}



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
    // let req = index ? `${myFirebaseApi}.auth.${uid}/${arrayStringName}/${index}.json` : `${myFirebaseApi}.auth.${uid}/${arrayStringName}.json`
    let res = await fetch(req, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array)
    });

    return res;
}

async function getRequest(arrayStringName, index) {
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`
    let res = await fetch(req);
    let resJson = await res.json();
    // console.log('res', res);

    return resJson;
    return Object.values(resJson);
}

async function deleteRequest(arrayStringName, index) {
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`
    let res = await fetch(req, {
        method: "DELETE",
    });

    return res;
}

async function callApiFunctions() {
    await getRequest('category').then(result => {
        category = result.filter(item => item)
        generateCategoryItems();
    })
        .catch(err => { callApiFunctions() })
    await getRequest('foods').then(result => {
        foods = result
        console.log(foods);
        generateMenuItems(category);
    })
        .catch(err => { callApiFunctions() })

    await getRequest('foodOptionType').then(result => {
        console.log(result);
        foodOptionType = result.filter(item => item)
        generateFoodOptionallity()
    })
        .catch(err => { callApiFunctions() })

}



// Call Functions


callApiFunctions()





optionallity.addEventListener("change", (e) => {
    const optionallityValue = optionallity.value;
    const opt = foodOptionType.find((item) => item.type == optionallityValue).options;
    console.log(opt);
    generateFoodOptions(opt);
});

// Events

mainContainer.addEventListener('click', e => {

    const idd = e.target.id.includes('delete') && e.target.id.split('-')[2]
    idd && deleteItem('foods', idd)


})


foodPhoto.addEventListener('change', e => {
    foodPhotoName = e.target.files[0].name;
    console.log(foodPhotoName);
})

formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    submit()

});



// foods = [
//     {
//         id: 0,
//         title: "deleted",
//         categoryId: 0,
//         price: [0],
//         isOptional: false,
//         OptionType: "",
//         options: [],
//         imgName: "",
//         description: ""
//     },
//     {

//         id: 1,
//         title: "هالومی 🌶| Halloumi",
//         categoryId: 4,
//         price: [127, 120],
//         isOptional: true,
//         OptionType: "نوع پخت مرغ",
//         options: ["مرغ گریل", "مرغ سوخاری"],
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


// setRequest(foods, 'foods')


// setRequest(category, 'category')
// setRequest(foodOptionType, 'foodOptionType')