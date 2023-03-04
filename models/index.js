// import models
const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./productTag');

// Products belongsTo Category
Product.belongsTo(Category, {
	foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
	foreignKey: 'category_id',
	onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
	Product,
	Category,
	Tag,
	ProductTag,
};
