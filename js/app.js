var app = angular.module('articleManager', [
  'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller: "IndexCtrl"})
    .when("/new",{templateUrl:"partials/new.html", controller: "NewCtrl"})
    .when("/edit/:id",{templateUrl:"partials/edit.html", controller:"EditCtrl"});
}]);

app.controller("IndexCtrl", function ($scope, $window, $http) {
   getArticlesList();
   $scope.deleteArticle=function (article) {
       if (confirm('czy na pewno chcesz usunąć ten artykuł?')){
          $http.delete("http://localhost:4300/deleteArticle/" + article.id).then(function () {
              getArticlesList();
          });
       }
   };
   function getArticlesList () {
        $http.get("http://localhost:4300/articlesList").then(function (response) {
            $scope.articles = response.data;
        })
   }
});
app.controller('NewCtrl', function ($scope, $window, $http){
    $scope.article ={};
    $scope.addArticle=function () {
        if ($scope.article.title !="" && $scope.article.author !="" && $scope.article.content !=""){
            $http.post("http://localhost:4300/addArticle",$scope.article).then(function (response) {
                $window.location.href="/";
            });
        }
        else {
            $scope.errorMesagge ="uzupełnij wszystkie pola";
        }
    }
});
app.controller('EditCtrl', function ($scope, $window, $routeParams, $http) {
    $http.get("http://localhost:4300/getArticle/"  + $routeParams.id).then(function (response) {
        var articleToEdit =response.data[0];
        $scope.articleToEdit = articleToEdit;
    });
    var articleId = $routeParams.id;
    $scope.errorText = "";
    $scope.saveEditedArticle = function () {
        if ($scope.articleToEdit.title != "" && $scope.articleToEdit.author != "" && $scope.articleToEdit.content != "") {
            $http.post("http://localhost:4300/editArticle/" + articleId, $scope.articleToEdit).then(function (response) {
                $window.location.href="/";
            });
        }
        else {
            $scope.errorText ="uzupełnij wszystkie pola";
        }
    };
});







