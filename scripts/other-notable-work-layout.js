// Other Notable Work Dynamic Layout Script
// Automatically adjusts spacing and ensures consistent container sizes
// with fully responsive design for all devices

let isLayoutInitialized = false;

function adjustOtherNotableWorkLayout(isResize = false) {
    // Allow execution on resize, but only once per initial page load for non-resize calls
    if (!isResize && !isLayoutInitialized) {
        isLayoutInitialized = true;
    } else if (!isResize && isLayoutInitialized) {
        return;
    }
    
    // Add delay to ensure all elements are properly rendered
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const containers = [
                    {
                        container: document.querySelector('.other-notable-work-labs-container'),
                        textElement: document.querySelector('.other-notable-work-labs-text'),
                        footerElement: document.querySelector('.other-notable-work-labs-container footer'),
                        imageElement: document.querySelector('.other-notable-work-labs-container img')
                    },
                    {
                        container: document.querySelector('.other-notable-work-collaborations-container'),
                        textElement: document.querySelector('.other-notable-work-collaborations-text'),
                        footerElement: document.querySelector('.other-notable-work-collaborations-container footer'),
                        imageElement: document.querySelector('.other-notable-work-collaborations-container img')
                    }
                ];
                
                // First pass: calculate the maximum required height to ensure consistency
                let maxRequiredHeight = 0;
                const containerData = [];
                
                containers.forEach(({ container, textElement, footerElement, imageElement }) => {
                    if (!container || !textElement || !footerElement) return;
                    
                    // Get container dimensions and padding
                    const containerRect = container.getBoundingClientRect();
                    const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop);
                    
                    // Calculate responsive margins based on viewport size
                    const viewportWidth = window.innerWidth;
                    const baseMargin = viewportWidth > 1200 ? 24 : viewportWidth > 768 ? 18 : 12;
                    
                    // Get image top margin as reference
                    let topMarginReference = containerPaddingTop;
                    if (imageElement) {
                        const imageRect = imageElement.getBoundingClientRect();
                        topMarginReference = imageRect.top - containerRect.top;
                    }
                    
                    // Get actual content dimensions
                    const textRect = textElement.getBoundingClientRect();
                    const footerRect = footerElement.getBoundingClientRect();
                    
                    // Calculate positions relative to container
                    const textBottom = textRect.bottom - containerRect.top;
                    const footerHeight = footerRect.height;
                    
                    // Calculate responsive spacing
                    const textToFooterGap = baseMargin;
                    const footerToBottomMargin = Math.max(topMarginReference, baseMargin);
                    
                    // Calculate required height for this container
                    const requiredHeight = containerPaddingTop + (textBottom - containerPaddingTop) + textToFooterGap + footerHeight + footerToBottomMargin;
                    
                    maxRequiredHeight = Math.max(maxRequiredHeight, requiredHeight);
                    
                    containerData.push({
                        container,
                        footerElement,
                        textToFooterGap,
                        footerToBottomMargin
                    });
                });
                
                // Second pass: apply consistent height and margins to all containers
                containerData.forEach(({ container, footerElement, textToFooterGap, footerToBottomMargin }) => {
                    // Set consistent height for all containers
                    container.style.height = `${maxRequiredHeight}px`;
                    
                    // Apply calculated margins with !important to override CSS
                    footerElement.style.setProperty('margin-top', `${textToFooterGap}px`, 'important');
                    footerElement.style.setProperty('margin-bottom', `${footerToBottomMargin}px`, 'important');
                });
            });
        });
    });
}

// Run layout adjustment when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Run after a delay to ensure CSS is applied and fonts are loaded
    setTimeout(() => adjustOtherNotableWorkLayout(false), 100);
});

// Run layout adjustment on window resize
let layoutResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(layoutResizeTimeout);
    layoutResizeTimeout = setTimeout(() => adjustOtherNotableWorkLayout(true), 200);
});

// Run after font loading to recalculate if text dimensions change
document.fonts.ready.then(() => {
    setTimeout(() => adjustOtherNotableWorkLayout(true), 50);
});

// Reset flag for single-page applications
window.addEventListener('beforeunload', () => {
    isLayoutInitialized = false;
});

// Export function for manual triggering
window.adjustOtherNotableWorkLayout = adjustOtherNotableWorkLayout;
