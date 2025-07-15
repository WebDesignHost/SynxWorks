const lenis = new Lenis({
    autoRaf: true,
});

/* Let AOS know when Lenis scrolls */
lenis.on('scroll', AOS.refresh);

/* One hard refresh after everything is loaded */
window.addEventListener('load', () => {
  setTimeout(() => AOS.refreshHard(), 100);
});


const bottomToTopScroll = document.getElementById("bottomToTopScroll");

bottomToTopScroll.innerHTML = `
<div
    class="bottomToTop fadeIn w-10 cursor-pointer z-40 bg-[#54af...justify-center rounded-lg "><i class="fa-solid fa-angle-up"></i>
</div>`

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.querySelector(".bottomToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.remove("hidden");
        } else {
            scrollToTopBtn.classList.add("hidden");
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

AOS.init({
    once: true,
    duration: 1000
});

// ------------------------------
// Loader helpers
// ------------------------------
let loaderStartTime = 0;

function showLoader() {
    loaderStartTime = Date.now();
    const loader = document.getElementById('global-loader');
    if (!loader) return;

    loader.classList.remove('hidden');
    requestAnimationFrame(() => loader.classList.add('opacity-100'));
}

function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (!loader) return;

    const elapsed = Date.now() - loaderStartTime;
    const remainingTime = 500 - elapsed; // ensure at least 0.5s visible

    setTimeout(() => {
        loader.classList.remove('opacity-100');
        setTimeout(() => loader.classList.add('hidden'), 300); // wait for fade-out
    }, Math.max(0, remainingTime));
}

// Automatically hide the loader once page has fully loaded
window.addEventListener('load', hideLoader);

// ------------------------------
// FAQ Accordion Functionality
// ------------------------------
/**
 * Toggles an FAQ item’s visibility.
 * Each button in the markup calls toggleAccordion(n) – we attach the function
 * to the global scope so inline handlers keep working.
 * If you prefer to remove inline JS, comment the last line and dispatch your
 * own click listeners instead.
 *
 * @param {number} id – numeric identifier that matches the element IDs
 *                      e.g. content-1 / icon-1.
 */
function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);

    if (!content || !icon) return;

    // Collapse every other FAQ entry so only one is open at a time.
    document.querySelectorAll('[id^="content-"]').forEach(el => {
        if (el !== content) {
            el.style.maxHeight = null;
        }
    });
    document.querySelectorAll('[id^="icon-"]').forEach(ic => {
        if (ic !== icon) {
            ic.classList.remove('rotate-180');
        }
    });

    if (content.style.maxHeight) {
        // Close
        content.style.maxHeight = null;
        icon.classList.remove('rotate-180');
    } else {
        // Open
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate-180');
    }
}

// Expose globally for existing inline handlers.
window.toggleAccordion = toggleAccordion;

