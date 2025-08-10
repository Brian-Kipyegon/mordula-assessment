document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Create error message containers
    const emailError = document.createElement('div');
    const passwordError = document.createElement('div');

    emailError.style.color = 'red';
    passwordError.style.color = 'red';
    emailError.style.fontSize = '0.9rem';
    passwordError.style.fontSize = '0.9rem';
    emailError.style.marginTop = '0.2rem';
    passwordError.style.marginTop = '0.2rem';

    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);
    passwordInput.parentNode.insertBefore(passwordError, passwordInput.nextSibling);

    form.addEventListener('submit', function (event) {
        let valid = true;
        emailError.textContent = '';
        passwordError.textContent = '';

        // Email validation
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            emailError.textContent = 'Email is required.';
            valid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            valid = false;
        }

        // Password validation
        const passwordValue = passwordInput.value.trim();
        if (!passwordValue) {
            passwordError.textContent = 'Password is required.';
            valid = false;
        } else if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            valid = false;
        }

        // Prevent submission if invalid
        if (!valid) {
            event.preventDefault();
        }
    });
});
