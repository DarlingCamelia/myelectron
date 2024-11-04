let allRecipes = []; // Store all fetched recipes

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function fetchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((response) => response.json())
    .then((data) => {
        const meals = data.meals;
        allRecipes = meals; // Save all recipes for filtering
        displayRecipes(meals);
        
        // Show the filter header and input after fetching results
        document.getElementById('filterHeader').style.display = "block";
        document.getElementById('filterInput').style.display = "block";
        document.getElementById('filterButton').style.display = "inline"; // Show the filter button
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        document.getElementById("results").innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    });
}

function displayRecipes(meals) {
    const resultsDiv = document.getElementById("results");
    if (!meals) {
        resultsDiv.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    let resultsHTML = '';
    meals.forEach(meal => {
        const meal_img = meal.strMealThumb;
        const name = meal.strMeal;
        const category = meal.strCategory;
        const instructions = meal.strInstructions;
        const youtube = meal.strYoutube;
        const mealId = meal.idMeal;

        // Prepare the ingredients list
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }

        resultsHTML += `
            <div class="meal" data-category="${category}" data-ingredients="${ingredientsList}">
                <h2>${name}</h2>
                <img src="${meal_img}" alt="${name}" style="max-width: 100%; height: auto;">
                <button class="info-button" 
                        data-name="${name}" 
                        data-category="${category}" 
                        data-instructions="${instructions}" 
                        data-ingredients="${ingredientsList}" 
                        data-youtube="${youtube}">More Info</button>
                       <button class="add-to-favorites" 
                        data-id="${mealId}" 
                        data-name="${name}" 
                        data-image="${meal_img}" 
                        data-category="${category}" 
                        data-instructions="${instructions}" 
                        data-youtube="${youtube}" 
                        data-ingredients="${ingredientsList}">Add to Favorites</button>
            </div>
        `;
    });

    resultsDiv.innerHTML = resultsHTML;

    // Add event listeners to the "Add to Favorites" buttons
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', () => {
            const mealId = button.getAttribute('data-id');
            const mealName = button.getAttribute('data-name');
            const mealImage = button.getAttribute('data-image');
            const mealCategory = button.getAttribute('data-category');
            const mealInstructions = button.getAttribute('data-instructions');
            const mealYoutube = button.getAttribute('data-youtube');
            const mealIngredients = button.getAttribute('data-ingredients');

            // Add to localStorage
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.id === mealId)) {
                favorites.push({ 
                    id: mealId, 
                    name: mealName, 
                    image: mealImage, 
                    category: mealCategory, 
                    instructions: mealInstructions, 
                    youtube: mealYoutube, 
                    ingredients: mealIngredients 
                });
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`${mealName} has been added to favorites!`);
            } else {
                alert(`${mealName} is already in favorites.`);
            }
        });
    });
}

// Function to filter recipes based on input
function filterRecipes() {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const meals = document.querySelectorAll('.meal');

    meals.forEach(meal => {
        const category = meal.getAttribute('data-category').toLowerCase();
        const ingredients = meal.getAttribute('data-ingredients').toLowerCase();

        if (category.includes(filterValue) || ingredients.includes(filterValue)) {
            meal.style.display = ""; // Show the meal if it matches the filter
        } else {
            meal.style.display = "none"; // Hide the meal if it does not match
        }
    });
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    fetchRecipes(query);
});

// Event listener for the filter button
document.getElementById('filterButton').addEventListener('click', () => {
    filterRecipes();
});

// Event listener for the info buttons in the recipes
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('info-button')) {
        const mealName = event.target.getAttribute('data-name');
        const mealCategory = event.target.getAttribute('data-category');
        const mealInstructions = event.target.getAttribute('data-instructions');
        const mealIngredients = event.target.getAttribute('data-ingredients');
        const mealYoutube = event.target.getAttribute('data-youtube');

        // Display the modal with meal information
        document.getElementById('modalTitle').innerText = mealName;
        document.getElementById('modalCategory').innerText = `Category: ${mealCategory}`;
        document.getElementById('modalInstructions').innerText = mealInstructions;
        document.getElementById('modalIngredients').innerHTML = mealIngredients;
        document.getElementById('modalYoutube').innerHTML = `Watch here: <a href="${mealYoutube}" target="_blank">${mealYoutube}</a>`;

        document.getElementById('infoModal').style.display = "block";
    }
});

// Close modal when the close button is clicked
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('infoModal').style.display = "none";
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('infoModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});