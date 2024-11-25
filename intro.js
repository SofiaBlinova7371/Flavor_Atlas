document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('intro-text');
    const tapText = document.getElementById('tap-text');
    const introScreen = document.getElementById('intro-screen');
    const logoContainer = document.querySelector('.logo_container');
    const videoElement = logoContainer.querySelector('video');
    const paragraphs = [
        "In a world dominated by processed foods and rapid lifestyles, the role of flavor often goes overlooked.",
        "Every day, we miss out on over 5% of our lives by neglecting taste and smell.",
        "Flavor Atlas was created for those who wish to unlock the full spectrum of life through vibrant and diverse tastes and aromas."
    ];

    let currentParagraph = 0;
    let isTyping = false;
    let typeInterval;

    const adjustLayoutForMobile = () => {
        if (window.innerWidth <= 900) {
            textElement.style.width = '80vw'; // Mobile-specific width for text
            logoContainer.querySelector('video').style.width = '80vw'; // Mobile-specific width for logo
        } else {
            textElement.style.width = '35vw'; // Desktop-specific width
            logoContainer.querySelector('video').style.width = '20vw'; // Desktop-specific width
        }
    };

    const typeText = () => {
        const text = paragraphs[currentParagraph];
        textElement.innerHTML = ''; // Clear existing text
        isTyping = true;

        adjustLayoutForMobile(); // Adjust layout for mobile before typing

        let index = 0;
        typeInterval = setInterval(() => {
            if (index < text.length) {
                textElement.textContent += text[index];
                index++;
            } else {
                completeTyping();
            }
        }, 25); // Typing speed
    };

    const completeTyping = () => {
        clearInterval(typeInterval);
        tapText.style.opacity = '0.4'; // Show "Tap anywhere"
        isTyping = false;
    };

    const deleteText = () => {
        const text = textElement.textContent;
        isTyping = true;

        tapText.style.opacity = '0'; // Hide "Tap anywhere"

        let index = text.length;
        const deleteInterval = setInterval(() => {
            if (index > 0) {
                textElement.textContent = text.slice(0, --index);
            } else {
                clearInterval(deleteInterval);
                currentParagraph++;

                // Type the next paragraph or transition
                if (currentParagraph < paragraphs.length) {
                    setTimeout(typeText, 500); // Delay before typing the next paragraph
                }
            }
        }, 15); // Deletion speed
    };

    const slideUpAndShowLogo = () => {
        textElement.style.transition = 'transform 1s ease, opacity 1s ease';
        textElement.style.transform = 'translateY(-200%)';
        textElement.style.opacity = '0';

        setTimeout(() => {
            logoContainer.style.display = 'flex';
            logoContainer.classList.add('show');

            setTimeout(() => {
                videoElement.play();
                videoElement.addEventListener('ended', () => {
                    setTimeout(transitionToSpectrum, 1000);
                });
            }, 1500);
        }, 1000);
    };

    const transitionToSpectrum = () => {
        const transitionDiv = document.createElement('div');
        transitionDiv.id = 'spectrum-transition';
        document.body.appendChild(transitionDiv);

        setTimeout(() => {
            window.location.href = 'spectrum.html';
        }, 800);
    };

    introScreen.addEventListener('click', () => {
        if (isTyping) {
            clearInterval(typeInterval);
            textElement.textContent = paragraphs[currentParagraph];
            completeTyping();
        } else if (currentParagraph < paragraphs.length - 1) {
            deleteText();
        } else {
            slideUpAndShowLogo();
        }
    });

    // Adjust layout on window resize
    window.addEventListener('resize', adjustLayoutForMobile);

    // Start typing the first paragraph
    typeText();
});
