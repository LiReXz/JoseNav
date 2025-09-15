// GIF Animation Control - Show static preview until hover
document.addEventListener('DOMContentLoaded', function() {
    const labItems = document.querySelectorAll('.lab-item');
    
    labItems.forEach(item => {
        const staticImage = item.querySelector('.lab-static-image');
        const gifImage = item.querySelector('.lab-gif-image');
        
        if (staticImage && gifImage) {
            // On mouse enter - show animated GIF
            item.addEventListener('mouseenter', function() {
                staticImage.style.opacity = '0';
                gifImage.style.display = 'block';
                gifImage.style.opacity = '1';
            });
            
            // On mouse leave - show static image
            item.addEventListener('mouseleave', function() {
                staticImage.style.opacity = '1';
                gifImage.style.opacity = '0';
                // Hide GIF after transition to save resources
                setTimeout(() => {
                    if (gifImage.style.opacity === '0') {
                        gifImage.style.display = 'none';
                    }
                }, 300);
            });
        }
    });
});
