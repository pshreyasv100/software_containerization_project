<!DOCTYPE html>
<html ng-app="moviesApp">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.9/angular.min.js"></script>
    <script>
      var app = angular.module("moviesApp", []);
      app.controller("moviesCtrl", function($scope) {
        $scope.movies = [
          { title: "The Shawshank Redemption", director: "Frank Darabont" },
          { title: "The Godfather", director: "Francis Ford Coppola" },
          { title: "The Dark Knight", director: "Christopher Nolan" }
        ];
        $scope.addMovie = function() {
          $scope.movies.push({
            title: $scope.newMovieTitle,
            director: $scope.newMovieDirector
          });
        };
      });
    </script>
    <style>
    .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
    </style>
  </head>
  <body ng-controller="moviesCtrl">
    <h3 style="font-family:verdana;">Movies</h3>
    <table class="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Director</th>
        </tr>
    </thead>
    <tbody>
      <tr ng-repeat="movie in movies">
        <td>{{ movie.title }}</td>
        <td>{{ movie.director }}</td>
      </tr>
     </tbody>
    </table>
    <hr>
    <form>
      <p>
        <label>Title:</label>
        <input type="text" ng-model="newMovieTitle" />
      </p>
      <p>
        <label>Director:</label>
        <input type="text" ng-model="newMovieDirector" />
      </p>
      <button ng-click="addMovie()">Add Movie</button>
    </form>
  </body>
</html>
