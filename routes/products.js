var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//res.render('index', { title: 'Express' });
	res.send('something something');
});

// TODO: Move to database
var products = [
	{
		id: 1,
		image: 'random-image-1',
		name: 'Product 1',
		price: '9.99',
		tags: [
			'tag-1'
		]
	},
	{
		id: 2,
		image: 'random-image-2',
		name: 'Product 2',
		price: '99.99',
		tags: [
			'tag-1',
			'tag-2'
		]
	},
	{
		id: 3,
		image: 'random-image-3',
		name: 'Product 3',
		price: '2.99',
		tags: [
			'tag-2'
		]
	},
	{
		id: 4,
		image: 'random-image-3',
		name: 'Product 4',
		price: '18.00',
		tags: [
			'tag-1'
		]
	},
	{
		id: 5,
		image: 'random-image-2',
		name: 'Product 5',
		price: '5.00',
		tags: [
			'tag-1',
			'tag-2'
		]
	},
	{
		id: 6,
		image: 'random-image-1',
		name: 'Product 6',
		price: '0.01',
		tags: [
			'tag-2'
		]
	},
];

/* GET producst list json. */
router.get('/list', function(req, res) {
	res.json({'products': products});
});

module.exports = router;
