// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const targetLang = this.getAttribute('data-lang');
            const currentPath = window.location.pathname;
            
            // Remove active class from all options
            languageOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Determine the target URL based on current location and desired language
            let targetURL = '';
            
            if (targetLang === 'es') {
                // Going to Spanish
                if (currentPath.includes('/en/')) {
                    targetURL = currentPath.replace('/en/', '/es/');
                } else {
                    // If we're not in a language folder, assume we're going to Spanish
                    targetURL = '/es/index.html';
                }
            } else {
                // Going to English
                if (currentPath.includes('/es/')) {
                    targetURL = currentPath.replace('/es/', '/en/');
                } else {
                    // If we're not in a language folder, assume we're going to English
                    targetURL = '/en/index.html';
                }
            }
            
            // Navigate to the target URL
            window.location.href = targetURL;
        });
    });
    
    // Set the correct active state based on current path
    const currentPath = window.location.pathname;
    if (currentPath.includes('/es/')) {
        // We're in Spanish version
        languageOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === 'es') {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    } else if (currentPath.includes('/en/')) {
        // We're in English version
        languageOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === 'en') {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }
});
