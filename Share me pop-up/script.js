const pop_up = document.querySelector(".pop-up");
const overlay = document.querySelector(".overlay");

// pop_up open function
let openModal = () => {
    console.log("Pop-up is open");
    pop_up.classList.add("active");
    overlay.classList.add("overlayactive");
};

// pop_up open function
let closeModal = () => {
    console.log("Pop-up is open");
    pop_up.classList.remove("active");
    overlay.classList.remove("overlayactive");
};