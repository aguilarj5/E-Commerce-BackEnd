const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	Tag.findAll({
		include: [
			{
				model: Product,
			},
		],
	}).then((tags) => {
		res.json(tags);
	});
});

router.get('/:id', (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
			},
		],
	}).then((tag) => {
		res.json(tag);
	});
});

router.post('/', (req, res) => {
	// create a new tag
	Tag.findOrCreate({
		//this checks is there is an existing tag of the same name if not creates new one
		where: { tag_name: req.body.tag_name },
		defaults: {
			tag_name: req.body.tag_name,
		},
	}).then(() => {
		res.send('New Tag Added Successfully!');
	});
});

router.put('/:id', (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(
		{
			// All the fields you can update and the data attached to the request body.
			tag_name: req.body.tag_name,
		},
		{
			// Gets the categories based on the id given in the request parameters
			where: {
				id: req.params.id,
			},
		}
	)
		.then((updatedTag) => {
			// Sends the updated book as a json response
			res.json(updatedTag);
		})
		.catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((deletedTag) => {
			res.json(deletedTag);
		})
		.catch((err) => res.json(err));
});

module.exports = router;
