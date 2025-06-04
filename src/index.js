import './styles.css';

const ImageCarousel = (function() {

    const posKey = {
        0: 0,
        1: -300,
        2: -600,
    }

    let slideIndx = 0;

    const getPictureFrame = function() {
        return document.querySelector('.picture-frame');

    }

    const getCurrentPos = function getCurrentPosition(pictureFrame) {
        const styles = window.getComputedStyle(pictureFrame);
        const currentPos = styles.getPropertyValue("left");
        const numPx = currentPos.split("px")[0]; 
        return numPx;
    }

    const minusPos = function decrementPosition(pictureFrame, numPx) {
        const numPxInt = parseInt(numPx);
        if (numPxInt > -600) {
            const newPos = numPxInt - 300;
            pictureFrame.style.left = `${newPos}px`;
        }
    }

    const plusPos = function incrementPosition(pictureFrame, numPx) {
        const numPxInt = parseInt(numPx);
        if (numPxInt < 0) {
            const newPos = numPxInt + 300;
            pictureFrame.style.left = `${newPos}px`;
        }
    }


    const activatePrevButton = function() {
        const prev = document.querySelector('.previous.button');
        prev.addEventListener("click", () => {
            const pictureFrame = getPictureFrame();
            const numPx = getCurrentPos(pictureFrame);
            plusPos(pictureFrame, numPx);
        });

    }

    const activateNextButton = function() {
        const next = document.querySelector('.next.button');
        next.addEventListener("click", () => {
            const pictureFrame = getPictureFrame();
            const numPx = getCurrentPos(pictureFrame);
            minusPos(pictureFrame, numPx);
        });
    }

    const fillBubble = function(indx) {
        const circles = Array.from(document.querySelectorAll('.circle'));
        const filledIn = circles.filter((c) => c.style.backgroundColor !== '');
        if (filledIn.length === 0) {
            circles[0].style.backgroundColor = 'black';
        } else {
            circles.forEach((c) => {
                c.style.backgroundColor = '';
            });
            circles[indx].style.backgroundColor = 'black';
        }
    }

    const setFramePos = function(indx) {
        const pictureFrame = getPictureFrame();
        pictureFrame.style.left = `${posKey[indx]}px`;
    }

    const activateBubbleNav = function() {
        const circles = Array.from(document.querySelectorAll('.circle'));
        circles.forEach((c) => {
            c.addEventListener("click", (event) => {
                const indx = circles.indexOf(event.target);
                fillBubble(indx);
                setFramePos(indx);
            });
        })
    }

    const progressSlideShow = function() {
        console.log("progressing slide show");
        if (slideIndx < 2) {
            slideIndx = slideIndx + 1;
        } else {
            slideIndx = 0;
        }

        fillBubble(slideIndx);
        setFramePos(slideIndx);
    } 

    const showSlides = function() {
        setInterval(progressSlideShow, 5000);
    }

    activatePrevButton();
    activateNextButton();
    fillBubble();
    activateBubbleNav();
    showSlides();

    return {
    }
})();
