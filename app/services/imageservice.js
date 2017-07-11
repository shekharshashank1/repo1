angular.module('imageChatApp').factory('imagesService',['$http', function($http) {
	var obj = {};
	var url = 'https://hn.algolia.com/api/v1/search?query=';
	obj.getSearchResults = function(searchStr, pageNumber) {
		  if(!pageNumber) {
		  	pageNumber = 0;
		  }
		  return $http.get(url + searchStr + ';page=' + pageNumber).then(function(response){ 
   		  	var data = response.data;   		  
   		  	// var result = data.hits;     	  
   		  	return {data};
 		  });
	};
	return obj;
}])