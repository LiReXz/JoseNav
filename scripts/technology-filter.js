// Technology Filter Functionality for Labs and Collaborations with FLIP animation
document.addEventListener('DOMContentLoaded', function() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const labsGrid = document.querySelector('.labs-grid');
    const collaborationsGrid = document.querySelector('.collaborations-grid');
    
    if (filterTags.length === 0 || (!labsGrid && !collaborationsGrid)) return;
    
    const activeGrid = labsGrid || collaborationsGrid;
    const items = Array.from(activeGrid.children);
    let activeFilters = new Set(['all']); // Start with 'all' active
    
    // Function to get element position
    function getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
    
    // Function to animate element position change
    function animateToPosition(element, fromPos, toPos) {
        const deltaX = fromPos.left - toPos.left;
        const deltaY = fromPos.top - toPos.top;
        
        // Only animate if there's actual movement
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            element.style.transition = 'none';
            
            // Force reflow
            element.offsetHeight;
            
            // Animate to final position and keep it there
            element.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.0, 0.2, 1)';
            element.style.transform = 'translate(0, 0)';
        }
    }
    
    // Function to update filter UI
    function updateFilterUI() {
        filterTags.forEach(tag => {
            const tech = tag.getAttribute('data-tech');
            if (activeFilters.has(tech)) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    }
    
    // Function to determine if item should be visible
    function shouldShowItem(item) {
        if (activeFilters.has('all')) return true;
        
        const itemTechs = item.getAttribute('data-tech');
        if (!itemTechs) return false;
        
        // Check if item has ALL of the active filters (AND logic)
        return Array.from(activeFilters).every(filter => 
            itemTechs.includes(filter)
        );
    }
    
    // Function to apply filters with animation
    function applyFilter() {
        // Store initial positions of all currently visible items
        const currentlyVisible = items.filter(item => !item.classList.contains('hidden'));
        const initialPositions = new Map();
        
        currentlyVisible.forEach(item => {
            initialPositions.set(item, getElementPosition(item));
        });
        
        // Determine which items should be shown/hidden
        const itemsToShow = [];
        const itemsToHide = [];
        
        items.forEach(item => {
            if (shouldShowItem(item)) {
                itemsToShow.push(item);
            } else {
                itemsToHide.push(item);
            }
        });
        
        // Apply visibility changes immediately (display: none will remove from layout)
        itemsToHide.forEach(item => {
            item.classList.add('hidden');
        });
        
        itemsToShow.forEach(item => {
            item.classList.remove('hidden');
        });
        
        // Wait for layout to settle, then animate
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Animate previously visible items that are still visible to their new positions
                currentlyVisible.forEach(item => {
                    if (itemsToShow.includes(item) && initialPositions.has(item)) {
                        const initialPos = initialPositions.get(item);
                        const finalPos = getElementPosition(item);
                        
                        // Animate from initial to final position
                        animateToPosition(item, initialPos, finalPos);
                    }
                });
            });
        });
    }
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const clickedTech = this.getAttribute('data-tech');
            
            if (clickedTech === 'all') {
                // If 'all' is clicked, clear all other filters and activate 'all'
                activeFilters.clear();
                activeFilters.add('all');
            } else {
                // If a specific tech is clicked
                if (activeFilters.has(clickedTech)) {
                    // If already active, toggle it off
                    activeFilters.delete(clickedTech);
                    // If no filters remain active, activate 'all'
                    if (activeFilters.size === 0) {
                        activeFilters.add('all');
                    }
                } else {
                    // If not active, add it and remove 'all' if present
                    activeFilters.delete('all');
                    activeFilters.add(clickedTech);
                }
            }
            
            // Update UI and apply filters
            updateFilterUI();
            applyFilter();
        });
    });
    
    // Set default "all" filter as active on load
    updateFilterUI();
});
