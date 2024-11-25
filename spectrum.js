document.addEventListener('DOMContentLoaded', () => {
    const guides = document.querySelectorAll('.guide'); // Select all guides
    const guideBackground = document.getElementById('guide_background'); // Select the background
    const userGuideIcon = document.getElementById('user_guide_icon'); // User guide icon
    let currentGuideIndex = 0;

    // Function to show the guides
    const showGuide = (index) => {
        guides.forEach((guide, i) => {
            if (i === index) {
                guide.classList.add('show');
            } else {
                guide.classList.remove('show');
            }
        });

        // Show or hide the background based on guide index
        if (index < guides.length) {
            guideBackground.style.opacity = '1';
            guideBackground.style.visibility = 'visible';
        } else {
            guideBackground.style.opacity = '0';
            guideBackground.style.visibility = 'hidden';
        }
    };

    // Initialize guide if coming from intro page
    if (document.referrer.includes('intro.html')) {
        showGuide(currentGuideIndex);
    } else {
        // Skip guides if not coming from intro page
        guideBackground.style.opacity = '0';
        guideBackground.style.visibility = 'hidden';
    }

    // Handle guide click events
    guides.forEach((guide) => {
        guide.addEventListener('click', () => {
            if (currentGuideIndex < guides.length - 1) {
                currentGuideIndex++;
                showGuide(currentGuideIndex);
            } else {
                guides.forEach((g) => g.classList.remove('show'));
                showGuide(guides.length); // Hide background
            }
        });
    });

    // Show guides when clicking on the user guide icon
    userGuideIcon.addEventListener('click', () => {
        currentGuideIndex = 0; // Restart guide sequence
        showGuide(currentGuideIndex);
    });

    // Additional logic (e.g., spectrum interaction) goes here...
});
