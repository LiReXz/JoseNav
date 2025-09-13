// Language Toggle Script
// Handles switching between English and Spanish versions of the site

document.addEventListener('DOMContentLoaded', function() {
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Get current page info
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop(); // Get filename (e.g., 'index.html')
    const currentLang = currentPath.includes('/es/') ? 'es' : 'en';
    
    // Set active state based on current language
    languageOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Add click event listeners
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetLang = this.getAttribute('data-lang');
            
            // Don't do anything if clicking on the current language
            if (targetLang === currentLang) {
                return;
            }
            
            // Build the new URL
            let newPath;
            if (targetLang === 'es') {
                // Switch to Spanish
                if (currentLang === 'en') {
                    newPath = currentPath.replace('/en/', '/es/');
                } else {
                    newPath = '/es/' + currentPage;
                }
            } else {
                // Switch to English
                if (currentLang === 'es') {
                    newPath = currentPath.replace('/es/', '/en/');
                } else {
                    newPath = '/en/' + currentPage;
                }
            }
            
            // Navigate to the new page
            window.location.href = newPath;
        });
        
        // Add hover effect
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.cursor = 'pointer';
            }
        });
    });
});
