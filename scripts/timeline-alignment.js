// Timeline Dynamic Alignment Script
// Aligns company and position points with their respective content centers
// and adjusts the timeline line to span from first to last point

// Flag to track if this is the initial load
let isInitialLoad = true;

function alignTimelinePoints(isResize = false) {
    // Allow execution on resize, but only once per initial page load for non-resize calls
    if (!isResize && !isInitialLoad) return;
    
    if (!isResize) {
        isInitialLoad = false;
    }
    
    // Add a small delay to ensure all elements are properly rendered
    requestAnimationFrame(() => {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        // First, align all points
        const companyHeaders = document.querySelectorAll('.company-header');
        companyHeaders.forEach(header => {
            const companyPoint = header.querySelector('.company-point');
            const companyTitle = header.querySelector('.company-title');
            
            if (companyPoint && companyTitle) {
                // Get the center of the company title
                const titleRect = companyTitle.getBoundingClientRect();
                const headerRect = header.getBoundingClientRect();
                
                // Calculate the center position relative to the header
                const titleCenter = titleRect.top + (titleRect.height / 2) - headerRect.top;
                
                // Set the point position to align with title center
                companyPoint.style.top = `${titleCenter}px`;
            }
        });
        
        // Align position points
        const positions = document.querySelectorAll('.position');
        positions.forEach(position => {
            const positionHeader = position.querySelector('.position-header');
            const positionPoint = position.querySelector('.position-point');
            const positionTitle = position.querySelector('.position-title');
            
            if (positionPoint && positionTitle && positionHeader) {
                // Get the center of the position title specifically
                const titleRect = positionTitle.getBoundingClientRect();
                const headerRect = positionHeader.getBoundingClientRect();
                
                // Calculate the center position relative to the position header
                const titleCenter = titleRect.top + (titleRect.height / 2) - headerRect.top;
                
                // Set the point position to align with title center
                positionPoint.style.top = `${titleCenter}px`;
            }
        });
        
        // Third requestAnimationFrame to ensure all positioning is complete
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                let firstPointPosition = null;
                let lastPointPosition = null;
                const timelineRect = timeline.getBoundingClientRect();
                
                // Calculate positions based on the actual top value set by JavaScript
                // Since points are positioned relative to their parent containers
                companyHeaders.forEach(header => {
                    const companyPoint = header.querySelector('.company-point');
                    if (companyPoint) {
                        // Get the computed top value we set
                        const topValue = parseFloat(companyPoint.style.top) || 0;
                        
                        // Get header position relative to timeline
                        const headerRect = header.getBoundingClientRect();
                        const headerRelativeToTimeline = headerRect.top - timelineRect.top;
                        
                        // Calculate the point's center position relative to timeline
                        const pointCenterRelativeToTimeline = headerRelativeToTimeline + topValue;
                        
                        if (firstPointPosition === null || pointCenterRelativeToTimeline < firstPointPosition) {
                            firstPointPosition = pointCenterRelativeToTimeline;
                        }
                    }
                });
                
                positions.forEach(position => {
                    const positionHeader = position.querySelector('.position-header');
                    const positionPoint = position.querySelector('.position-point');
                    if (positionPoint && positionHeader) {
                        // Get the computed top value we set
                        const topValue = parseFloat(positionPoint.style.top) || 0;
                        
                        // Get header position relative to timeline
                        const headerRect = positionHeader.getBoundingClientRect();
                        const headerRelativeToTimeline = headerRect.top - timelineRect.top;
                        
                        // Calculate the point's center position relative to timeline
                        const pointCenterRelativeToTimeline = headerRelativeToTimeline + topValue;
                        
                        if (lastPointPosition === null || pointCenterRelativeToTimeline > lastPointPosition) {
                            lastPointPosition = pointCenterRelativeToTimeline;
                        }
                    }
                });
                
                // Adjust timeline line to span from first to last point
                if (firstPointPosition !== null && lastPointPosition !== null) {
                    // Set custom CSS properties to control the timeline line
                    timeline.style.setProperty('--timeline-top', `${firstPointPosition}px`);
                    timeline.style.setProperty('--timeline-height', `${lastPointPosition - firstPointPosition}px`);
                    
                    // Apply the styles via CSS custom properties
                    let style = document.getElementById('timeline-dynamic-style');
                    if (!style) {
                        style = document.createElement('style');
                        style.id = 'timeline-dynamic-style';
                        document.head.appendChild(style);
                    }
                    
                    style.textContent = `
                        .timeline::before {
                            top: var(--timeline-top, 0) !important;
                            height: var(--timeline-height, 100%) !important;
                        }
                    `;
                }
            });
        });
    });
}

// Run alignment immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Run after a short delay to ensure CSS is applied
    setTimeout(() => alignTimelinePoints(false), 50);
});

// Run alignment on window resize to handle responsive changes
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => alignTimelinePoints(true), 150);
});

// Reset flag if page is navigated to (for single-page applications)
window.addEventListener('beforeunload', () => {
    isInitialLoad = true;
});

// Export function for manual triggering
window.alignTimelinePoints = alignTimelinePoints;
