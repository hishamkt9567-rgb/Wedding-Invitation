/* ==================================================
   GET ELEMENTS
================================================== */

const sealButton =
    document.getElementById("sealButton");

const cardReveal =
    document.getElementById("cardReveal");

const openingScreen =
    document.getElementById("openingScreen");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("backgroundMusic");

const musicBtn =
    document.getElementById("musicBtn");


/* ==================================================
   OPEN INVITATION
================================================== */

if (sealButton) {

    sealButton.addEventListener("click", function () {

        /* Prevent double click */

        sealButton.disabled = true;


        /* ==========================================
           START MUSIC
           Starts immediately after user interaction
        ========================================== */

        if (music) {

            music.volume = 0.5;
            music.currentTime = 0;

            const playPromise = music.play();

            if (playPromise !== undefined) {

                playPromise
                    .then(function () {

                        console.log("Wedding music started");

                        if (musicBtn) {
                            musicBtn.textContent = "❚❚";
                        }

                    })
                    .catch(function (error) {

                        console.log(
                            "Music could not start:",
                            error
                        );

                        if (musicBtn) {
                            musicBtn.textContent = "♫";
                        }

                    });

            }

        }


        /* ==========================================
           SEAL PRESS ANIMATION
        ========================================== */

        sealButton.style.transform =
            "translateX(-50%) scale(0.85)";


        setTimeout(function () {

            sealButton.style.transform =
                "translateX(-50%) scale(1.10)";

        }, 170);


        setTimeout(function () {

            sealButton.style.transform =
                "translateX(-50%) scale(1)";

        }, 340);


        /* ==========================================
           SHOW WELCOME / CARD REVEAL
        ========================================== */

        setTimeout(function () {

            if (cardReveal) {

                cardReveal.classList.add("show");

            }

        }, 420);


        /* ==========================================
           OPEN MAIN WEBSITE
        ========================================== */

        setTimeout(function () {

            if (mainContent) {

                mainContent.style.display = "block";

            }


            if (openingScreen) {

                openingScreen.classList.add("hide");

            }


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1800);

    });

}


/* ==================================================
   MUSIC ON / OFF BUTTON
================================================== */

if (musicBtn && music) {

    musicBtn.addEventListener("click", function () {

        if (music.paused) {

            music.volume = 0.5;

            music.play()
                .then(function () {

                    musicBtn.textContent = "❚❚";

                    console.log("Music playing");

                })
                .catch(function (error) {

                    console.log(
                        "Music play error:",
                        error
                    );

                    musicBtn.textContent = "♫";

                });

        }

        else {

            music.pause();

            musicBtn.textContent = "♫";

            console.log("Music paused");

        }

    });

}


/* ==================================================
   WEDDING COUNTDOWN
================================================== */

/*
   Wedding:
   27 December 2026
   4:00 PM
*/


const weddingDate =
    new Date(
        2026,
        11,
        27,
        16,
        0,
        0
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /* Stop if countdown is not on page */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /* Wedding date reached */

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;

    }


    /* Calculate time */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    /* Display countdown */

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* Run countdown immediately */

updateCountdown();


/* Update countdown every second */

setInterval(
    updateCountdown,
    1000
);


/* ==================================================
   PAGE LOAD ANIMATION
================================================== */

window.addEventListener("load", function () {

    if (openingScreen) {

        openingScreen.classList.add("loaded");

    }

});


/* ==================================================
   MUSIC SAFETY CHECK
================================================== */

if (music) {

    music.addEventListener("ended", function () {

        if (musicBtn) {

            musicBtn.textContent = "♫";

        }

    });


    /* Audio loading error */

    music.addEventListener("error", function () {

        console.log(
            "The music.mp3 file could not be loaded."
        );

        if (musicBtn) {

            musicBtn.textContent = "♫";

        }

    });

}


/* ==================================================
   ESC KEY
   Useful while testing on laptop
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            openingScreen
        ) {

            if (mainContent) {

                mainContent.style.display =
                    "block";

            }


            openingScreen.classList.add(
                "hide"
            );


            window.scrollTo(
                0,
                0
            );

        }

    }
);
