document.addEventListener('DOMContentLoaded', () => {
    const excludeWeekendsCheckbox = document.getElementById('exclude-weekends');
    const quoteContainer = document.getElementById('quote');
    let interval;
    let activeCountdown = 1;

    const quotes = [
        "Je kan het! ~ Ike",
        "Ik geloof in je! ~ Ike",
        "Love you! ~ Ike",
        "Ga ervoor! ~ Ike",
        "Je bent geweldig! ~ Ike",
        "Hou vol! ~ Ike",
        "Trots op je! ~ Ike",
        "Fantastisch werk! ~ Ike",
        "Doe je best! ~ Ike"
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteContainer.innerText = quotes[randomIndex];
    }

    function updateCountdown(targetDate, elements) {
        const now = new Date();
        let difference;

        if (excludeWeekendsCheckbox.checked) {
            difference = calculateDifferenceExcludingWeekends(now, targetDate);
        } else {
            difference = targetDate - now;
        }

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            const milliseconds = difference % 1000;

            elements.days.innerText = days;
            elements.hours.innerText = hours;
            elements.minutes.innerText = minutes;
            elements.seconds.innerText = seconds;
            elements.milliseconds.innerText = milliseconds;
        } else {
            clearInterval(interval);
            elements.days.innerText = 0;
            elements.hours.innerText = 0;
            elements.minutes.innerText = 0;
            elements.seconds.innerText = 0;
            elements.milliseconds.innerText = 0;
        }
    }

    function calculateDifferenceExcludingWeekends(start, end) {
        let totalMilliseconds = 0;
        let current = new Date(start);

        while (current < end) {
            let day = current.getDay();
            if (day !== 0 && day !== 6) {
                totalMilliseconds += 24 * 60 * 60 * 1000;
            }
            current.setDate(current.getDate() + 1);
        }

        // Adjust for the partial day if current is now past end
        if (current > end) {
            totalMilliseconds -= (current - end);
        }

        return totalMilliseconds;
    }

    function startCountdown() {
        clearInterval(interval);
        interval = setInterval(() => {
            updateCountdown(new Date('2024-06-26T15:00:00'), {
                days: document.getElementById('days-1'),
                hours: document.getElementById('hours-1'),
                minutes: document.getElementById('minutes-1'),
                seconds: document.getElementById('seconds-1'),
                milliseconds: document.getElementById('milliseconds-1')
            });

            updateCountdown(new Date('2024-06-07T17:00:00'), {
                days: document.getElementById('days-2'),
                hours: document.getElementById('hours-2'),
                minutes: document.getElementById('minutes-2'),
                seconds: document.getElementById('seconds-2'),
                milliseconds: document.getElementById('milliseconds-2')
            });

            updateCountdown(new Date('2024-05-31T17:00:00'), {
                days: document.getElementById('days-3'),
                hours: document.getElementById('hours-3'),
                minutes: document.getElementById('minutes-3'),
                seconds: document.getElementById('seconds-3'),
                milliseconds: document.getElementById('milliseconds-3')
            });

        }, 10);
    }

    function navigate(direction) {
        const countdowns = document.querySelectorAll('.countdown-container');
        countdowns[activeCountdown - 1].classList.remove('active');
        activeCountdown = (activeCountdown + direction + countdowns.length - 1) % countdowns.length + 1;
        countdowns[activeCountdown - 1].classList.add('active');

        const title = document.getElementById('countdown-title');
        if (activeCountdown === 1) {
            title.innerText = "Aftellen naar het einde van Tom's stage";
            quoteContainer.style.display = 'block';
            displayRandomQuote();
        } else if (activeCountdown === 2) {
            title.innerText = "Aftellen naar het einde van Ike's stage";
            quoteContainer.style.display = 'none';
        } else {
            title.innerText = "Aftellen naar het einde van Tim's stage";
            quoteContainer.style.display = 'none';
        }
    }

    excludeWeekendsCheckbox.addEventListener('change', () => {
        startCountdown();
        if (excludeWeekendsCheckbox.checked) {
            document.body.classList.add('weekend-excluded');
        } else {
            document.body.classList.remove('weekend-excluded');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            navigate(1);
        } else if (event.key === 'ArrowLeft') {
            navigate(-1);
        }
    });

    document.getElementById('prev').addEventListener('click', () => navigate(-1));
    document.getElementById('next').addEventListener('click', () => navigate(1));

    // Initialize the first countdown as active
    document.getElementById('countdown-1').classList.add('active');
    startCountdown(); // Initial call to start the countdown immediately

    displayRandomQuote(); // Display a random quote when the page loads
});
