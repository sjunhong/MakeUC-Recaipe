const axios = require('axios').default;

exports.RecipesUseCase = async (inputDto) => {
  try {
    const params = new URLSearchParams({
      q: inputDto.ingredients.join(' '),
      type: 'public',
      app_id: process.env.apiId,
      app_key: process.env.apiKey,
      health: inputDto.restrictions,
    });

    // const result = await axios.get(
    //   `https://api.edamam.com/api/recipes/v2?${params.toString()}`
    // );
    let result = await axios.get(
      `https://api.edamam.com/api/recipes/v2?q=apple&app_id=895ccd67&app_key=7b9e2b6bc2852c788be185ef6943cbde&type=public`
    );
    result = result.data;
    console.log(`axios response ${JSON.stringify(result, null, 2)}`);
    let output = [];

    result.hits?.forEach((ele) => {
      output.push({
        id: ele.recipe.uri.split('_')[1],
        name: ele.recipe.label,
        image_url: ele.recipe.image,
      });
    });

    return output;
  } catch (error) {
    throw new Error(error);
  }
};
