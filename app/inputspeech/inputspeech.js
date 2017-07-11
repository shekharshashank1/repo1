angular.module('inputSearch',[]);


angular.module('inputSearch').directive('inputspeech', function(){
	return {
		replace: false,	
		restrict: 'E',	
		templateUrl: 'inputspeech/views/inputspeech.html'
	}
});

angular.module('inputSearch').directive('imagebox', function() {
	return {
		restrict: 'E',
		
		scope: {
			searchedItem: '=info'			
		},
		templateUrl: 'directives/imagebox/views/imagebox.html'
	}
});

var app = angular.module('inputSearch');
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

angular.module('inputSearch').directive('ngModelOnblur', function() {
    return {
        restrict: 'A',               
        link: function(scope, elm, attr, ngModelCtrl) {           
            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });         
            });
        }
    };
});

