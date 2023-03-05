const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
	// find all categories
	// be sure to include its associated Products
	Category.findAll({
		include: [
			{
				model: Product,
			},
		],
	}).then((categories) => {
		res.json(categories);
	});
});

router.get('/:id', (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
			},
		],
	}).then((categories) => {
		res.json(categories);
	});
});

router.post('/', (req, res) => {
	// create a new category
	Category.findOrCreate({
		//this checks is there is an existing category of the same name if not creates new one
		where: { category_name: req.body.category_name },
		defaults: {
			category_name: req.body.category_name,
		},
	}).then(() => {
		res.send('New Category Added Successfully!');
	});
});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
	Category.update(
		{
			// All the fields you can update and the data attached to the request body.
			category_name: req.body.category_name,
		},
		{
			// Gets the categories based on the id given in the request parameters
			where: {
				id: req.params.id,
			},
		}
	)
		.then((updatedCategory) => {
			// Sends the updated book as a json response
			res.json(updatedCategory);
		})
		.catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((deletedCategory) => {
			res.json(deletedCategory);
		})
		.catch((err) => res.json(err));
});

module.exports = router;
