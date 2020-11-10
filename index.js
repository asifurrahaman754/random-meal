const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			createMeal(res.meals[0]);
		});
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<h3 class="mealName">${meal.strMeal}</h3>
		<div class="row">
			<div class="incredients">
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			
			<div class="mealImg">
					<img src="${meal.strMealThumb}" alt="Meal Image">
					<div id="mealTag">
						<i id="closeMealtag" class="fas fa-times"></i>
						${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
						${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
						${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
					</div>
			</div>

		</div>		

		<div class="recipe">
			<h5>Recipe</h5>
			<p>${meal.strInstructions}</p>
		</div>

		${meal.strYoutube ? `
		<div class="videoRecipe">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

	meal_container.style.display = "block";
	meal_container.innerHTML = newInnerHTML;

	document.querySelector('.downarrow').style.display = "block";
	//close the meal tag when close btn press
	document.querySelector('#closeMealtag').addEventListener('click', () => {
		document.querySelector('#mealTag').style.display = "none"
	})
}