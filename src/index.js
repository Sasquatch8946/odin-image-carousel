import './styles.css';

const ImageCarousel = (function() {

    const posKey = {
        0: 0,
        1: -300,
        2: -600,
    }

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

    const fillBubble = function() {
        const circles = Array.from(document.querySelectorAll('.circle'));
        const filledIn = circles.filter((c) => c.style.backgroundColor !== '');
        if (filledIn.length === 0) {
            circles[0].style.backgroundColor = "black";
        }
    }

    activatePrevButton();
    activateNextButton();
    fillBubble();

    return {
    }
})();
