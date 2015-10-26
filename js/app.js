var app = angular.module('breakingNews',['ui.bootstrap']);

//angular.module('breakingNews', ['ui.bootstrap']);

app.provider('newsService', function(){
	return {
		$get: function($http){
			var newsApi = "http://breaking-news-api.herokuapp.com";

			return{
				getNews: function () {
                        return $http.get(newsApi + "/news")
                            .then(function (result) {
                            	var res = [];
                            	var obj = {};
                            	var imgs=["img/img0.jpg", "img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.png"];
                                for(var i = 0; i < 5; i++){
                                	var randIndex = Math.floor(Math.random()*100);
                                	res.push({title: result.data[randIndex].title,
                                		url: result.data[randIndex].url,
                                		summary: result.data[randIndex].summary,
                                		img: imgs[i],
                                		source: result.data[randIndex].source});
                                }
                                return res;
                            }, function (err) {
                                return err;
                            });
				}
			}
		}
	}
});


app.controller('NewsController', function($scope, newsService) {

	$scope.news = [];

    $scope.getNews = function () {
            newsService.getNews()
                .then(function (result) {
                    $scope.news = result;
                }, function (err) {
                    console.log(err);
                });
    };

    $scope.getNews();
});