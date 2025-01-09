// Add dynamic canonical tag
document.addEventListener("DOMContentLoaded", () => {
    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");

    // If it's /index.html, change it to /
    const path = window.location.pathname === "/index.html" ? "/" : window.location.pathname;
    canonical.setAttribute("href", `${window.location.origin}${path}`);
    document.head.appendChild(canonical);
});

// Scroll fade effect
document.addEventListener("scroll", () => {
    const fadeElements = document.querySelectorAll(".scroll-fade");
    fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.bottom < 0 || rect.top > windowHeight) {
            el.style.opacity = 0;
        } else {
            el.style.opacity = 1;
        }
    });
});

// Dark/Light mode toggle
const toggleButton = document.getElementById("theme-toggle");

// Check localStorage for saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
    toggleButton.setAttribute("aria-label", "Toggle Light Mode");
}

// Toggle dark mode on button click
toggleButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    toggleButton.textContent = isDarkMode ? "☀️" : "🌙";
    toggleButton.setAttribute("aria-label", isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode");
});



// Select the hamburger button and navigation menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

// Add click event to toggle the 'show' class on the nav
hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Close the navigation menu when a link is clicked
document.addEventListener("DOMContentLoaded", () => {
    function toggleDetails(id) {
        const element = document.getElementById(id);
        element.style.display = element.style.display === "none" ? "block" : "none";
    }

    // Attach toggleDetails to all buttons with the class 'toggle-files'
    document.querySelectorAll('.toggle-files').forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            toggleDetails(targetId);
        });
    });
});

// Lightbox
document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const thumbnails = Array.from(document.querySelectorAll(".thumbnail-item img"));
    const images = thumbnails.map((thumbnail) => ({
        src: thumbnail.src,
        caption: thumbnail.closest(".thumbnail-item").querySelector("p").textContent
    }));

    let currentIndex = 0;

    // Open lightbox
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;

        // Adjust caption width after the image loads
        lightboxImg.onload = () => {
            lightboxCaption.style.width = `${lightboxImg.clientWidth}px`;
        };

        lightbox.classList.remove("hidden");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.add("hidden");
        document.body.classList.remove("lightbox-open");
    }

    function changeSlide(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        openLightbox(currentIndex);
    }

    // Close lightbox on close button
    closeBtn.addEventListener("click", closeLightbox);

    // Navigate slides
    nextBtn.addEventListener("click", () => changeSlide(1));
    prevBtn.addEventListener("click", () => changeSlide(-1));

    // Close when clicking outside the image
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
});