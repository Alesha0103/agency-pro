// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                // Stagger siblings
                const siblings = [
                    ...e.target.parentElement.querySelectorAll(".reveal"),
                ];
                const idx = siblings.indexOf(e.target);
                e.target.style.transitionDelay = idx * 0.1 + "s";
                e.target.classList.add("visible");
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.15 },
);
reveals.forEach((el) => observer.observe(el));

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.querySelector("span").textContent;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        el.innerHTML =
            Math.floor(eased * target) + "<span>" + suffix + "</span>";
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statNums = document.querySelectorAll(".stats__number[data-target]");
const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                statObserver.unobserve(e.target);
            }
        });
    },
    { threshold: 0.5 },
);
statNums.forEach((el) => statObserver.observe(el));

// Form submit
function handleSubmit(e) {
    e.preventDefault();

    const nameInput = e.target.querySelector("#name");
    const emailInput = e.target.querySelector("#email");
    const btn = e.target.querySelector("button");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";

    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters.";
        isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (!isValid) return;

    btn.textContent = "✓ Message Sent!";
    btn.style.background = "#22C55E";

    setTimeout(() => {
        btn.textContent = "Send Message";
        btn.style.background = "";
        e.target.reset();
    }, 2800);
}
