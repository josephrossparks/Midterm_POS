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
	}
];


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