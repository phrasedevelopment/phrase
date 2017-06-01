'use strict'
/*This section requires the node module fs to read the template html*/
var fs = require('fs')
/*This part exposes this module to rest of app*/
module.exports = {
    url: '/list',
    controller: ['$scope', 'articles', controller],
    template: fs.readFileSync(__dirname + '/template.html', 'utf-8')
}

function controller($scope, articles) {
    /*Tells controller if it should have back or menu button*/
	$scope.$emit('pushChangesToAllNodes', backButtonPlacer());

    function backButtonPlacer() {
        return { name: 'isArticlePageBool', data: false };
    }
    /*Boolean that is referenced in the circular loading indicator*/
	$scope.loadingArticles = true;

    /*List all articles if admin*/
    if ($scope.activeUser == 'admin') {
        articles.list().then(function(docs) {
            $scope.articles = docs;
            /*Boolean is switched to end circular loading indicator*/
            $scope.loadingArticles = false;
        })
    }
    /*Otherwise lists articles made by user*/
    else {
        articles.listByUser($scope.activeUser)
        .then(function(res) {
            $scope.articles = res;
            /*Boolean is switched to end circular loading indicator*/
            $scope.loadingArticles = false;
        })
    }
}
