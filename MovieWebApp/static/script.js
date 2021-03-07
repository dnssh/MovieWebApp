
    function decide(event,ival=5){
      event.preventDefault();
      keyword=send_search_form.searchbox.value;
      
      if(!keyword){
        alert("Please enter valid values");
      }
      else {
        search1(keyword,ival);
      }
    }

    xmlhttp = new XMLHttpRequest();
    dmovies={
       28:"Action",
       12: "Adventure",
       16:"Animation",
       35:"Comedy",
       80:"Crime",
       99:"Documentary",
       18:"Drama",
       10751:"Family",
       14:"Fantasy",
       36:"History",
       27: "Horror",
       10402: "Music",
       9648: "Mystery",
       10749: "Romance",
       878: "Science Fiction",
       10770: "TV Movie",
       53:"Thriller",
       10752:"War",
       37: "Western"
    }

    dtv={
      10759: "Action & Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      10762: "Kids",
      9648: "Mystery",
      10763: "News",
      10764: "Reality",
      10765: "Sci-Fi & Fantasy",
      10766: "Soap",
      10767: "Talk",
      10768: "War & Politics",
      37: "Western"
    }

    function search1(keyword,ival=5){

      category='movie';
      url="search?keyword="+keyword+"&category="+category;
      var dataob = xmlhttp.open('GET', url, false);
      xmlhttp.send();
      dataob=JSON.parse(xmlhttp.responseText);
      if (dataob.status=="error"){
        alert(dataob.message);
        return;
      }

      var displaydata= document.getElementById("displaydata");
      displaydata.innerHTML="";
      displaydata.style.display="block";



      tlen=dataob["results"].length;
      if(tlen==0){
        var showres=document.getElementById("showres");
        showres.innerText='';
        var displaydata= document.getElementById("displaydata");
        displaydata.innerHTML='<p style="color:white;padding-left:40%;">\
                                 No results found</p>';
      }

      else{

        var showres=document.getElementById("showres");
        showres.innerText='Showing Results ...';


        ndata=dataob["results"];
        sval=ival-5;
        for (var i=sval;i<ival;i++){
          var gstr=''
          var id=ndata[i]["id"];
          var title=ndata[i]["title"];
          var overview=ndata[i]["overview"].substring(0,350);
          var poster_path=ndata[i]["poster_path"];
          var release_date=ndata[i]["release_date"];
          var year=release_date.substring(0,4);
          var vote_average=ndata[i]["vote_average"]/2;
          var vote_count=ndata[i]["vote_count"];
          var genre_ids=ndata[i]["genre_ids"];

          for(var j=0;j<genre_ids.length;j++){
            gstr+=dmovies[genre_ids[j]]+', '
          }
          gstr=gstr.substring(0,gstr.length-2);

          var new_news = document.createElement("div");
          new_news.className = "card";
          new_news.style.display="block";
          displaydata.appendChild(new_news);

          var news_image_div = document.createElement("div");
          news_image_div.className = "column left";

          var news_image = document.createElement("img");

          if(poster_path==null){
            news_image.src ="images/movie_placeholder.png";
          }

          else{
          news_image.src ="https://image.tmdb.org/t/p/w185/"+poster_path;
          }

          news_image_div.appendChild(news_image);
          new_news.appendChild(news_image_div);


          var news_text_div = document.createElement("div");
          news_text_div.className = "column right";

          var ltype='movie';

          news_text_div.innerHTML= '<p id=\"mtitle\">\
                                     <b>'+title+'</b></p><br>\
                                     <p id=\"pyear\">'+year+' | '+gstr+'</p>\
                                     <p id=\"vavg\">&#9733;'+vote_average+'/5 </p>\
                                     <p id=\"vcnt\">'+vote_count+' votes</p>\
                                     <br><br><p id=\"#movw\">'+overview+'</p>\
                                     <br><br><button class=\"showmore\" onclick=\"modal(\'movie\','+id+');\" >Show More</button>';

          new_news.appendChild(news_text_div);

          console.log("done",i);
          }

      }//else
    }

  function modal(ltype,id){
    console.log(ltype,id);


  var modal = document.getElementById("myModal");
  modal.style.display = "block";


  //Decription Section
  var content = document.getElementById("desc");
  content.innerHTML="<p>MovieId: "+id+"</p>";


  //var ltype='movie';
  url=ltype+"details?id="+id;
  var dataob = xmlhttp.open('GET', url, false);
  xmlhttp.send();
  ndata=JSON.parse(xmlhttp.responseText);
  if (ndata.status=="error"){
    alert(ndata.message);
    return;
  }

  var gstr='';
  var lstr='';

  var id=ndata["id"];
  var title=ndata["title"]||ndata["name"];
  var overview=ndata["overview"];
  var poster_path=ndata["poster_path"];
  var release_date=ndata["release_date"]||ndata["first_air_date"];
  var year=release_date.substring(0,4);
  var vote_average=ndata["vote_average"]/2;
  var vote_count=ndata["vote_count"];
  var genres=ndata["genres"];
  var lang=ndata["spoken_languages"];

  for(var j=0;j<genres.length;j++){
    gstr+=genres[j]["name"]+', ';
      }
    gstr=gstr.substring(0,gstr.length-2);

  for(var k=0;k<lang.length;k++){
    lstr+=lang[k]["english_name"]+', ';
      }
    lstr=lstr.substring(0,lstr.length-2);

  var backdrop_path=ndata["backdrop_path"];
  if(backdrop_path==null){
      bpath ="images/poster_placeholder.jpg";
    }
    else{
    bpath ="https://image.tmdb.org/t/p/w780/"+backdrop_path;
    }

  document.getElementById("backdrop").src =bpath;

  document.getElementById("desc").innerHTML='<p id=\"mtitle2\">\
                                              <b>'+title+'</b></p><p style="display:inline;">\
                                              <a target="_blank" style="text-decoration:none; color:#cc0000;" href="https://www.themoviedb.org/'+ltype+'/'+id+'" >&#9432;</a></p>\
                                              <p style=\"margin-left:15px;font-size:13px;\">'+year+' | '+gstr+'</p>\
                                              <p id="vavg">&#9733;'+vote_average+'/5 </p>\
                                              <p id=\"vcnt\" >'+vote_count+' votes</p>\
                                              <p id="movw">'+overview+'</p>\
                                              <p id="lstr">Spoken Languages: '+lstr+'</p>';

  // Credits section
  url2=ltype+"credits?id="+id;
  var dataob = xmlhttp.open('GET', url2, false);
  xmlhttp.send();
  dataob=JSON.parse(xmlhttp.responseText);
  if (dataob.status=="error"){
    alert(dataob.message);
    return;
  }

  ndata=dataob["cast"];

  castdiv=document.getElementById("castdiv");
  castdiv.innerHTML=" ";
  
  for(var i=0;i<=7;i++){

    aname=ndata[i]['name'];
    cname=ndata[i]['character'];
    profile_path=ndata[i]['profile_path'];



    if(aname.length>27){
      aname=aname.slice(0,26)
      aname=aname+'...';
    }
    if(cname.length>27){
      cname=cname.slice(0,26)
      cname=cname+'...';
    }

    if(profile_path==null){
      fpath ="images/person_placeholder.png";
    }
    else{
    fpath ="https://image.tmdb.org/t/p/w185/"+profile_path;
    }

    var cdiv = document.createElement("div");
    cdiv.style.display='inline-block';
    cdiv.style.padding='5px';


    cdiv.innerHTML='<img src="'+fpath+'"><br>\
                    <p align="center" class="aname">'+aname+'</p>\
                    <p class="cname" align="center">as<br>'+cname+'</p>';

    castdiv.appendChild(cdiv);
  }//endfor8


  //Review Section
  url3=ltype+"reviews?id="+id;
  var dataob = xmlhttp.open('GET', url3, false);
  xmlhttp.send();
  dataob=JSON.parse(xmlhttp.responseText);
  if (dataob.status=="error"){
    alert(dataob.message);
    return;
  }

  rdata=dataob["results"];


  reviewdiv=document.getElementById("reviewdiv");
  reviewdiv.innerHTML=" ";

  for(var i=1;i<=5;i++){
    var name=rdata[i]["author"];
    var content=rdata[i]["content"];
    var rdate=rdata[i]["created_at"].substring(0,10);
    var rating=rdata[i]["author_details"]["rating"]/2;

    if (content.length>470){
      content=content.slice(0,470)+'...';
    }

    var rdiv = document.createElement("div");
    rdiv.innerHTML='<p class="rname">'+name+'</p>\
                     <p class="rdate"> on '+rdate+'</p>\
                     <p class="rting">&#9733;'+rating+'/5</p>\
                     <p style="font-size:12px;">'+content+'</p>\
                     <hr>';
                      
    reviewdiv.appendChild(rdiv);
  }//endfor5


  }//end modal*/

  function exit(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  }

  function allclear(){
    var displaydata=document.getElementById("displaydata");
    displaydata.innerHTML='';
    var ndata='';
    var tbox=document.getElementById("tbox");
    var cate=document.getElementById("category");
    var showres=document.getElementById("showres");
    showres.innerText='';
    tbox.value='';
    cate.value='';

  }