var slidingpuzzle = {
  point:100,
  pieces:null,
  pos :  null,
  blankpos :-1,
  //width:null,
  sides:3,
  won:false,
  initPuzzle: function() {
  	var squares= slidingpuzzle.sides*slidingpuzzle.sides;
  	var pieceW = 100/slidingpuzzle.sides;
  	var pieceBGpostInterval = 100/(slidingpuzzle.sides-1);
  	var game=document.getElementById("game");
  	game.style.height=game.offsetWidth+"px";

  	slidingpuzzle.blankpos = squares-1;

  	slidingpuzzle.pos = range(squares);

  	do{
  		slidingpuzzle.pos.shuffle()
  	}while(!PosSolvable());
	//6,1,10,2,7,11,4,14,5,16,9,15,8,12,13,3//solvable
	//1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16//not solvable

	//*convert single array to 2dim array*
	// for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
	// 	slidingpuzzle.pos[i] = [
	// 	  Math.floor(slidingpuzzle.pos[i]/slidingpuzzle.sides),
	// 	  slidingpuzzle.pos[i]%slidingpuzzle.sides
	// 	];
	// 	if(slidingpuzzle.pos[i] === slidingpuzzle.blankpos) slidingpuzzle.blankpos=i;
	// }

  	addGameNodes();

  	slidingpuzzle.pieces = document.getElementsByClassName("gameDiv");

  	for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  		slidingpuzzle.piecesCSS(slidingpuzzle.pieces[slidingpuzzle.pos[i]],i);
  	}


  	function addGameNodes() {
  		var docFrag = document.createDocumentFragment();
  		for (var i = 0; i < squares; ++i) {
  			docFrag.appendChild(createGameDiv(i)); 			  		
  		}
  		game.appendChild(docFrag);
  	}
  	function createGameDiv(index) {
  		var div = document.createElement("div");
  		div.className = "gameDiv";
  		div.setAttribute("onclick","slidingpuzzle.clck("+index+")");

  		div.style.width=pieceW+"%";
  		div.style.height=pieceW+"%";
  		div.style.backgroundSize=100*slidingpuzzle.sides+"%";  		

  		div.style.backgroundPosition= 
  			pieceBGpostInterval*(index%slidingpuzzle.sides)+"% "+
  			(pieceBGpostInterval*Math.floor(index/slidingpuzzle.sides))+"%";

  		if(index===slidingpuzzle.blankpos)div.id="gameDivMissing";
  		return div;
  	}
  	function PosSolvable() {//checking for puzzles with an even grid is still a problem
  		//logic from: 
  		//https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
  		var inversions=0,
  			blankposindex;
  		for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  			for (var j = i+1; j < slidingpuzzle.pos.length; ++j) {
  				if(slidingpuzzle.pos[i]===slidingpuzzle.blankpos){ 
  					blankposindex = i++;
  				}else if(slidingpuzzle.pos[i]>slidingpuzzle.pos[j]){
  					++inversions;
  				}
  			}
  		}
  		//return inversions%2==((slidingpuzzle.sides%2==1)?0:blankposindex%slidingpuzzle.sides%2);//does the same thing
  		if(slidingpuzzle.sides%2==1){
  			return inversions%2==0;
  		}else{
  			var rowFromTop = blankposindex%slidingpuzzle.sides;
  			return rowFromTop%2==inversions%2;
  		}  		
  	}
  },
  piecesCSS: function (piece, index) {
  	piece.style.top=  100/slidingpuzzle.sides*Math.floor(index/slidingpuzzle.sides)+"%";
  	piece.style.left= 100/slidingpuzzle.sides*(index%slidingpuzzle.sides)+"%";
  },
  pointCounter: function() {
  
  },
  clck: function(index) {
  	var posIndex   = slidingpuzzle.pos.indexOf(index);
  	var blankIndex = slidingpuzzle.pos.indexOf(slidingpuzzle.blankpos);
  	swap();
  	function swap() {
  		slidingpuzzle.pos.swap(posIndex, blankIndex);
  		slidingpuzzle.piecesCSS(slidingpuzzle.pieces[index],blankIndex);
  	}
  	function checkSwap() {
  		
  	}
  	function check4Win() {
  		
  	}
  }
}