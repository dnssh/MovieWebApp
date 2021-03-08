# Movie-WebApp

It is a FullStack Webapp built over flask server and includes NightwatchJs Tests.



### Folder Structure

```
Root  
|  
|--MovieApp/
|     |--Static/
|     |    |  |--images/
|     |    |  
|     |    |--index.html  
|     |    |--style.css 
|     |    |--script.js
|     |
|     |--app.py  
|	  |--requirements.txt   
|
|--NightWatchTesting/
	  |--tests/
	  |    |--test1.js
   	  |
	  |--nightwatch.conf.js
	  |--package.json

```


###  1) MovieApp:
#### Installation
> pip install -r requirements.txt


#### Run:
> flask run  
> http://localhost:5000


### 2) NightwatchTesting:
#### Installation

> npm install

#### Run tests:
> npm test tests/test1.js

#### API used:
The Movie Database API [TMDB](https://www.themoviedb.org/documentation/api?language=en-US)



### KeyPoints:
1) MovieApp Server built on Flask 
2) Used Vanilla Javascript
3) Implemented NightwatchJS tests that confirms the page is loading and some data is displayed.
4) Used Pagination to move through sets of results
5) Implemented Modal for deatiled display of Movie details
6) Minimalist Design
7) Page render on server-side.


### Features:
1) Movie Search by keyword
2) Card View display
3) Pagination in results
4) Modal for detailed description
5) Movie Poster and Cast display
6) Movie Review section
7) Nightwatch JS test for data load


### Nightwatch.JS Tests:
1) Search by keyword and check if data loaded
2) Clear and Search for another keyword and confirm data is loaded
3) Search for a random string and confirm No data is loaded

