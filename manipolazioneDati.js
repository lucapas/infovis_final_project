var cfg = {
 w: 300,
 h: 300,
 TranslateX: 0,
 TranslateY: 0,
 maxValue: 100,
 radians: 2 * Math.PI,
 levels: 10, //numero di cerchi
 ToRight: 5, //distanza a destra dell'unità sui cerchi
 ToRight: -1, //distanza sotto dell'unità sui cerchi
 labelFactor: 1.25, //distanza del nome dell'asse
 color: d3.scaleOrdinal(d3.schemeCategory10),
 opacityArea: 0.5, //opacità dei poligoni
};


d3.csv("data.csv", function(data) {
  attribute=["difesa","centrocampista","attaccante"]
  var player1=[];
  //delete player['age'];

  player1.push({axis:"attaccante",value:85});
  player1.push({axis:"difensore",value:85});
  player1.push({axis:"centrocampista",value:85});

  //delete player['age'];
  var player2=[];
  player2.push({axis:"attaccante",value:60});
  player2.push({axis:"difensore",value:60});
  player2.push({axis:"centrocampista",value:60});

  StarPlot.fun(cfg,player1,player2,attribute);
})

function handleClick(event){
  d3.csv("data.csv", function(data) {
    d3.selectAll("svg").remove();
    attribute=["difesa","centrocampista","attaccante"]
    var player1=[];
    //delete player['age'];

    player1.push({axis:"attaccante",value:85});
    player1.push({axis:"difensore",value:85});
    player1.push({axis:"centrocampista",value:85});

    //delete player['age'];
    var player2=[];
    player2.push({axis:"attaccante",value:60});
    player2.push({axis:"difensore",value:document.getElementById("myVal").value});
    player2.push({axis:"centrocampista",value:60});

    StarPlot.fun(cfg,player1,player2,attribute);
  })
  console.log(document.getElementById("myVal").value);
  return false;
}
