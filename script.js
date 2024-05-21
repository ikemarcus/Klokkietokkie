document.addEventListener('DOMContentLoaded', (event) => {
    const excludeWeekendsCheckbox = document.getElementById('exclude-weekends');

    function updateCountdown() {
        const targetDate = new Date('2024-06-26T15:00:00');
        const now = new Date();
        let difference = targetDate - now;

        if (excludeWeekendsCheckbox.checked) {
            difference = calculateDifferenceExcludingWeekends(now, targetDate);
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
        const endOfLastFullDay = new Date(start.getFullYear(), start.getMonth(), start.getDate() + Math.floor(totalMilliseconds / (24 * 60 * 60 * 1000)), 0, 0, 0, 0);
        totalMilliseconds += Math.max(0, end - endOfLastFullDay);

        return totalMilliseconds;
    }

    excludeWeekendsCheckbox.addEventListener('change', updateCountdown);

    const interval = setInterval(updateCountdown, 1);
});
