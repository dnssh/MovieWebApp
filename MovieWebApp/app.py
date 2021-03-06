from flask import Flask,request
import requests

app = Flask(__name__,static_url_path='')

api_url='https://api.themoviedb.org/'

api_key='97588ddc4a26e3091152aa0c9a40de22'

@app.route('/')
def root():
	try:
		return app.send_static_file('index.html')
	except Exception as e:
		print(e)



@app.route('/search')
def search_data():
	keyword = request.args.get("keyword", "")
	category = request.args.get("category", "")
	print(keyword,category)
	
	headers = {'Content-Type': 'application/json'}
	route = f'{api_url}3/search/{category}?api_key={api_key}&language=en-US&page=1&query={keyword}&include_adult=false'
	resp = requests.get(route, headers = headers)
	return (resp.text)

		
@app.route('/moviedetails')
def moviedetails():
	id = request.args.get("id", "")
	#https://api.themoviedb.org/3/movie/284052?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US
	headers = {'Content-Type': 'application/json'}
	route = f'{api_url}3/movie/{id}?api_key={api_key}&language=en-US&page=1&include_adult=false'
	resp = requests.get(route, headers = headers)
	return resp.text


@app.route('/moviecredits')
def moviecredits():
	id = request.args.get("id", "")
	#https://api.themoviedb.org/3/movie/284052?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US
	headers = {'Content-Type': 'application/json'}
	route = f'{api_url}3/movie/{id}/credits?api_key={api_key}&language=en-US&page=1&include_adult=false'
	resp = requests.get(route, headers = headers)
	return resp.text


@app.route('/moviereviews')
def moviereviews():
	id = request.args.get("id", "")
	#https://api.themoviedb.org/3/movie/284052?api_key=97588ddc4a26e3091152aa0c9a40de22&language=en-US
	headers = {'Content-Type': 'application/json'}
	route = f'{api_url}3/movie/{id}/reviews?api_key={api_key}&language=en-US&page=1&include_adult=false'
	resp = requests.get(route, headers = headers)
	return resp.text


@app.route('/test')
def test():
	headers = {'Content-Type': 'application/json'}
	route = api_url+'3/trending/movie/week?api_key='+api_key
	print(route)
	rr = requests.get(route)
	return rr.text