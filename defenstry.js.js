document.addEventListener('DOMContentLoaded', function() {
    // Get references to all relevant DOM elements
    const pages = document.querySelectorAll('.page-section'); // All content sections
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .service-dropdown-link, .service-card, .btn'); // All clickable elements that navigate
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // Hamburger icon button
    const mobileMenu = document.getElementById('mobile-menu'); // The sliding mobile menu itself
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay'); // Dark overlay behind mobile menu
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close'); // Close button inside mobile menu
    const menuIcon = document.getElementById('menu-icon'); // The hamburger SVG icon
    const closeIcon = document.getElementById('close-icon'); // The 'X' SVG icon
    // Set the current year dynamically in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    /**
     * Shows a specific page section and updates the active navigation link.
     * @param {string} pageId - The ID of the page section to show (e.g., 'home', 'about').
     */
    function showPage(pageId) {
        // Hide all page sections first
        pages.forEach(page => {
            page.classList.remove('active');
        });
        // Show the requested page section
        document.getElementById(pageId + '-page').classList.add('active');

        // Update the 'active' class for desktop and dropdown navigation links
        document.querySelectorAll('.nav-link, .service-dropdown-link').forEach(link => {
            link.classList.remove('active'); // Remove active from all
            if (link.dataset.page === pageId) {
                link.classList.add('active'); // Add active to the current page's link
            }
        });

        // If the mobile menu is open, close it after navigation
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }

    // Add click event listeners to all navigation and action buttons
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const page = this.dataset.page; // Get the target page from the 'data-page' attribute
            if (page) { // Ensure the attribute exists
                showPage(page); // Navigate to the specified page
            }
        });
    });

    /**
     * Toggles the visibility of the mobile menu and its overlay.
     * Also switches between the hamburger and close icons.
     */
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active'); // Toggle 'active' class for sliding effect
        mobileMenuOverlay.classList.toggle('active'); // Toggle 'active' class for overlay visibility

        // Switch icon visibility based on menu state
        menuIcon.style.display = mobileMenu.classList.contains('active') ? 'none' : 'block';
        closeIcon.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
    }

    // Event listeners for opening and closing the mobile menu
    mobileMenuButton.addEventListener('click', toggleMobileMenu); // Click hamburger to open/close
    mobileMenuCloseButton.addEventListener('click', toggleMobileMenu); // Click 'X' inside menu to close
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Click outside menu (on overlay) to close

    // --- Login / Sign-Up Form Logic ---
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authEmailInput = document.getElementById('auth-email');
    const authPasswordInput = document.getElementById('auth-password');
    const authConfirmPasswordGroup = document.getElementById('confirm-password-group'); // Container for confirm password field
    const authConfirmPasswordInput = document.getElementById('auth-confirm-password');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const toggleAuthModeBtn = document.getElementById('toggle-auth-mode'); // Button to switch between login/signup
    const authMessageBox = document.getElementById('auth-message-box'); // Message display area

    let isLoginMode = true; // Tracks the current mode: true for Login, false for Sign Up

    /**
     * Displays a message in the authentication form's message box.
     * @param {string} message - The text message to display.
     * @param {'success'|'error'} type - The type of message ('success' or 'error') for styling.
     */
    function showAuthMessage(message, type) {
        authMessageBox.textContent = message;
        authMessageBox.className = 'message-box ' + type; // Apply styling class
        authMessageBox.style.display = 'block'; // Make message box visible
    }

    /** Hides the authentication form's message box. */
    function hideAuthMessage() {
        authMessageBox.style.display = 'none';
    }

    /**
     * Validates an email address format using a regular expression.
     * @param {string} email - The email string to validate.
     * @returns {boolean} True if the email is valid, false otherwise.
     */
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Validates password strength based on specific criteria.
     * @param {string} password - The password string to validate.
     * @returns {boolean} True if the password meets criteria, false otherwise.
     */
    function validatePassword(password) {
        // Password must be at least 8 characters long, contain at least one uppercase, one lowercase, one number, and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    // Event listener for toggling between Login and Sign Up modes
    toggleAuthModeBtn.addEventListener('click', function() {
        isLoginMode = !isLoginMode; // Flip the mode
        authTitle.textContent = isLoginMode ? 'Login' : 'Sign Up'; // Update title
        authSubmitBtn.textContent = isLoginMode ? 'Login' : 'Sign Up'; // Update button text
        toggleAuthModeBtn.textContent = isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'; // Update toggle button text
        authConfirmPasswordGroup.style.display = isLoginMode ? 'none' : 'block'; // Show/hide confirm password field
        hideAuthMessage(); // Clear any previous messages
        // Clear input fields
        authEmailInput.value = '';
        authPasswordInput.value = '';
        authConfirmPasswordInput.value = '';
    });

    // Event listener for authentication form submission
    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        hideAuthMessage(); // Clear previous messages

        const email = authEmailInput.value;
        const password = authPasswordInput.value;
        const confirmPassword = authConfirmPasswordInput.value;

        // Perform client-side validation
        if (!validateEmail(email)) {
            showAuthMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showAuthMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 'error');
            return;
        }

        if (!isLoginMode && password !== confirmPassword) {
            showAuthMessage('Passwords do not match.', 'error');
            return;
        }

        // Simulate API call with a delay for user feedback
        authSubmitBtn.disabled = true; // Disable button to prevent multiple submissions
        authSubmitBtn.textContent = isLoginMode ? 'Logging in...' : 'Signing up...'; // Change button text to indicate loading

        setTimeout(() => {
            if (isLoginMode) {
                // Dummy login logic (replace with actual backend call)
                if (email === 'user@example.com' && password === '') {
                    showAuthMessage('Login successful! Welcome back.', 'success');
                    // In a real application, you would handle authentication tokens/session here
                } else {
                    showAuthMessage('Invalid email or password.', 'error');
                }
            } else {
                // Dummy sign-up logic (replace with actual backend call)
                showAuthMessage('Sign-up successful! Please login.', 'success');
                isLoginMode = true; // Switch to login mode after successful sign-up
                authTitle.textContent = 'Login';
                authSubmitBtn.textContent = 'Login';
                toggleAuthModeBtn.textContent = 'Don\'t have an account? Sign Up';
                authConfirmPasswordGroup.style.display = 'none';
            }
            // Clear input fields after submission attempt
            authEmailInput.value = '';
            authPasswordInput.value = '';
            authConfirmPasswordInput.value = '';
            authSubmitBtn.disabled = false; // Re-enable button
        }, 1500); // Simulate network delay
    });

    // --- Contact Us Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactEmailInput = document.getElementById('contact-email');
    const contactSubjectInput = document.getElementById('contact-subject');
    const contactMessageInput = document.getElementById('contact-message');
    const contactStatusMessage = document.getElementById('contact-status-message'); // Message display area for contact form

    /**
     * Displays a message in the contact form's status box.
     * @param {string} message - The text message to display.
     * @param {'success'|'error'} type - The type of message ('success' or 'error') for styling.
     */
    function showContactMessage(message, type) {
        contactStatusMessage.textContent = message;
        contactStatusMessage.className = 'message-box ' + type;
        contactStatusMessage.style.display = 'block';
    }

    /** Hides the contact form's status message box. */
    function hideContactMessage() {
        contactStatusMessage.style.display = 'none';
    }

    // Event listener for contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        hideContactMessage(); // Clear previous messages

        const name = contactNameInput.value;
        const email = contactEmailInput.value;
        const subject = contactSubjectInput.value;
        const message = contactMessageInput.value;

        // Basic client-side validation for all fields
        if (!name || !email || !subject || !message) {
            showContactMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showContactMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission with a delay
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Disable button
        submitButton.textContent = 'Sending...'; // Change button text

        setTimeout(() => {
            showContactMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
            contactForm.reset(); // Clear all form fields
            submitButton.disabled = false; // Re-enable button
            // Restore original button content (SVG icon + text)
            submitButton.innerHTML = `<!-- Mail Icon SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Send Message`;
        }, 1500); // Simulate network delay
    });
});
