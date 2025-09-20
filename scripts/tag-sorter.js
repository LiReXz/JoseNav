/**
 * Auto-sort Technology Tags
 * This script automatically sorts technology tags alphabetically in various contexts
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to sort technology filter tags
    function sortFilterTags() {
        const filterContainer = document.querySelector('.filter-tags');
        if (!filterContainer) return;
        
        const allTag = filterContainer.querySelector('[data-tech="all"]');
        const otherTags = Array.from(filterContainer.children).filter(child => 
            child.getAttribute('data-tech') !== 'all'
        );
        
        // Sort other tags alphabetically by their text content
        otherTags.sort((a, b) => {
            const textA = a.textContent.trim().toLowerCase();
            const textB = b.textContent.trim().toLowerCase();
            return textA.localeCompare(textB);
        });
        
        // Clear container and re-add tags in order
        filterContainer.innerHTML = '';
        filterContainer.appendChild(allTag); // "All" always first
        otherTags.forEach(tag => filterContainer.appendChild(tag));
    }
    
    // Function to sort lab tech tags
    function sortLabTechTags() {
        const labTechContainers = document.querySelectorAll('.lab-tech-tags');
        
        labTechContainers.forEach(container => {
            const tags = Array.from(container.children);
            
            // Sort tags alphabetically by their text content
            tags.sort((a, b) => {
                const textA = a.textContent.trim().toLowerCase();
                const textB = b.textContent.trim().toLowerCase();
                return textA.localeCompare(textB);
            });
            
            // Clear container and re-add tags in order
            container.innerHTML = '';
            tags.forEach(tag => container.appendChild(tag));
        });
    }
    
    // Function to sort main lab tech tags (in lab detail pages)
    function sortMainLabTechTags() {
        const mainLabTechContainer = document.querySelector('.lab-main-tech-tags');
        if (!mainLabTechContainer) return;
        
        const tags = Array.from(mainLabTechContainer.children);
        
        // Sort tags alphabetically by their text content
        tags.sort((a, b) => {
            const textA = a.textContent.trim().toLowerCase();
            const textB = b.textContent.trim().toLowerCase();
            return textA.localeCompare(textB);
        });
        
        // Clear container and re-add tags in order
        mainLabTechContainer.innerHTML = '';
        tags.forEach(tag => mainLabTechContainer.appendChild(tag));
    }
    
    // Function to sort data-tech attributes in lab items
    function sortDataTechAttributes() {
        const labItems = document.querySelectorAll('.lab-item[data-tech]');
        
        labItems.forEach(item => {
            const dataTech = item.getAttribute('data-tech');
            if (!dataTech) return;
            
            // Split technologies, sort alphabetically, and rejoin
            const technologies = dataTech.split(' ').filter(tech => tech.trim() !== '');
            technologies.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            
            // Update the data-tech attribute
            item.setAttribute('data-tech', technologies.join(' '));
        });
    }
    
    // Execute all sorting functions
    sortFilterTags();
    sortLabTechTags();
    sortMainLabTechTags();
    sortDataTechAttributes();
    
    // Console log for debugging
    console.log('Technology tags sorted alphabetically');
});
