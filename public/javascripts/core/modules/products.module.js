APP.CORE.create_module('js-products', function(sb) {
	
	var OBJ,
		products;
	
	function setParams() {
		OBJ = $(sb.obj);
	}
	
	function getProducts() {
		$.ajax({
			datatype: 'json',
			type: 'GET',
			url: '/products/list',
			success: function(data) {
				products = data.products;
				
				var directive = {
					'li':{
						'product<-products':{
							'@id+': 'product.id',
							'@data-id':'product.id',
							'@class':'"product"',
							'div.picture@class+':' #{product.image}', 
							'div.name':'product.name', 
							'div.price':'&euro; #{product.price}'
						}
					}
				};
				
				var compiled = $(OBJ).compile(directive);

				OBJ.render(data, compiled);
				notifyAboutRender();
			}
		});
	}
	
	function notifyAboutRender() {
		sb.notify({
			type : 'products.list-render',
			data : {
				products: products
			}
		});
	}
	
	function notifyProductPurchase(product, type) {		
		sb.notify({
			type : 'products.' + type,
			data : {
				product: product
			}
		});
	}
	
	function onListRender(data) {
		$.each(data.products, function(i, k) {
			var obj = $('#js-product-' + k.id);
			
			products[i].obj = obj;
			$('#js-product-' + k.id).on('click', function(e){
				e.preventDefault();
				
				var notifyType = 'product-click-plusone';
				if (!products[i].purchased) {
					products[i].purchased = true;
					products[i].obj.addClass('purchased');
					notifyType = 'product-click';
				}
				
				notifyProductPurchase(products[i], notifyType);
			});
		});
	}
	
	function onProductNoLongerActive(data) {
		$.each(products, function(i, k) {
			if (k.id === data.product.id) {
				products[i].obj.removeClass('purchased');
				products[i].purchased = false;
				return;
			}
		});
	};
	
	return {
		onListRender : onListRender,
		onProductNoLongerActive : onProductNoLongerActive,
		init : function() {
			sb.log('init');
			
			setParams();
			getProducts();
			
			sb.listen({
                'products.list-render': onListRender,
				'cart.product-remove': onProductNoLongerActive
            });			
		},
		destroy : function () {
			sb.warning('Process killed');
		}
	};
	
});
