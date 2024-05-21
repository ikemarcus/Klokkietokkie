document.addEventListener('DOMContentLoaded', (event) => {
    const excludeWeekendsCheckbox = document.getElementById('exclude-weekends');
    let interval; // Interval variabele buiten de functies gedeclareerd

    function updateCountdown() {
        const targetDate = new Date('2024-06-26T15:00:00');
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

            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
            document.getElementById('milliseconds').innerText = milliseconds;
        } else {
            clearInterval(interval);
            document.getElementById('countdown').innerText = 'Tom is klaar met zijn stage!';
        }
    }

    function calculateDifferenceExcludingWeekends(start, end) {
        let totalMilliseconds = 0;
        let current = new Date(start);

        while (current < end) {
            let day = current.getDay();
            if (day !== 0 && day !== 6) { // Exclude Sundays (0) and Saturdays (6)
                totalMilliseconds += 24 * 60 * 60 * 1000; // Add one day in milliseconds
            }
            current.setDate(current.getDate() + 1);
        }

        // Correct for the last partial day
        const remainingTime = end - new Date(current.setDate(current.getDate() - 1));
        if (new Date(current).getDay() !== 0 && new Date(current).getDay() !== 6) {
            totalMilliseconds += remainingTime;
        }

        return totalMilliseconds;
    }

    excludeWeekendsCheckbox.addEventListener('change', () => {
        clearInterval(interval);
        interval = setInterval(updateCountdown, 10);
        updateCountdown();
    });

    interval = setInterval(updateCountdown, 10);
    updateCountdown(); // Initial call to set the countdown immediately
});
