// Timeline Dynamic Alignment Script
// Aligns company and position points with their respective content centers

function alignTimelinePoints() {
    // Add a small delay to ensure all elements are properly rendered
    requestAnimationFrame(() => {
        // Align company points
        const companyHeaders = document.querySelectorAll('.company-header');
        companyHeaders.forEach(header => {
            const companyPoint = header.querySelector('.company-point');
            const companyTitle = header.querySelector('.company-title');
            
            if (companyPoint && companyTitle) {
                // Get the center of the company title
                const titleRect = companyTitle.getBoundingClientRect();
                const headerRect = header.getBoundingClientRect();
                
                // Calculate the center position relative to the header
                // Since transform: translate(-50%, -50%) centers the point, we need the center of the title
                const titleCenter = titleRect.top + (titleRect.height / 2) - headerRect.top;
                
                // Set the point position to align with title center
                companyPoint.style.top = `${titleCenter}px`;
            }
        });
        
        // Align position points with position titles specifically
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
                // Since transform: translate(-50%, -50%) centers the point, we need the center of the title
                const titleCenter = titleRect.top + (titleRect.height / 2) - headerRect.top;
                
                // Set the point position to align with title center
                positionPoint.style.top = `${titleCenter}px`;
            }
        });

        // Calculate timeline line height from first company point to last position point
        // This needs to happen AFTER the points have been repositioned
        setTimeout(() => {
            const timeline = document.querySelector('.timeline');
            const firstCompanyPoint = document.querySelector('.company-point');
            const allPositionPoints = document.querySelectorAll('.position-point');
            const lastPositionPoint = allPositionPoints[allPositionPoints.length - 1];
            
            if (timeline && firstCompanyPoint && lastPositionPoint) {
                // Get the actual computed positions of the points after they've been moved by the script
                const firstPointTop = parseFloat(firstCompanyPoint.style.top) || 0;
                const lastPointTop = parseFloat(lastPositionPoint.style.top) || 0;
                
                // Find the parent elements to calculate the relative positions correctly
                const firstCompanyHeader = firstCompanyPoint.closest('.company-header');
                const lastPositionHeader = lastPositionPoint.closest('.position-header');
                
                if (firstCompanyHeader && lastPositionHeader) {
                    const timelineRect = timeline.getBoundingClientRect();
                    const firstHeaderRect = firstCompanyHeader.getBoundingClientRect();
                    const lastHeaderRect = lastPositionHeader.getBoundingClientRect();
                    
                    // Calculate the absolute positions of the point centers
                    const startY = (firstHeaderRect.top - timelineRect.top) + firstPointTop;
                    const endY = (lastHeaderRect.top - timelineRect.top) + lastPointTop;
                    const lineHeight = endY - startY;
                    
                    console.log('Timeline calculation:', {
                        startY,
                        endY,
                        lineHeight,
                        firstPointTop,
                        lastPointTop
                    });
                    
                    // Set CSS variables for the timeline line
                    timeline.style.setProperty('--timeline-start', `${startY}px`);
                    timeline.style.setProperty('--timeline-height', `${lineHeight}px`);
                }
            }
        }, 10); // Small delay to ensure points are positioned first
    });
}

// Run alignment immediately when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Run after a short delay to ensure CSS is applied
    setTimeout(alignTimelinePoints, 50);
});

// Run alignment on window resize to handle responsive changes
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(alignTimelinePoints, 150);
});

// Export function for manual triggering if needed
window.alignTimelinePoints = alignTimelinePoints;
