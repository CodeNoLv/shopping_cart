APP.CORE.create_module('js-cart', function(sb) {
	
	var OBJ,
		products = [];
	
	function setParams() {
		OBJ = $(sb.obj);
	}
	
	// If the product is purchased we will place it in users shopping cart
	function onProductPurchase(data) {
		var element = new cartElementConst(data.product, OBJ, sb);
		
		products[data.product.id] = data.product;
		products[data.product.id].element = element;
		products[data.product.id].count = 1;
		
		element.render();
		
		sb.notify({
			type : 'wallet.add',
			data : {
				price: products[data.product.id].price
			}
		});
	}
	
	function onPlusOne(data) {
		var product = products[data.product.id];
		product.count++;
		product.element.update(product);
		
		sb.notify({
			type : 'wallet.add',
			data : {
				price: product.price
			}
		});
	}
	
	function onMinusOne(data) {
		var product = products[data.product.id];
		
		if (product.count > 1) {
			product.count--;
			product.element.update(product);
			
			sb.notify({
				type : 'wallet.remove',
				data : {
					price: product.price
				}
			});
		}
		
	}
	
	function onDelete(data) {
		var product = products[data.product.id];
		
		product.element.delete();
		
		sb.notify({
			type : 'wallet.remove',
			data : {
				price: parseFloat(product.count) * parseFloat(product.price)
			}
		});
		
		delete  products[product.id];
	}
	
	return {
		onProductPurchase: onProductPurchase,
		onPlusOne: onPlusOne,
		onMinusOne: onMinusOne,
		onDelete: onDelete,
		init : function() {
			sb.log('init');
			
			// Get list element constructor
			require(['constructors/cartElementConst'], function() {
				setParams();

				sb.listen({
					'products.product-click': onProductPurchase,
					'products.product-click-plusone': onPlusOne,
					'products.product-click-minusone': onMinusOne,
					'cart.product-remove': onDelete,
				});
			});			
		},
		destroy : function () {
			sb.warning('Process killed');
		}
	};
	
});
