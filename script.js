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

    sealButton.addEventListener(
        "click",
        function () {


            /* Prevent double click */

            sealButton.disabled = true;


            /* Press animation */

            sealButton.style.transform =
                "translateX(-50%) scale(0.85)";


            setTimeout(
                function () {

                    sealButton.style.transform =
                        "translateX(-50%) scale(1.10)";

                },
                170
            );


            setTimeout(
                function () {

                    sealButton.style.transform =
                        "translateX(-50%) scale(1)";

                },
                340
            );


            /* Show welcome overlay */

            setTimeout(
                function () {

                    if (cardReveal) {

                        cardReveal.classList.add(
                            "show"
                        );

                    }

                },
                420
            );


            /* Start music */

            if (music) {

                music.play()

                    .then(
                        function () {

                            if (musicBtn) {

                                musicBtn.textContent =
                                    "❚❚";

                            }

                        }
                    )

                    .catch(
                        function () {

                            if (musicBtn) {

                                musicBtn.textContent =
                                    "♫";

                            }

                        }
                    );

            }


            /* Open main website */

            setTimeout(
                function () {


                    if (mainContent) {

                        mainContent.style.display =
                            "block";

                    }


                    if (openingScreen) {

                        openingScreen.classList.add(
                            "hide"
                        );

                    }


                    window.scrollTo(
                        {
                            top: 0,
                            behavior: "smooth"
                        }
                    );


                },
                1800
            );


        }
    );

}


/* ==================================================
   MUSIC BUTTON
================================================== */

if (musicBtn && music) {

    musicBtn.addEventListener(
        "click",
        function () {


            if (music.paused) {


                music.play()

                    .then(
                        function () {

                            musicBtn.textContent =
                                "❚❚";

                        }
                    )

                    .catch(
                        function () {

                            musicBtn.textContent =
                                "♫";

                        }
                    );


            }

            else {


                music.pause();

                musicBtn.textContent =
                    "♫";


            }


        }
    );

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


    /* Stop if countdown elements are not present */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /* Wedding reached */

    if (distance <= 0) {


        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";


        return;

    }


    /* Days */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    /* Hours */

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            )
            /
            (1000 * 60 * 60)
        );


    /* Minutes */

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            )
            /
            (1000 * 60)
        );


    /* Seconds */

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            )
            /
            1000
        );


    /* Show countdown */

    daysElement.textContent =
        String(days).padStart(
            2,
            "0"
        );


    hoursElement.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    minutesElement.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    secondsElement.textContent =
        String(seconds).padStart(
            2,
            "0"
        );


}


/* Run immediately */

updateCountdown();


/* Update every second */

setInterval(
    updateCountdown,
    1000
);


/* ==================================================
   PAGE LOAD ANIMATION
================================================== */

window.addEventListener(
    "load",
    function () {


        if (openingScreen) {

            openingScreen.classList.add(
                "loaded"
            );

        }


    }
);


/* ==================================================
   STOP MUSIC IF AUDIO ENDS
   Normally music loops, but this is a safety check
================================================== */

if (music) {

    music.addEventListener(
        "ended",
        function () {


            if (musicBtn) {

                musicBtn.textContent =
                    "♫";

            }


        }
    );

}


/* ==================================================
   ESC KEY - OPTIONAL
   Allows testing the main page quickly on laptop
================================================== */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key === "Escape" &&
            openingScreen
        ) {


            mainContent.style.display =
                "block";


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