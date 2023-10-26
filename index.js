// NAVBAR

function openNav(){
    document.getElementById('nav-mySidenav').style.width = "250px"
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
  document.getElementById("nav-mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}


// // SEARCH 
// var model = document.getElementById('home-model');
// var btn = document.getElementById('home-nav-btn');
// var span = document.getElementById('model-close');

// span.onclick  = function(){
//     model.style.display = "none";
// }
   
// function handelSearch(){
//     model.style.display = "block";
// }

// // When the user click the outside of the model
// window.onclick = function(event) {
//     if(event.target == model){
//         model.style.display = "none";
//     }
// }

const xValues_point = [50,60,70,80,90,100,110,120,130,140,150];
const yValues_point = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart-pointer", {
  type: "line",
  data: {
    labels: xValues_point,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues_point
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

var xValues_bar = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues_bar = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart-bar", {
  type: "bar",
  data: {
    labels: xValues_bar,
    datasets: [{
      backgroundColor: barColors,
      data: yValues_bar
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
const data = google.visualization.arrayToDataTable([
  ['Contry', 'Mhl'],
  ['Italy',54.8],
  ['France',48.6],
  ['Spain',44.4],
  ['USA',23.9],
  ['Argentina',14.5]
]);

const options = {
  title:'World Wide Wine Production',
  is3D:true
};

const chart = new google.visualization.PieChart(document.getElementById('home-pie-chart-id'));
  chart.draw(data, options);
}

const xArray = [50,60,70,80,90,100,110,120,130,140,150];
const yArray = [7,8,8,9,9,9,10,11,14,14,15];

// Define Data
const data = [{
  x: xArray,
  y: yArray,
  mode:"lines"
}];

// Define Layout
const layout = {
  xaxis: {range: [40, 160], title: "Square Meters"},
  yaxis: {range: [5, 16], title: "Price in Millions"},  
  title: "House Prices vs. Size"
};

// Display using Plotly
Plotly.newPlot("home-line-chart-id", data, layout);



// ACCORDIAN

const accordian = document.getElementsByClassName('hr-accordian-contextbox')

for(let i=0; i<accordian.length; i++){
    accordian[i].addEventListener('click',function(){
        this.classList.toggle('active')
    })
}