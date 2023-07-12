import "./Input.css";
import { useState } from "react";
import {
  RECIPE_SEARCH_API_ID,
  RECIPE_SEARCH_API_KEY,
  RECIPE_SEARCH_API_URL,
} from "../util/api";

const RecipeInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeData, setRecipeData] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    fetch(
      `${RECIPE_SEARCH_API_URL}?type=public&app_id=${RECIPE_SEARCH_API_ID}&app_key=${RECIPE_SEARCH_API_KEY}&q=${searchQuery}`
    )
      .then(async (res) => {
        const recipeDataResponse = await res.json();

        setRecipeData(recipeDataResponse.hits[0].recipe);
      })
      .catch((err) => console.log(err));
  };

  if (recipeData) console.log(recipeData);
  return (
    <div className="Input-Button">
      <form>
        <input
          value={searchQuery}
          type="text"
          name="searchQuery"
          onChange={handleInputChange}
          placeholder="Enter a food ingredient"
        />
        <button type="button" onClick={(event) => handleClick(event)}>
          Search
        </button>
      </form>

      {recipeData && (
        <div className="Recipe-Info">
          <h2>{recipeData.label}</h2>
          <img src={recipeData.image} alt={recipeData.label} />
          <p>Source: {recipeData.source}</p>
          <p>Ingredients: {recipeData.ingredientLines.join(", ")}</p>
          <a href={recipeData.url} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeInput;
