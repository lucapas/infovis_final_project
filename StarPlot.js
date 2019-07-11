//creo lo StarPlot

var StarPlot =
{
	fun:function(cfd,player1,player2,attribute){
    //metto gli input in variabili apposite
    var allAxis=attribute;
    var players=[player1,player2];



    //creo variabili che mi servono per fare i calcoli della posizione dei vari assi
  	var maxValue = cfg.maxValue;
  	var total = allAxis.length;
  	//console.log(total);
  	var radius = Math.min(cfg.w, cfg.h);
  	var angleSlice = Math.PI * 2 / total;
  	var rScale = d3.scaleLinear()
  		.range([0, radius])
  		.domain([0, maxValue]);

    //mi salvo la posizione finale degli assi che mi calcolo dopo e che mi sarà utile per fare tutti i calcoli succesivi
		var posizione_punti_massimi_assi=[];

    //creo l'svg con grandezze e eventualmente trasposto
    var svg = d3.select("#svgcontainer")
       .append("svg")
       .attr("width", cfg.w*3)
       .attr("height", cfg.h*3)
       .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
       .append("g")
       .attr("transform", "translate(" + (cfg.TranslateX+(cfg.w+cfg.maxValue)) + "," + (cfg.TranslateY+(cfg.h+cfg.maxValue)) + ")");

    //creo gli assi
		var axis = svg.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");
 		axis.append("line")
 			.attr("x1", 0)
 			.attr("y1", 0)
 			.attr("x2", function(d, i){
 		    var temp=rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2);
 		    posizione_punti_massimi_assi[i]={"x":temp,"y":0};
 		    return temp; })
 			.attr("y2", function(d, i){
 		    var temp=rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2);
 		    posizione_punti_massimi_assi[i]["y"]=temp;
 		    return temp; })
 			.attr("class", function(d,i) { return "line line-" + i; })
 		  .attr("number", function(d,i) { return i;})
 			.style("stroke", "black")
 			.style("stroke-width", "2px");

      //creo il testo sopra ogni asse
      axis.append("text")
		  		.attr("class", "legend")
		  		.style("font-size", "11px")
		  		.attr("text-anchor", "middle")
		  		.attr("dy", "0.35em")
		  		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		  		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		  		.text(function(d){return d});

      //creo le linee che mi indicano le varie dimensioni in mezzo
      for(var j=1; j<=cfg.levels; j++){
        var levelFactor = j/cfg.levels;
        svg.selectAll(".levels")
         .data(allAxis)
         .enter()
         .append("svg:line")
         .attr("x1", function(d, i){return posizione_punti_massimi_assi[i]["x"]*levelFactor;})
         .attr("y1", function(d, i){return posizione_punti_massimi_assi[i]["y"]*levelFactor;})
         .attr("x2", function(d, i){
           if(posizione_punti_massimi_assi.length==i+1){
             return posizione_punti_massimi_assi[0]["x"]*levelFactor;
           } else {
             return posizione_punti_massimi_assi[i+1]["x"]*levelFactor;
           }
        })
         .attr("y2", function(d, i){
           if(posizione_punti_massimi_assi.length==i+1){
             return posizione_punti_massimi_assi[0]["y"]*levelFactor;
           } else {
             return posizione_punti_massimi_assi[i+1]["y"]*levelFactor;
           }
           })
         .attr("class", "line")
         .style("stroke", "black")
         .style("stroke-opacity", "0.75")
         .style("stroke-width", "0.3px");
      }

      //Text indicating at what % each level is
      for(var j=1; j<=cfg.levels; j++){
        var levelFactor = j/cfg.levels;
        svg.selectAll(".levels")
         .data([1]) //dummy data
         .enter()
         .append("svg:text")
         .attr("x", function(d){return posizione_punti_massimi_assi[0]["x"]*levelFactor;})
         .attr("y", function(d){return posizione_punti_massimi_assi[0]["y"]*levelFactor;})
         .attr("class", "legend")
         .style("font-family", "sans-serif")
         .style("font-size", "10px")
         .attr("transform", "translate(" + (cfg.ToRight) + ", " + (cfg.ToUp) + ")")
         .attr("fill", "#737373")
         .text(parseInt(levelFactor*100));
      }

      //creo i vari poligoni delle skill delle 2 cose da confrontare, ho fatto una funzione perche al click i poligoni si scambiano
      //series mi serve per variare il colore
      function poligoni(players_conf){
        var series=0
        players_conf.forEach(function(player, x){
      	  svg.selectAll(".area")
      					 .data([player])
      					 .enter()
      					 .append("polygon")
      					 .attr("class", "radar-chart-serie"+series)
      					 .style("stroke-width", "2px")
      					 .style("stroke", cfg.color(series))
      					 .attr("points",function(d,i){
                    var str="";
                    for(var pti=0;pti<d.length;pti++){
                      var val1=player[pti].value
             					//la if serve per non sforare l'ultimo elemento
             					if(posizione_punti_massimi_assi.length==pti+1){
                        var val2=player[0].value
             						str= str+ posizione_punti_massimi_assi[pti]["x"]*val1/100+","+posizione_punti_massimi_assi[pti]["y"]*val1/100+" "+posizione_punti_massimi_assi[0]["x"]*val2/100+","+posizione_punti_massimi_assi[0]["y"]*val2/100+" ";
             					}
             					else{
                        var val2=player[pti+1].value
             						str=str+ posizione_punti_massimi_assi[pti]["x"]*val1/100+","+posizione_punti_massimi_assi[pti]["y"]*val1/100+" "+posizione_punti_massimi_assi[pti+1]["x"]*val2/100+","+posizione_punti_massimi_assi[pti+1]["y"]*val2/100+" ";
             					}
                    }
                    return str
           				})
      					 .style("fill", function(j, i){return cfg.color(series)})
      					 .style("fill-opacity", cfg.opacityArea)
      					 .on('mouseover', function (d){
      										z = "polygon."+d3.select(this).attr("class");
      										svg.selectAll("polygon")
      										 .transition(200)
      										 .style("fill-opacity", 0.1);
      										svg.selectAll(z)
      										 .transition(200)
      										 .style("fill-opacity", .7);
      									  })
      					 .on('mouseout', function(){
      										svg.selectAll("polygon")
      										 .transition(200)
      										 .style("fill-opacity", cfg.opacityArea);
      					 })
                 .on("click", function(d,i){
           					d3.select(".radar-chart-serie0").remove();
                    d3.select(".radar-chart-serie1").remove();
                    var players_invert=[players_conf[1],players_conf[0]];
                    poligoni(players_invert);
                });
      	  series++;
      	});
      }
      poligoni(players);
	}
}
