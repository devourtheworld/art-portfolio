document.addEventListener('DOMContentLoaded', function() {
    // Reference to the gallery container
    const galleryContainer = document.getElementById('gallery');

    // Function to fetch and process the image links from the text file
    function loadImagesFromTextFile() {
        fetch('links.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load the image links file');
                }
                return response.text();
            })
            .then(text => {
                // Split the text file by lines and process each line as an image URL
                const imageUrls = text.split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0); // Remove empty lines
                
                // Create gallery items for each image URL
                createGalleryItems(imageUrls);
            })
            .catch(error => {
                console.error('Error loading images:', error);
                galleryContainer.innerHTML = `<p class="error-message">Error loading images: ${error.message}</p>`;
            });
    }

    // Function to create gallery items from an array of image URLs
    function createGalleryItems(imageUrls) {
        // Clear any existing content
        galleryContainer.innerHTML = '';
        
        // Create a gallery item for each image URL
        imageUrls.forEach((url, index) => {
            // Create elements
            const linkElement = document.createElement('a');
            const imgElement = document.createElement('img');
            
            // Set attributes
            linkElement.href = url;
            linkElement.className = 'gallery-item';
            
            imgElement.src = url;
            imgElement.alt = `Image ${index + 1}`;
            
            // Append elements
            linkElement.appendChild(imgElement);
            galleryContainer.appendChild(linkElement);
            
            // Optional: Add click event if you want to implement a lightbox
            linkElement.addEventListener('click', function(e) {
                // Uncomment this line if you want to prevent default link behavior
                // e.preventDefault();
                console.log('Image clicked:', url);
            });
        });
    }

    // Call the function to load images when the page loads
    loadImagesFromTextFile();
});