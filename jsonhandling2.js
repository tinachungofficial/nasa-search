
var myStorage = window.localStorage;
var numOfQueries = 0;
var button = document.getElementById("submitText");
var display1 = document.getElementById("display");

button.addEventListener('click', function() {
  document.getElementById("searchLoader").hidden=false;
  var sectionList = document.getElementsByClassName("py-5 delete-me");
  var imgList = document.getElementsByClassName("py-5 delete-me bg-image-full");
  while(sectionList.length > 0) {
    console.log("removing: " + sectionList[0]);
    document.body.removeChild(sectionList[0]);
  } 
  while(imgList.length > 0) {
    console.log("removing: " + imgList[0]);
    document.body.removeChild(imgList[0]);
  } 
  var search = document.getElementById("userInput").value;
  if(search == null || search == '') {
    searchNASA();
  } else {
    myStorage.setItem(search,search);
    document.getElementById("historyBanner").hidden=false;
    var newSearch = document.createElement('li');
    newSearch.innerHTML = search;
    document.getElementById("history").appendChild(newSearch);
    searchNASA(search);
  }
});

function searchNASA(query_str = "apollo") {
  fetch('https://images-api.nasa.gov/search?q=' + query_str)
  .then(function(response) {
    if(response.status == 200) {
      localStorage.setItem(''+numOfQueries,query_str);
      numOfQueries += 1;
      return response.json();
    }
    else if(response.status == 400) {

    } else if(response.status == 404) {

    } else if(response.status >= 500) {

    } else {

    }
  })
  .then(function(json) {
    console.log(json);
    var loading = document.getElementById("loading");
    processItems(json.collection.items);
    document.getElementById("searchLoader").hidden=true;
  })
}
  
function processItems(items_json_arr) {
  var total = (items_json_arr.length < 100) ? items_json_arr.length : 100;
  for(var i = 0; i < total; i++) {
    display(items_json_arr[i]);
  }
}

function display(obj) {
   if(obj == null || obj.links == null || obj.links.length <= 0) {
     return;
   }
   let href = obj.links[0].href;
   console.log(href);
   console.log(obj.data);
   let {media_type,title,description} = obj.data[0];
   console.log(media_type);
   console.log(title);
   console.log(description);
   if(media_type == "image") {
     var text = `${title}`;
     console.log(text);
     
     var newImageSection = document.createElement('section');
     newImageSection.className = "py-5 delete-me bg-image-full";
     newImageSection.style = "background-image: url('"+href+"');"
     
     var styleDiv = document.createElement('div');
     styleDiv.style = "height: 200px;";
     newImageSection.appendChild(styleDiv);

     var newContentSection = document.createElement('section');
     newContentSection.className="py-5 delete-me";

     var containerDiv = document.createElement('div');
     containerDiv.className = "container";
     newContentSection.appendChild(containerDiv);
     var newHeader = document.createElement('h1');
     newHeader.innerHTML = text;
     newContentSection.appendChild(newHeader);

     var footerList = document.getElementsByTagName('footer');
     console.log(footerList);
     
     document.body.insertBefore(newImageSection, footerList[0]);
     document.body.insertBefore(newContentSection, footerList[0]);
   }
}

  
  
