const AccessKey = "SmHVyEiG8LiGyOQaGOBPz8mi-Axcqnw9B_3WrYpWjrg"; // Replace with your new API key if necessary

const $form = document.querySelector('form');
const $userInput = document.querySelector('#userInput');
const $imgBox = document.querySelector('.img-box');
const $showMore = document.getElementById('show-more-button');

let inputData = "";
let page = 1;

const fetchImages = async (url, retries = 3, backoff = 3000) => {
    try {
        console.log(`Fetching images from: ${url}`); // Log the URL
        const response = await fetch(url);
        console.log('Response status:', response.status); // Log response status
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                console.error('Rate limit exceeded, retrying...');
                await new Promise(resolve => setTimeout(resolve, backoff)); // Exponential backoff
                return fetchImages(url, retries - 1, backoff * 2);
            }
            const errorText = await response.text();
            throw new Error(errorText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching images:', error.message); // This is where you log the error
        return { results: [] };
    }
};

const searchImages = async () => {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`;
    const data = await fetchImages(url);
    displayImages(data.results);
};

const displayRandomImages = async () => {
    const url = `https://api.unsplash.com/photos/random?count=10&client_id=${AccessKey}`;
    const data = await fetchImages(url);
    displayImages(data);
};

const displayImages = (results) => {
    if (page === 1) {
        $imgBox.innerHTML = "";
    }

    if (!Array.isArray(results) || results.length === 0) {
        const message = document.createElement('p');
        message.textContent = "No images found.";
        $imgBox.appendChild(message);
        return;
    }

    results.forEach((result) => {
        if (result && result.urls && result.urls.small) {
            const imgWrapper = document.createElement('div');
            imgWrapper.classList.add("card", "m-1");
            imgWrapper.style.width = "18rem";

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";
            image.classList.add("fixed-size");

            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.textContent = result.alt_description || "View Image";
            imageLink.target = "_blank";

            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");

            const cardText = document.createElement('p');
            cardText.classList.add("card-text");

            cardText.appendChild(imageLink);
            cardBody.appendChild(cardText);
            imgWrapper.appendChild(image);
            imgWrapper.appendChild(cardBody);
            $imgBox.appendChild(imgWrapper);
        }
    });

    page++;

    if (page > 1) {
        $showMore.style.display = 'block';
    }
};

$form.addEventListener("submit", (event) => {
    event.preventDefault();
    inputData = $userInput.value.trim();

    if (!inputData) {
        window.location.reload();
    } else {
        page = 1;
        searchImages();
    }
});

$showMore.addEventListener("click", () => {
    if (!inputData) {
        displayRandomImages();
    } else {
        searchImages();
    }
});

// Call displayRandomImages when the page loads
window.onload = () => {
    page = 1;
    displayRandomImages();
};
