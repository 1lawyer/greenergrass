var selected = {}

var alldata = {}

var isdoc = false

soap.forEach(element => {
  alldata[element.name] = null
});

soap.forEach((element, index) => {
  if (window.location.href.split("?")[1]) {
  if(`document=${encodeURIComponent(element.name.toLowerCase())}&search=${encodeURIComponent(element.name.toLowerCase())}` === window.location.href.split("?")[1].toLowerCase()) {
    console.log("egg")
    selected = element
    document.getElementById("card-title").innerHTML = selected.name
    selected.desc.map(a => {
      document.getElementById("card-content").innerHTML = `${document.getElementById("card-content").innerHTML}${a.content}<br/><br/>`
      document.getElementById("card-sources").innerHTML = `${document.getElementById("card-sources").innerHTML}<a href="${a.source}">Source</a> `
    });
    isdoc = true
  } else if ((soap.length-1) === index && isdoc === false) {
    window.location.href = `./index.html`;
    if (document.location.href.split('/')[document.location.href.split('/').length - 1] === 'index.html') {
      selected = soap.find(element => element.name = "Ampol")
    }
  }
  if (document.location.href.split('/')[document.location.href.split('/').length - 1] === 'index.html') {
    selected = soap.find(element => element.name = "Ampol")
  }
}
});

if (document.location.href.split('/')[document.location.href.split('/').length - 1] === 'index.html') {
  selected = soap.find(element => element.name = "Ampol")
}

jQuery(function($){
var tags =[];

$('.chips-autocomplete').chips({
autocompleteOptions: {
data: alldata,
limit: Infinity,
minLength: 1,
},
placeholder: 'Search',
secondaryPlaceholder: '',
onChipAdd: function(e, chip){
  window.location.href = `./doc.html?document=${chip.childNodes[0].textContent}&search=${chip.childNodes[0].textContent}`;
},
onChipDelete: function(e, chip){
    var item = chip.childNodes[0].textContent;
    tags = $.grep(tags, function(value) {
        return value != item;
    });
    $('#tags').val(tags);
}
});
});

/* Set radius for all circles */
var r = 250;
var circles = document.querySelectorAll('.circle');
var total_circles = circles.length;
for (var i = 0; i < total_circles; i++) {
    circles[i].setAttribute('r', r);
}

/* Set meter's wrapper dimension */
var meter_dimension = (r * 2) + 100;
var wrapper = document.getElementById("wrapper");
//wrapper.style.width = meter_dimension + "px";
//wrapper.style.height = meter_dimension + "px";

/* Add strokes to circles  */
var cf = 2 * Math.PI * r;
var semi_cf = cf / 2;
var semi_cf_1by3 = semi_cf / 3;
var semi_cf_2by3 = semi_cf_1by3 * 2;
document.querySelector("#outline_curves")
    .setAttribute("stroke-dasharray", semi_cf + "," + cf);
document.querySelector("#low")
    .setAttribute("stroke-dasharray", semi_cf + "," + cf);
document.querySelector("#avg")
    .setAttribute("stroke-dasharray", semi_cf_2by3 + "," + cf);
document.querySelector("#high")
    .setAttribute("stroke-dasharray", semi_cf_1by3 + "," + cf);
document.querySelector("#outline_ends")
    .setAttribute("stroke-dasharray", 2 + "," + (semi_cf - 2));
document.querySelector("#mask")
    .setAttribute("stroke-dasharray", semi_cf + "," + cf);

/* Bind range slider event*/
var mask = document.querySelector("#mask");
var meter_needle =  document.querySelector("#meter_needle");

var percent = selected.rate;
var meter_value = semi_cf - ((percent * semi_cf) / 100);
mask.setAttribute("stroke-dasharray", meter_value + "," + cf);
