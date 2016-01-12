var GGazette = angular.module('GGazette', ['ngRoute'])

.controller('mainCtrl', ['$scope', function($scope){
  $scope.working = 'giddy up'
}])

.controller('homeCtrl', ['$scope', '$http' ,function($scope, $http){

  $http.get('/allStories').then(function(stories){
    console.log(stories)
    $scope.stories = stories.data.stories
  })

  $scope.addstory = function(){
    $http.post('/addStory', {form : $scope.form})
  }

}])

.controller('storyCtrl', ['$http', '$scope', '$routeParams' ,function($http, $scope,$routeParams){

  $http.get('/oneStory/'+ $routeParams.id).then(function(result){
    $scope.story = result.data.story[0]
    $scope.comments = result.data.comments
    var exludedWords = {
      'the' : true,
      'if' : true,
      'I' : true,
      "a" : true,
      "of": true,
      'not' : true,
      'is' : true
    },
    commentsString = ''
    result.data.comments.forEach(function(comment){
      commentsString += comment.text + " "
    })
    commentCount = commentsString.split(' ')

    var wordCount = commentCount.reduce(function(counter, current){
      if(!counter[current]){
        if(!exludedWords[current] && current.length > 0){
          counter[current] = 1
        }
      }else{
        counter[current] ++
      }
      return counter
    },{})
    $scope.mostUsedWords = []

    for(prop in wordCount){
      $scope.mostUsedWords.push({
        word: prop,
        count: wordCount[prop]
      })
    }

  })

  $scope.addComment = function(){
    $http.post('/addComment', {
      form: $scope.form,
      story_id : $routeParams.id
    })
  }



}])


.config(function($routeProvider, $locationProvider){
  $routeProvider

  .when('/', {
    templateUrl: '../partials/home.html',
    controller: 'homeCtrl'
  })
  .when('/stories/:id', {
    templateUrl: '../partials/story.html',
    controller: 'storyCtrl'
  })

  $locationProvider.html5Mode(true);
})