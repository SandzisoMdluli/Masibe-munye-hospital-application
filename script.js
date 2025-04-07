// Fade-in effect for elements on scroll
document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".animation");
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add("fade-in");
        }
    });
});

// CSS class for fade-in animation
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: fadeIn 2s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

