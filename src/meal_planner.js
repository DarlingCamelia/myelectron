const displayMeal = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const mealTypes = ['breakfast', 'lunch', 'dinner'];

    mealTypes.forEach(mealType => {
        const mealsForType = favorites.flatMap(recipe => recipe.meals || []).filter(meal => meal.type === mealType);
        const mealContainer = document.querySelector(`#${mealType} .meals`);

        if (mealsForType.length > 0) {
            mealsForType.forEach(meal => {
                const mealBox = document.createElement('div');
                mealBox.classList.add('meal-box');
                mealBox.innerHTML = `
                    <img src="${meal.image}" alt="${meal.recipe}">
                    <p>Recipe: ${meal.recipe}</p>
                    <p>Date: ${meal.date}</p>
                    <button class="grocery-list-button" data-recipe="${meal.recipe}">Grocery List</button>
                `;
                mealContainer.appendChild(mealBox);
            });
        } else {
            mealContainer.innerHTML = `<p>No meal planned for this type.</p>`;
        }
    });

    // Add event listener to all grocery list buttons
    const groceryListButtons = document.querySelectorAll('.grocery-list-button');
    groceryListButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const recipeName = e.target.getAttribute('data-recipe');
            const selectedRecipe = favorites.find(recipe => recipe.meals.some(meal => meal.recipe === recipeName));

            if (selectedRecipe) {
                // Store selected recipe name and ingredients in local storage
                localStorage.setItem('selectedRecipe', JSON.stringify({
                    name: recipeName,
                    ingredients: selectedRecipe.ingredients // Assuming ingredients are stored as a property of the recipe
                }));
            }

            window.location.href = 'grocery_list.html'; // Redirect to grocery list page
        });
    });
};

// Display the meal when the page loads
window.onload = displayMeal;