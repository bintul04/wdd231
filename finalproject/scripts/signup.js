document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetID = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetID);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Simple form validation for signup form
    const signupForm = document.querySelector('#signup-form form');
    signupForm.addEventListener('submit', e => {
        const password = signupForm.querySelector('input[name="password"]').value;
        if (password.length < 6) {
            e.preventDefault();
            alert("Your password needs at least 6 characters.");
        }
    });

    // Simple form validation for signin form
    const signinForm = document.querySelector('#signin-form form');
    signinForm.addEventListener('submit', e => {
        const password = signinForm.querySelector('input[name="password"]').value;
        if (password.length === 0) {
            e.preventDefault();
            alert("Please enter your password!");
        }
    });
});
