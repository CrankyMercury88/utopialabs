document.addEventListener('DOMContentLoaded', () => {
    const cursorGradient = document.querySelector('.cursor-gradient');
    let hue = 0;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update hue for rainbow effect
        hue = (hue + 1) % 360;

        // Create a more concentrated and colorful gradient effect
        cursorGradient.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
                hsla(${hue}, 100%, 70%, 0.6) 0%,
                hsla(${hue + 30}, 100%, 65%, 0.4) 10%,
                hsla(${hue + 60}, 100%, 60%, 0.2) 20%,
                hsla(${hue + 90}, 100%, 55%, 0.1) 30%,
                rgba(0,0,0,0) 50%, /* Start fading to transparent black */
                #000000 70% /* Ensure the rest is black */
            )
        `;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});