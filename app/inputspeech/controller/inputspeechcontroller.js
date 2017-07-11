angular.module('imageChatApp').controller('inputSpeechController', ['$scope','$filter','$interval','imagesService', 'authorService', function($scope, $filter, $interval, imagesService, authorService){
	
	  
	  var self = this;
	  this.resultList = [];	  
	  this.currentOpInProgress = false;
	  this.currentPage = 1;

	  this.numberOfPages=function() {
        return this.totalPages;                        
      }
	  
	  this.submitForm = function() {
	  	this.currentOpInProgress = false;	  		  	
	  	this.currentPage = 0;
	  	this.loadingDone = false;
	  	var results = imagesService.getSearchResults(self.searchText);	  		
	  		results.then(function(data){
	  			this.resultList = [];
	  			this.currentOpInProgress = true;
	  			self.addToList(data.data);
	  			self.totalPages = data.data.nbPages;						 
	  		});
	  	
	  };

	  this.addToList = function(data) {	  
					if(data && data.hits.length > 0){						
						data.hits.map(function(resultData){								
							var authorName = authorService.getAuthorInfo(resultData.author).then(function(authorInfo){
								if(currentOpInProgress){
									self.resultList.push({'title': resultData.title,'authorName': resultData.author, 'author': authorInfo.name, 'url': resultData.url});	
								} else {
									return;
								}															
							});							
							
						});						
	  					
	  				} else {
	  					self.resultList = [];
	  					self.searchText = 'Sorry. The text could not be found. Try again';
	  				}	  	  
	  				this.loadingDone = true;					  				
	  };

	  this.getData = function () {
	  	var data =  $filter('filter')(this.resultList);
	  	// console.log(data);
      	return data;
      };

      this.nextPage = function () {
      	this.currentPage=this.currentPage+1;
      	this.resultList = [];
      	var results = imagesService.getSearchResults(self.searchText, this.currentPage);
	  		results.then(function(data){
	  			self.addToList(data.data); 
	  	});
      };

      this.prevPage = function () {
      	this.currentPage=this.currentPage - 1;
      	this.resultList = [];
      	var results = imagesService.getSearchResults(self.searchText, this.currentPage);
	  		results.then(function(data){
	  			self.addToList(data.data); 
	  	});
      }

      
	
}]);