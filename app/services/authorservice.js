angular.module('imageChatApp').factory('authorService',['$http', function($http) {
	var obj = {};
	var url = 'http://hn.algolia.com/api/v1/users/';
	obj.getAuthorInfo = function(searchStr) {
		  return $http.get(url + searchStr).then(function(response){ 
   		  	var data = response.data.karma;   		     		  	   	  
   		  	return {name: data};
 		  });
	};
	return obj;
}])