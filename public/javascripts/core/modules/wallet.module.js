APP.CORE.create_module('js-user-wallet', function(sb) {
	
	var OBJ,
		$totalDisplay,
		totalAmmount,
		products = [];
	
	function setParams() {
		OBJ = $(sb.obj);
		$totalDisplay = $('#total-ammount', OBJ);
		totalAmmount = 0.00;
	}
	
	function add(data) {
		totalAmmount = parseFloat(totalAmmount) + parseFloat(data.price);
		render();
	}
	
	function remove(data) {
		totalAmmount = parseFloat(totalAmmount) - parseFloat(data.price);
		render();
	}
	
	function render() {
		$totalDisplay.html('&euro;' + totalAmmount.toFixed(2));
	}
	
	return {
		add: add,
		remove: remove,
		init : function() {
			sb.log('init');
			
			setParams();

			sb.listen({
				'wallet.add': add,
				'wallet.remove': remove
			});
		},
		destroy : function () {
			sb.warning('Process killed');
		}
	};
});
