<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
<script type="text/javascript">
	const Map_Size = 10;
	const NumberOfPlayers = 5;
	const XValues = "ABCDEFGHIJ";
	const YValues = "0123456789";

	const PortAvion = 1;
	const PortAvionSize = 5;

	const Croiseur = 2;
	const CroiseurSize = 4;

	const ContreTorpilleur = 3;
	const ContreTorpilleurSize = 3;

	const SousMarin = 4;
	const SousMarinSize = 3;

	const Torpilleur = 5;
	const TorpilleurSize = 2;


	let Players = [ [PortAvion, PortAvionSize], [Croiseur, CroiseurSize], [ContreTorpilleur, ContreTorpilleurSize], [SousMarin, SousMarinSize], [Torpilleur, TorpilleurSize]];

	var ShipsSizeToKill = PortAvionSize+CroiseurSize+ContreTorpilleurSize+SousMarinSize+TorpilleurSize;



function init_html_table() {

		var tab = '<table border=1> <tr><th></th>';
		//create table header 
		for (var i = 0; i < 10; i++) {
			tab+='<th>'+XValues[i]+'</th>';
		}
		tab+='</tr>';

		//create table body
		for (var i = 0; i < 10; i++) {
			tab+='<tr><td>'+YValues[i]+'</td>';
			for (var j = 0; j < 10; j++) {
				tab+= '<td id="'+XValues[j]+YValues[i]+'"><button type="button" onclick="Kill(\''+XValues[j]+'\',\''+YValues[i]+'\')">0</button></td>';
			}

			tab+='</tr>'
		}


		tab+='</table>';

		document.getElementById('tab').innerHTML=tab;
	}

	

	//create table and init to 0
	function zeros(dimensions) {
	    var array = [];

	    for (var i = 0; i < dimensions[0]; ++i) {
	        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
	    }

	    return array;
	}

	let Map = zeros([10, 10]); 
	let AttackedMap = zeros([10, 10]);


	//Initiate Map
	function InitiateMap(){
		for (var i=0;i<NumberOfPlayers;i++){
			var Done = false;
			var CurrentPlayer = Players[i][0];
			var CurrentPlayerSize = Players[i][1];
			while (!Done){
				
				var RandomX = Math.floor(Math.random() * Map_Size);
				var RandomY = Math.floor(Math.random() * Map_Size);
				
				//System.out.println(RandomX+" | "+RandomY+" -> "+CurrentPlayer);
				if(Map[RandomX][RandomY] == 0){
					var valid = true;
					try{
						for (var j=1;j<=CurrentPlayerSize;j++){
							//Direction "LEFT" 
							if (Map[RandomX][RandomY-j] != 0) {
								valid = false;
								break;
							}
						}
						if (valid) {
							for (var j=0;j<CurrentPlayerSize;j++){
								//Direction "LEFT" 
								Map[RandomX][RandomY-j] = CurrentPlayer;
							}
						}
						
						Done = true;
					}catch(e){
						;
					}

					if (!valid) {
						try{
							valid = true;
							for (var j=1;j<=CurrentPlayerSize;j++){
								//Direction "RIGHT" 
								if (Map[RandomX][RandomY+j] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (var j=0;j<CurrentPlayerSize;j++){
									//Direction "RIGHT" 
									Map[RandomX][RandomY+j] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(e){
							;
						}

					}

					if (!valid) {
						try{
							valid = true;
							for (var j=1;j<=CurrentPlayerSize;j++){
								//Direction "UP" 
								if (Map[RandomX+j][RandomY] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (var j=0;j<CurrentPlayerSize;j++){
									//Direction "UP" 
									Map[RandomX+j][RandomY] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(e){
							;
						}

					}

					if (!valid) {
						try{
							valid = true;
							for (var j=0;j<=CurrentPlayerSize;j++){
								//Direction "DOWN" 
								if (Map[RandomX-j][RandomY] != 0) {
									valid = false;
									break;
								}
							}
							if (valid) {
								for (var j=1;j<CurrentPlayerSize;j++){
									//Direction "UP" 
									Map[RandomX-j][RandomY] = CurrentPlayer;
								}
							}
							Done = true;
						}catch(e){
							;
						}
					}
				}
			}
		}
	}

	function Kill(x, y){
		var XIndex = XValues.indexOf(x);
		var YIndex = YValues.indexOf(y);
		console.log(Map);
		if ((XIndex == -1) || (YIndex == -1)) {
			alert("Please Enter A Valid Postion (Example A0)");
		}else{
			//System.out.println(XIndex+"  |  "+YIndex);
			if (Map[YIndex][XIndex] == -1) {
				alert("Position Already Attacked");
			}else if (Map[YIndex][XIndex] == 0) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				document.getElementById(x+y).style.backgroundColor='#0000FF';
				document.getElementById('Notification').innerHTML='<h2>You Hited Nothing</h2>';
			}else if (Map[YIndex][XIndex] == 1) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					document.getElementById('WinNotification').innerHTML='<h2>You Won!!</h2> <button onClick="window.location.reload();">Play Again ?</button>';
					alert("You Won!!");
				}
				document.getElementById(x+y).style.backgroundColor ='#FF0000';
				document.getElementById('Notification').innerHTML='<h2>You Hited Porte-Avion</h2>';
			}else if (Map[YIndex][XIndex] == 2) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					document.getElementById('WinNotification').innerHTML='<h2>You Won!!</h2> <button onClick="window.location.reload();">Play Again ?</button>';
					alert("You Won!!");
				}
				document.getElementById(x+y).style.backgroundColor ='#FF0000';
				document.getElementById('Notification').innerHTML='<h2>You Hited Croiseur</h2>';
			}else if (Map[YIndex][XIndex] == 3) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					document.getElementById('WinNotification').innerHTML='<h2>You Won!!</h2> <button onClick="window.location.reload();">Play Again ?</button>';
					alert("You Won!!");
				}
				document.getElementById(x+y).style.backgroundColor ='#FF0000';
				document.getElementById('Notification').innerHTML='<h2>You Hited Contre-Torpilleur</h2>';
			}else if (Map[YIndex][XIndex] == 4) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					document.getElementById('WinNotification').innerHTML='<h2>You Won!!</h2> <button onClick="window.location.reload();">Play Again ?</button>';
					alert("You Won!!");
				}
				document.getElementById(x+y).style.backgroundColor ='#FF0000';
				document.getElementById('Notification').innerHTML='<h2>You Hited Sous-Marin</h2>';
			}else if (Map[YIndex][XIndex] == 5) {
				Map[YIndex][XIndex] = -1;
				AttackedMap[YIndex][XIndex] = -1;
				ShipsSizeToKill -= 1;
				if(ShipsSizeToKill == 0){
					document.getElementById('WinNotification').innerHTML='<h2>You Won!!</h2> <button onClick="window.location.reload();">Play Again ?</button>';
					alert("You Won!!");

				}
				document.getElementById(x+y).style.backgroundColor ='#FF0000';
				document.getElementById('Notification').innerHTML='<h2>You Hited Torpilleur</h2>';
			}
		}
	}	




</script>
</head>
<body>
	<div id="WinNotification"></div>
	<div id="tab"></div>
	<div id="Notification"></div>

</body>

<script type="text/javascript">
	init_html_table();
	InitiateMap();
	console.log(Map);


</script>
</html>
