const searchInputDiv = document.querySelector(".search-input"); // searchinput
const searchInput = document.querySelector(".search-input input"); // searchinput

const autocomBox = document.querySelector(".autocom-box"); // autocombox

let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to become Freelancer",
    "How to become Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

let result = [];

// Events

searchInput.addEventListener("keyup", (event) => {
    result = suggestions.filter(function (suggestion) {
        return suggestion.toLowerCase().includes(searchInput.value.toLowerCase());
    });

    searchInputDiv.classList.add("active");

    autocomBox.style.opacity = 1;

    autocomBox.innerHTML = "";
    result.forEach(function (item) {
        autocomBox.insertAdjacentHTML(
            "afterbegin",
            `
        <ul>
        <li>
        ${item}
        </li>
        </ul>
        `
        );
    });
});

autocomBox.addEventListener("click", (event) => {
    searchInput.value = event.target.innerText;
    searchInputDiv.classList.remove("active");
});
