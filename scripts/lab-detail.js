// Lab Detail Page JavaScript

// Tab functionality for deployment options
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure first tab is active by default
    const firstTab = document.querySelector('.tab-content');
    const firstButton = document.querySelector('.tab-button');
    
    if (firstTab && firstButton) {
        firstTab.classList.add('active');
        firstButton.classList.add('active');
    }
    
    // Add click event listeners to tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const tabId = index === 0 ? 'docker-tab' : 'kubernetes-tab';
            showTab(tabId);
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
