// btn profil
let profil_btn = document.querySelector(".profil_pic");

profil_btn.addEventListener("click", () => {
    window.location.replace("/users");
});

(function () {
    window.addEventListener(
        "scroll",
        function () {
            let y = window.scrollY;

            document.querySelector("#mainPage_h2_1").style.transform =
                "translateY(" + y * 0.35 + "px)";

            let paralax2 = document.querySelector("#mainPage_div_title_2").offsetTop;
            if (y > paralax2 - window.innerHeight) {
                document.querySelector("#mainPage_h2_2").style.transform =
                    "translateY(" + (y - paralax2) * 0.35 + "px)";
            }

            let paralax3 = document.querySelector("#mainPage_div_title_3").offsetTop;
            if (y > paralax3 - window.innerHeight) {
                document.querySelector("#mainPage_h2_3").style.transform =
                    "translateY(" + (y - paralax3) * 0.35 + "px)";
            }
        },
        true
    );
})();