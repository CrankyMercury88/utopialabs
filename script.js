document.addEventListener('DOMContentLoaded', () => {
    const cursorGradient = document.querySelector('.cursor-gradient');
    let hue = 0;
    const trails = [];
    const maxTrails = 8;
    
    // Create trail elements
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '-1';
        trail.style.width = '100vw';
        trail.style.height = '100vh';
        trail.style.top = '0';
        trail.style.left = '0';
        trail.style.opacity = '0';
        trail.style.transition = 'opacity 0.8s ease-out';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            active: false,
            timeout: null
        });
    }

    let currentTrailIndex = 0;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Update hue for rainbow effect
        hue = (hue + 2) % 360;

        // Create a smaller, more concentrated gradient effect for main cursor
        cursorGradient.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
                hsla(${hue}, 90%, 65%, 0.4) 0%,
                hsla(${hue + 30}, 85%, 60%, 0.2) 5%,
                hsla(${hue + 60}, 80%, 55%, 0.1) 12%,
                rgba(0,0,0,0) 25%,
                #000000 40%
            )
        `;

        // Create trail effect
        const currentTrail = trails[currentTrailIndex];
        
        // Clear any existing timeout
        if (currentTrail.timeout) {
            clearTimeout(currentTrail.timeout);
        }

        // Set up the trail with a slightly different hue
        const trailHue = (hue - 30) % 360;
        currentTrail.element.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
                hsla(${trailHue}, 80%, 60%, 0.15) 0%,
                hsla(${trailHue + 40}, 75%, 55%, 0.08) 8%,
                rgba(0,0,0,0) 20%,
                #000000 35%
            )
        `;
        
        // Show the trail
        currentTrail.element.style.opacity = '1';
        currentTrail.active = true;

        // Set timeout to fade out the trail
        currentTrail.timeout = setTimeout(() => {
            currentTrail.element.style.opacity = '0';
            setTimeout(() => {
                currentTrail.active = false;
                currentTrail.element.style.background = '#000000';
            }, 800);
        }, 200);

        // Move to next trail
        currentTrailIndex = (currentTrailIndex + 1) % maxTrails;
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
