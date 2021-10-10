const { RecipesUseCase } = require('../use-cases/recipes.usecase');

exports.RecipesController = async (req, res) => {
  try {
    inputDto = {
      ingredients: req.body.ingredients,
      restrictions: req.body.restrictions,
    };
    console.log(inputDto);

    const output = await RecipesUseCase(inputDto);
    console.log(`response: ${JSON.stringify(output, null, 2)}`);
    res.status(200).json(output);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'unhandled error' });
  }
};
