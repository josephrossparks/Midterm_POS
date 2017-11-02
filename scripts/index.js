(function() {

//Master Item Array
var masterItemList = [
	{
		name: 'Grape Juice',
		price: 4,
		class: 'juice',
		description: 'The purest juice from delicious grapes.',
		itemNumber: 1
	},
	{
		name: 'Apple Juice',
		price: 3,
		class: 'juice',
		description: 'We squeezed an apple into a cup!',
		itemNumber: 2
	},
	{
		name: 'Kiwi Lime Blitz',
		price: 5,
		class: 'smoothie',
		description: 'Savory blend of kiwis, lime juice, and sorbet.',
		itemNumber: 3
	},
	{
		name: 'Mango Guava Jive',
		price: 6,
		class: 'smoothie',
		description: 'Put the mango in the guava and what do you get?',
		itemNumber: 4
	},

	{	name: 'Pomegranate Passion',
		price: 5,
		class: 'smoothie',
		description: 'A passionate combination of pomegranate and pineapple.',
		itemNumber: 5
	},

	{
		name: 'Groovey Green Goddess ',
		price: 4,
		class: 'juice',
		description: 'Get your groove back with natures finest greens.',
		itemNumber: 6
	},

	{
		name: 'Pink Lady',
		price: 4,
		class: 'juice',
		description: 'Put some pink in your cheeks with the sweetest pink grapefruit.',
		itemNumber: 7
	},

	{
		name: 'Jungle Juice',
		price: 6,
		class: 'juice',
		description: 'The purest juice from spinach and tropical fruits',
		itemNumber: 8
	},

	{
		name: 'Pineapple Pleasure',
		price: 5,
		class: 'smoothie',
		description: 'If pineapple pleases you then this is the smoothie for you.',
		itemNumber: 9
	},

	{
		name: 'Pineapple Juice',
		price: 4,
		class: 'juice',
		description: 'The crazy crash of juice from delicious pineapple.',
		itemNumber: 10
	},

	{
		name: 'Happy Monday',
		price: 7,
		class: 'juice',
		description: 'Can make anyday of the week happy.',
		itemNumber: 11
	},

	{
		name: ' Berry Carrot Dream',
		price: 4,
		class: 'juice',
		description: 'The purest juice from delicious carrots.',
		itemNumber: 12
	}





//This function prints all the items to the shop page.
 masterItemList.forEach(function(item){
	printItemToShopPage(item);
});


//This function finds the info of each object, creates a container, fills it, and places it in the DOM.
function printItemToShopPage(item) {
	var itemContainer = $('<div></div>');//Creates Container
	var namePTag = $('<p>'+item.name+'</p>');//Identifies Name
	var pricePTag = $('<p>'+item.price+'</p>');//Identifies Price
	var classPTag = $('<p>'+item.class+'</p><');//Identifies Class
	var descriptionPTag = $('<p>'+item.description+'</p>');//Identifies Description
	
	var itemContainerId = 'item'+item.itemNumber;//Identifies Item Number
	$(itemContainer).attr('id', itemContainerId).attr('class', 'itemContainer');//Assigns number as ID to container

	itemContainer.append(namePTag).append(pricePTag).append(classPTag).append(descriptionPTag);//adds info to container

	$("#shopPage").append(itemContainer);//puts container in the DOM
}

})();