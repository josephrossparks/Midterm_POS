var masterItemList = [
	{
		name: 'Grape Juice',
		price: 4,
		class: 'juice',
		description: 'The purest juice from delicious grapes.'
	},
	{
		name: 'Apple Juice',
		price: 3,
		class: 'juice',
		description: 'We squeezed an apple into a cup!'
	},
	{
		name: 'Kiwi Lime Blitz',
		price: 5,
		class: 'smoothie',
		description: 'Savory blend of kiwis, lime juice, and sorbet.'
	},
	{
		name: 'Mango Guava Jive',
		price: 6,
		class: 'smoothie',
		description: 'Put the mango in the guava and what do you get?'
	}
];

masterItemList.forEach(function(item){
	printItemToShopPage(item);
});

function printItemToShopPage(item) {
	console.log(item.name);
	console.log(item.price);
	console.log(item.class);
	console.log(item.description);
;
}