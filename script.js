// Event listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
    const Food = document.getElementById("food");

    if (Food) {
        const food = Food.value; 

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Food not found");
                }
                return response.json();
            })
            .then(data => {
             
                const meal = data.meals ? data.meals[0] : null;
                if (!meal) {
                    throw new Error("Meal not found");
                }

            
                recipeInfo(meal);
            })
            .catch(error => {
                alert(error.message);
            });
    } else {
        alert("Please enter food name");
    }
});

function recipeInfo(meal) {
  
    document.getElementById("meal_id").textContent = `Meal id: ${meal.idMeal}`;

    document.getElementById("meal").textContent = `Meal Name: ${meal.strMeal}`;
    document.getElementById("category").textContent = `Category of meal: ${meal.strCategory}`;
    document.getElementById("area").textContent = `Originating from: ${meal.strArea}`;
    document.getElementById("instructions").textContent = `Meal preparation Instructions: ${meal.strInstructions}`;

   
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(meal[`strIngredient${i}`]);
        }
    }
    document.getElementById("ingredients").textContent = `Ingredients: ${ingredients.join(", ")}`;
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if the user has a saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggleButton.textContent = 'Switch to Light Mode'; // Change the button text
    }

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        // Save the user's preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleButton.textContent = 'Switch to Light Mode'; // Change the button text
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleButton.textContent = 'Switch to Dark Mode'; // Change the button text
        }
    });
});
