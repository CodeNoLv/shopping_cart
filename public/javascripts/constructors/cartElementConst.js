
var cartElementConst = function(product, OBJ, fascade) {
	this.fascade = fascade;
	this.OBJ = OBJ;
	this.product = product;
	this.$product = {};
	this.$options;
	this.$counter;
	this.$name;
	this.$deleteButton;
};

cartElementConst.prototype.init = function(product, OBJ) {
	this.product = product;
	this.OBJ = OBJ;
};

cartElementConst.prototype.update = function(product) {
	this.product = product;
	this.updateHtml();
};

cartElementConst.prototype.render = function() {
	this.$product = this.getHtmlBaseElement();
	
	this.$options = this.getHtmlOptions();
	this.$product.append(this.$options);
	
	this.$counter = this.getHtmlCounter();	
	this.$product.append(this.$counter);
	
	this.$name = this.getHtmlName();	
	this.$product.append(this.$name);
	
	this.$deleteButton = this.getHtmlDeleteButton();	
	this.$product.append(this.$deleteButton);
	
	this.OBJ.append(this.$product);
};

cartElementConst.prototype.getHtmlBaseElement = function() {
	var $element = $('<li></li>');
	
	return $element
		.attr('id', 'cart-product-' + this.product.id)
		.attr('class', 'cart-product clearfix');
};

cartElementConst.prototype.getHtmlOptions = function() {
	var $options = $('<div class="purchase-element options"></div>');
	var $optionUp = $('<div class="options-up">▲</div>');
	var $optionDown = $('<div class="options-down">▼</div>');
	
	$options.append($optionUp);
	$options.append($optionDown);
	
	var self = this;
	
	// TODO: Add as callback from module
	$optionUp.on('click', function(e) {
		e.preventDefault();
		
		self.fascade.notify({
			type : 'products.product-click-plusone',
			data : {
					product: self.product
			}
		});
	});
	
	// TODO: Add as callback from module
	$optionDown.on('click', function(e) {
		e.preventDefault();
		
		self.fascade.notify({
			type : 'products.product-click-minusone',
			data : {
					product: self.product
			}
		});
	});
	
	return $options;
};

cartElementConst.prototype.getHtmlCounter = function() {
	var $counter = $('<div class="purchase-element counter">');
	var $number = $('<span>' + this.product.count + '</span>');
	
	$counter.append($number);
	
	return $counter;
};

cartElementConst.prototype.getHtmlName = function() {
	var $nameDiv = $('<div class="purchase-element name">');
	var $name = $('<span><small>&euro; ' + this.product.price + '</small> ' + this.product.name + '</span>');
	
	$nameDiv.append($name);
	
	return $nameDiv;
};

cartElementConst.prototype.getHtmlDeleteButton = function() {
	var $buttonDiv = $('<div class="purchase-element button-delete">');
	var $button = $('<span>x</span>');
	
	$buttonDiv.append($button);
	
	var self = this;
	
	// TODO: Add as callback from module
	$button.on('click', function(e) {
		e.preventDefault();
		self.fascade.notify({
			type : 'cart.product-remove',
			data : {
					product: self.product
			}
		});
	});
	
	return $buttonDiv;
};

cartElementConst.prototype.updateHtml = function() {
	this.$counter.find('span').html(this.product.count);
};


cartElementConst.prototype.delete = function() {
	this.$product.remove();
};
