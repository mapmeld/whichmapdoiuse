
var options = {
  "Google Static Maps API": {
    name: "Google Static Maps API",
    url: "https://developers.google.com/maps/documentation/staticmaps/"
  },
  "Google Maps API": {
    name: "Google Maps API (JavaScript, V3)",
    url: "https://developers.google.com/maps/documentation/javascript/"
  },
  "Bing Maps API": {
    name: "Bing Maps AJAX API",
    url: "http://msdn.microsoft.com/en-us/library/gg427610.aspx"
  },
  "Fusion Tables": {
    name: "Google Fusion Tables",
    url: "http://www.google.com/drive/apps.html#fusiontables"
  },
  "D3": {
    name: "D3.js",
    url: "http://d3js.org"
  },
  "Leaflet": {
    name: "Leaflet.js",
    url: "http://leafletjs.com"
  }
};

var questionflow = {
  question: "Is your map static or interactive?",
  options: [
    {
      option: "static",
      answer: options["Google Static Maps API"]
    },
    {
      option: "interactive",
      question: "Does your map need StreetView, Satellite Maps outside of the US, Directions, User-entered Addresses, or KML data?",
      options: [
        {
          option: "yes",
          answer: options["Google Maps API"]
        },
        {
          option: "no",
          question: "Does your map need imagery at a 45-degree angle? This is widely available in the US.",
          options: [
            {
              option: "yes",
              answer: options["Bing Maps API"]
            },
            {
              option: "no",
              question: "Does your data include hundreds of rows with addresses but without coordinates?",
              options: [
                {
                  option: "yes",
                  answer: options["Fusion Tables"],
                  addons: [
                    {
                      addon: "Use the Google Maps API to add functionality to your Fusion Table",
                      url: "https://developers.google.com/maps/documentation/javascript/layers#FusionTables"
                    },
                    {
                      addon: "Use the Fusion Tables OAuth API to directly query, update, and delete rows of the Fusion Table",
                      url: "https://developers.google.com/fusiontables/docs/v1/getting_started"
                    }
                  ]
                },
                {
                  option: "no",
                  question: "Is your map primarily a dynamic choropleth map, data visualization, or unusual projection?",
                  options: [
                    {
                      option: "yes",
                      answer: options["D3"],
                      addons: [
                        {
                          addon: "add large GeoJSON layers using TopoJSON",
                          url: "https://github.com/mbostock/topojson/wiki"
                        }
                      ]
                    },
                    {
                      option: "no",
                      answer: options["Leaflet"],
                      addons: [
                        {
                          addon: "add MapBox layers (including MapBox Satellite)",
                          url: "https://www.mapbox.com/mapbox.js/"
                        },
                        {
                          addon: "create your own basemap with TileMill",
                          url: "https://www.mapbox.com/tilemill/"
                        },
                        {
                          addon: "add CartoDB layers",
                          url: "http://developers.cartodb.com/documentation/cartodb-js.html"
                        },
                        {
                          addon: "add Esri MapServer and FeatureServer layers",
                          url: "http://esri.github.io/esri-leaflet/"
                        },
                        {
                          addon: "add large GeoJSON layers using TopoJSON",
                          url: "https://github.com/mbostock/topojson/wiki"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

function askQuestion(root){
  var question = "";
  if(typeof root.question != "undefined" && root.question){
    question += "<h3>" + root.question + "</h3><ul>";
    for(var i=0;i<root.options.length;i++){
      var option = "";
      if(typeof root.options[i].answer != "undefined" && root.options[i].answer){
        option = "<li><a href='#' onclick='showAnswer(" + JSON.stringify( root.options[i] ) + ")'>";
      }
      else{
        option = "<li><a href='#' onclick='askQuestion(" + JSON.stringify( root.options[i] ) + ")'>";      
      }
      option += root.options[i].option + "</a></li>";
      question += option;
    }
    question += "</ul>";
  }
  $("#question").html( question );
}

function showAnswer(root){
  var answer = "<h3>You should be using <a href='" + root.answer.url + "'>" + root.answer.name + "</a></h3>";
  if(typeof root.addons != "undefined" && root.addons && typeof root.addons.length){
    answer += "<p>You might want to:</p><ul>";
    for(var i=0;i<root.addons.length;i++){
      answer += "<li><a href='" + root.addons[i].url + "'>" + root.addons[i].addon + "</a></li>";
    }
    answer += "</ul>";
  }
  $("#question").html( answer );
}

askQuestion(questionflow);