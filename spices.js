document.addEventListener('DOMContentLoaded', () => {
    fetch('flavor-atlas--json.txt') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded:', data); // Log the entire data to inspect it
            const spices = data.Sheet1;
            const spiceContainer = document.querySelector('.spice');

            const months = [
                'December', 'January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October', 'November'
            ];

            // Function to reset background colors of calendar months
            const resetCalendarColors = () => {
                const calendarMonths = document.querySelectorAll('.calendar h2');
                calendarMonths.forEach(monthElement => {
                    monthElement.style.backgroundColor = '#FBF4EC'; // Reset to default color
                });
            };

            // Function to highlight calendar months for the visible spice
            const highlightCalendarMonths = (startMonth, endMonth) => {
                const startMonthIndex = months.indexOf(startMonth);
                const endMonthIndex = months.indexOf(endMonth);

                if (startMonthIndex > endMonthIndex) {
                    for (let i = startMonthIndex; i < months.length; i++) {
                        document.getElementById(months[i]).style.backgroundColor = '#F2A461';
                    }
                    for (let i = 0; i <= endMonthIndex; i++) {
                        document.getElementById(months[i]).style.backgroundColor = '#F2A461';
                    }
                } else {
                    for (let i = startMonthIndex; i <= endMonthIndex; i++) {
                        document.getElementById(months[i]).style.backgroundColor = '#F2A461';
                    }
                }
            };

            // Function to adjust y-position of spice images based on flavor ratings
            const adjustPhotoPositions = (spiceName) => {
                const spiceData = spices.find(spice => spice["Spice name"] === spiceName);
                if (!spiceData) return;

                const flavorKeys = ["Sweetness", "Herbality", "Florality", "Citrus", "Earthiness", "Pungency", "Bitterness", "Spiciness"];
                
                flavorKeys.forEach(flavor => {
                    const rating = spiceData[flavor];
                    const photo = document.getElementById(flavor.toLowerCase());

                    if (rating !== undefined && photo) {
                        const yOffset = 100 - (30 + (rating - 1) * (70 / 9));
                        photo.style.transform = `translateY(-${yOffset}%)`;
                    }
                });
            };

            spices.forEach(spice => {
                const spiceDiv = document.createElement('div');
                spiceDiv.classList.add('spice-item');
                spiceDiv.dataset.spiceName = spice["Spice name"];
                spiceDiv.dataset.harvestStart = spice["Harverst Time - Start"];
                spiceDiv.dataset.harvestEnd = spice["Harverst Time - End"];

                const title = document.createElement('h1');
                title.classList.add('spice-title');
                title.textContent = spice["Spice name"];
                spiceDiv.appendChild(title);

                const plantType = document.createElement('h3');
                plantType.classList.add('plant-type');
                plantType.textContent = spice["Plant Family"];
                spiceDiv.appendChild(plantType);

                const img = document.createElement('img');
                img.src = `/Images/spice/${spice["Spice name"]}.jpeg`;
                img.alt = spice["Spice name"];
                spiceDiv.appendChild(img);

                const notes = document.createElement('p');
                notes.textContent = spice["Additional Notes"];
                spiceDiv.appendChild(notes);

                spiceContainer.appendChild(spiceDiv);
            });

            // Observer to detect visible spices
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const spiceDiv = entry.target;
                        const spiceName = spiceDiv.dataset.spiceName;
                        const harvestStart = spiceDiv.dataset.harvestStart;
                        const harvestEnd = spiceDiv.dataset.harvestEnd;

                        console.log(`Spice ${spiceName} is in view!`);
                        
                        // Update calendar colors
                        resetCalendarColors();
                        highlightCalendarMonths(harvestStart, harvestEnd);

                        // Adjust photo positions
                        adjustPhotoPositions(spiceName);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.spice-item').forEach(spiceDiv => {
                observer.observe(spiceDiv);
            });
        })
        .catch(error => {
            console.error('Error loading spices:', error);
        });
});
