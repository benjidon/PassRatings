/*
PassRatings.js
Authored by Benjamin Don
*/

if (document.getElementById("generateSchedulesBtn")){
	var tables = document.getElementsByClassName("select-course")

	function addTableHead(){
		// Adds the "Polyrating" row to the table head
		var Heads = getTableHeads();

		for (i=0; i<Heads.length; i++){
			Heads[i].insertCell(5);
			Heads[i].children[5].innerHTML = "Polyrating";
			Heads[i].children[5].setAttribute("style","font-weight: bold");
		}

	}

	function addTableColumn(){
		// Adds the Polyrating column to all valid table rows

		var Rows = getTableRows();

		for (i=0; i<Rows.length; i++){
			var columns = Rows[i].children;
			for (j=0; j<columns.length; j++){
				if (columns[j].innerText.indexOf(',') != -1){
					Rows[i].insertCell(j + 1);
					var score = getTeacherScore(columns[j]);
					var result = score.link(getTeacherLink(columns[j]));
					Rows[i].children[j + 1].innerHTML = result;
					Rows[i].children[j + 1].children[0].setAttribute('target','_blank')
					setColor(Rows[i].children[j + 1].children[0]);

					if (getTeacherEvals(columns[j])){

						result = "(" + getTeacherEvals(columns[j]) + " evals" + ")";
						var evals = document.createElement('p');
						evals.innerText = result;
						evals.setAttribute("style","margin-top: 1px; margin-bottom: -1px; margin-left: -1px");

						Rows[i].children[j + 1].appendChild(evals);

						break
					}
				
				}
				
			}
		}
	}

	function getTeacherScore(teacherbox){
		//Given a row, returns the polyscore of its teacher
		professor_name_full = teacherbox.innerText;
		professor_name_split = teacherbox.innerText.split(" ");
		

		if (profdict[professor_name_split[0]]){
			return profdict[professor_name_split[0]][0].toPrecision(3);
		}
		else if (profdict[professor_name_full]){
			return profdict[professor_name_full][0].toPrecision(3);
		}
		else{
			return "No Score Found";
		}

	}

	function getTeacherLink(teacherbox){
		//Given a row, returns the polyscore of its teacher
		professor_name_full = teacherbox.innerText;
		professor_name_split = teacherbox.innerText.split(" ");
		

		if (profdict[professor_name_split[0]]){
			return profdict[professor_name_split[0]][1].slice(6,-1);
		}
		else if (profdict[professor_name_full]){
			return profdict[professor_name_full][1].slice(6,-1);
		}
		else{
			return "http://polyratings.com/list.php";
		}

	}

	function getTeacherEvals(teacherbox){
		//Given a row, returns the polyscore of its teacher
		professor_name_full = teacherbox.innerText;
		professor_name_split = teacherbox.innerText.split(" ");
		

		if (profdict[professor_name_split[0]]){
			return profdict[professor_name_split[0]][2].toString();
		}
		else if (profdict[professor_name_full]){
			return profdict[professor_name_full][2].toString();
			
		}
		else{
			return null;
		}

	}

	function setColor(box){
		//Sets the color of the polyrating depending on how low/high it is
		if (box.innerText == "No Score"){
			box.setAttribute("style","color:Black");
		}

		else if(box.innerText < 1.5){
			box.setAttribute("style","color:Red");
		}

		else if(box.innerText >= 1.5 && box.innerText <= 2.5){
			box.setAttribute("style","color:Orange");
		}
		else if(box.innerText >= 2.5 && box.innerText <= 3){
			box.setAttribute("style","color:#ffd700");
		}
		else if(box.innerText > 3){
			box.setAttribute("style","color:#32CD32");
		}
	}

	function getTableHeads(){
		//Returns all table heads
		var tableHeads = [];

		for (i=0; i<tables.length; i++){

			tableHeads.push(tables[i].children[1].rows[0]);

		}

		return tableHeads;
	}

	function getTableRows(){
		// Returns all table rows
		var tableRows = [];
		whiteRows = document.getElementsByClassName("row-white");
		grayRows = document.getElementsByClassName("row-gray");

		for (i=0; i<whiteRows.length; i++){
			if (whiteRows[i].children.length >= 15){
				tableRows.push(whiteRows[i]);
			}
		}

		for (i=0; i<grayRows.length; i++){
			if (grayRows[i].children.length >= 15){
				tableRows.push(grayRows[i]);
			}
		}

		return tableRows;
	}

	addTableHead();
	addTableColumn();

}

