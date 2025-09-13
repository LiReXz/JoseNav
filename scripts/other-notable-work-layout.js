// Other Notable Work Layout Script
// Dynamically adjusts heights and footer positions for labs and collaborations containers

function adjustNotableWorkLayout() {
    const labsContainer = document.querySelector('.other-notable-work-labs-container');
    const collaborationsContainer = document.querySelector('.other-notable-work-collaborations-container');
    
    if (!labsContainer || !collaborationsContainer) {
        return;
    }
    
    // Get text elements and footers
    const labsText = labsContainer.querySelector('.other-notable-work-labs-text');
    const collaborationsText = collaborationsContainer.querySelector('.other-notable-work-collaborations-text');
    const labsFooter = labsContainer.querySelector('footer');
    const collaborationsFooter = collaborationsContainer.querySelector('footer');
    
    if (!labsText || !collaborationsText || !labsFooter || !collaborationsFooter) {
        return;
    }
    
    // Reset any previous dynamic styles to get natural measurements
    labsContainer.style.height = '';
    collaborationsContainer.style.height = '';
    labsFooter.style.removeProperty('margin-top');
    collaborationsFooter.style.removeProperty('margin-top');
    labsFooter.style.removeProperty('margin-bottom');
    collaborationsFooter.style.removeProperty('margin-bottom');
    
    // Force reflow and get natural heights
    requestAnimationFrame(() => {
        const labsNaturalHeight = labsContainer.offsetHeight;
        const collaborationsNaturalHeight = collaborationsContainer.offsetHeight;
        
        // Find the maximum height needed
        const maxHeight = Math.max(labsNaturalHeight, collaborationsNaturalHeight);
        
        // Set both containers to the same height
        labsContainer.style.height = `${maxHeight}px`;
        collaborationsContainer.style.height = `${maxHeight}px`;
        
        // Calculate footer positioning after containers are resized
        requestAnimationFrame(() => {
            // Get current positions of text elements within their containers
            const labsTextHeight = labsText.offsetHeight;
            const collaborationsTextHeight = collaborationsText.offsetHeight;
            const labsFooterHeight = labsFooter.offsetHeight;
            const collaborationsFooterHeight = collaborationsFooter.offsetHeight;
            
            // Get the image elements to calculate the top distance
            const labsImage = labsContainer.querySelector('.other-notable-work-labs-image');
            const collaborationsImage = collaborationsContainer.querySelector('.other-notable-work-collaborations-image');
            
            if (!labsImage || !collaborationsImage) return;
            
            // Calculate the distance from container top to image top (this will be our symmetrical margin)
            const labsImageRect = labsImage.getBoundingClientRect();
            const collaborationsImageRect = collaborationsImage.getBoundingClientRect();
            const labsContainerRect = labsContainer.getBoundingClientRect();
            const collaborationsContainerRect = collaborationsContainer.getBoundingClientRect();
            
            const topMargin = labsImageRect.top - labsContainerRect.top; // Should be same for both (1.5rem padding)
            
            // Calculate required space for content
            const imageHeight = labsImage.offsetHeight; // Actual image height
            const textToFooterMargin = 24; // 1.5rem margin between text and footer
            
            const labsContentHeight = imageHeight + labsTextHeight + textToFooterMargin + labsFooterHeight;
            const collaborationsContentHeight = imageHeight + collaborationsTextHeight + textToFooterMargin + collaborationsFooterHeight;
            
            // Calculate required container height: topMargin + content + bottomMargin (same as topMargin)
            const labsRequiredHeight = topMargin + labsContentHeight + topMargin;
            const collaborationsRequiredHeight = topMargin + collaborationsContentHeight + topMargin;
            
            // Use the maximum required height for both containers
            const finalHeight = Math.max(labsRequiredHeight, collaborationsRequiredHeight);
            
            // Set both containers to the calculated height
            labsContainer.style.height = `${finalHeight}px`;
            collaborationsContainer.style.height = `${finalHeight}px`;
            
            // Calculate available space for margin-top of footer
            const labsAvailableSpace = finalHeight - topMargin - imageHeight - labsTextHeight - labsFooterHeight - topMargin;
            const collaborationsAvailableSpace = finalHeight - topMargin - imageHeight - collaborationsTextHeight - collaborationsFooterHeight - topMargin;
            
            // Apply margin to position footers with proper spacing
            labsFooter.style.setProperty('margin-top', `${Math.max(textToFooterMargin, labsAvailableSpace)}px`, 'important');
            collaborationsFooter.style.setProperty('margin-top', `${Math.max(textToFooterMargin, collaborationsAvailableSpace)}px`, 'important');
            
            // Set bottom margin to maintain symmetry
            labsFooter.style.setProperty('margin-bottom', `${topMargin}px`, 'important');
            collaborationsFooter.style.setProperty('margin-bottom', `${topMargin}px`, 'important');
            
            console.log('Notable work layout adjusted with symmetrical margins:', {
                finalHeight,
                topMargin,
                labsContentHeight,
                collaborationsContentHeight,
                labsAvailableSpace,
                collaborationsAvailableSpace
            });
        });
    });
}

// Run layout adjustment when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(adjustNotableWorkLayout, 100);
});

// Run on window resize
let layoutResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(layoutResizeTimeout);
    layoutResizeTimeout = setTimeout(adjustNotableWorkLayout, 200);
});

// Export function for manual triggering
window.adjustNotableWorkLayout = adjustNotableWorkLayout;
