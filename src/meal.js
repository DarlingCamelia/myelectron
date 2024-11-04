/*function buttonClicked(){   
    const menu = document.getElementById("menu_input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${menu}`)
    .then((response) => response.json())
    .then((data) => {
        const meals = data.meals; // Get all meals

        if (!meals) {
            document.getElementById("demo6").innerHTML = "No meals found.";
            return;
        }

        let mealsHTML = ""; // Initialize an empty string to hold meal information

        // Iterate through each meal
        meals.forEach(meal => {
            const meal_img = meal.strMealThumb;
            const name = meal.strMeal;
            const category = meal.strCategory;
            const instructions = meal.strInstructions;
            const youtube = meal.strYoutube;
            const mealId = meal.idMeal; // Get meal ID

            let ingredientsList = '';

            // Get ingredients
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                    ingredientsList += `<li>${measure} ${ingredient}</li>`;
                }
            }

            // Create HTML for each meal
            mealsHTML += `
                <div class="meal">
                    <h2>${name}</h2>
                    <img src="${meal_img}" alt="${name}" style="max-width: 100%; height: auto;">
                    <p>Category: ${category}</p>
                    <p>Youtube Resource: <a href="${youtube}" target="_blank">${youtube}</a></p>
                    <h4>Ingredients:</h4>
                    <ul>${ingredientsList}</ul>
                    <h3>Instructions</h3>
                    <p>${instructions}</p>
                    <button class="add-to-favorites" data-id="${mealId}" data-name="${name}" data-image="${meal_img}" data-category="${category}" data-instructions="${instructions}" data-youtube="${youtube}" data-ingredients="${ingredientsList}">Add to Favorites</button>
                </div>`; // Close the meal div
        });

        // Update the HTML with all meals
        document.getElementById("demo6").innerHTML = mealsHTML; // Display all meals

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
                }
            });
        });
    });
}*/

function buttonClicked() {   
    const menu = document.getElementById("menu_input").value;
    if (menu) {
        // Redirect to search_result.html with the search query
        window.location.href = `search_result.html?query=${encodeURIComponent(menu)}`;
    } else {
        alert("Please enter a meal name.");
    }
}

