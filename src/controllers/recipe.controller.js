const { RecipeUseCase } = require('../use-cases/recipe.usecase');

exports.RecipeController = async (req, res) => {
  try {
    const inputDto = {
      recipeId: req.params.recipeId,
    };
    console.log(inputDto);

    const output = await RecipeUseCase(inputDto);
    console.log(`response: ${JSON.stringify(output, null, 2)}`);
    res.status(200).json(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'unhandled error' });
  }
};
