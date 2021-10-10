const axios = require('axios').default;

exports.RecipeUseCase = async (inputDto) => {
  try {
    const params = new URLSearchParams({
      type: 'public',
      app_id: process.env.apiId,
      app_key: process.env.apiKey,
    });
    console.log(params.toString());

    let result = await axios.get(
      `https://api.edamam.com/api/recipes/v2/${
        inputDto.recipeId
      }?${params.toString()}`
    );
    result = result.data;
    console.log(`axios response ${JSON.stringify(result, null, 2)}`);

    let ingredients = [];
    result.recipe.ingredients.forEach((ele) => {
      ingredients.push({
        food: ele.food,
        quantity: ele.quantity,
        measure: ele.measure,
        weight: ele.weight,
      });
    });

    let digest = [];
    result.recipe.digest.forEach((ele) => {
      if (
        ele.label === 'Fat' ||
        ele.label === 'Carbs' ||
        ele.label === 'Protein' ||
        ele.label === 'Sodium' ||
        ele.label === 'Cholesterol'
      )
        digest.push({
          label: ele.label,
          total: ele.total | 0,
          unit: ele.unit,
        });
    });

    const output = {
      id: inputDto.recipeId,
      name: result.recipe.label,
      image_url: result.recipe.image,
      ingredients: ingredients,
      caloriesPerServing: (result.recipe.calories / result.recipe.yield) | 0,
      weightPerServing: (result.recipe.totalWeight / result.recipe.yield) | 0,
      digest: digest,
    };

    return output;
  } catch (error) {
    throw new Error(error);
  }
};
