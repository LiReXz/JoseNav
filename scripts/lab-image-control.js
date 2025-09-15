// Laboratory Image Control - PNG by default, GIF on hover
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lab Image Control: Loading...');
    
    setTimeout(() => {
        const labItems = document.querySelectorAll('.lab-item');
        console.log(`Found ${labItems.length} lab items`);
        
        labItems.forEach((item, index) => {
            const staticImage = item.querySelector('.lab-static-image');
            const gifImage = item.querySelector('.lab-gif-image');
            
            if (staticImage && gifImage) {
                console.log(`Lab ${index + 1}: Setting up images`);
                
                const originalGifSrc = gifImage.src;
                
                // Function to show PNG (static image)
                function showPNG() {
                    console.log(`Lab ${index + 1}: Showing PNG`);
                    staticImage.style.cssText = `
                        display: block !important;
                        opacity: 1 !important;
                        z-index: 10 !important;
                        filter: grayscale(100%) !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    `;
                    
                    gifImage.style.cssText = `
                        display: none !important;
                        opacity: 0 !important;
                        z-index: 1 !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    `;
                }
                
                // Function to show GIF (animated image)
                function showGIF() {
                    console.log(`Lab ${index + 1}: Showing GIF`);
                    staticImage.style.cssText = `
                        display: none !important;
                        opacity: 0 !important;
                        z-index: 1 !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    `;
                    
                    // Reset GIF to restart animation
                    gifImage.src = '';
                    setTimeout(() => {
                        gifImage.src = originalGifSrc;
                        gifImage.style.cssText = `
                            display: block !important;
                            opacity: 1 !important;
                            z-index: 10 !important;
                            filter: grayscale(0%) !important;
                            position: absolute !important;
                            top: 0 !important;
                            left: 0 !important;
                            width: 100% !important;
                            height: 100% !important;
                            object-fit: cover !important;
                        `;
                    }, 50);
                }
                
                // Set initial state - PNG visible
                showPNG();
                
                // Add hover events
                item.addEventListener('mouseenter', showGIF);
                item.addEventListener('mouseleave', showPNG);
                
                console.log(`Lab ${index + 1}: Hover events configured`);
                
            } else {
                console.log(`Lab ${index + 1}: Missing images - PNG:${!!staticImage} GIF:${!!gifImage}`);
            }
        });
        
        console.log('Lab Image Control: Setup complete!');
    }, 500);
});
