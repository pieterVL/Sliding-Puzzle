var slidingpuzzle = {
  point:100,
  //width:null,
  sides:3,
  won:false,
  initPuzzle: function() {
  	var squares= slidingpuzzle.sides*slidingpuzzle.sides;
  	var pieceW = 100/slidingpuzzle.sides;
  	var pieceBGpostInterval = 100/(slidingpuzzle.sides+1);
  	var game=document.getElementById("game");
  	game.style.height=game.offsetWidth+"px";

  	slidingpuzzle.blankpos = Math.floor(Math.random() * squares);

  	addGameNodes();
  	function addGameNodes() {
  		var docFrag = document.createDocumentFragment();
  		for (var i = 0; i < squares; i++) {
  			docFrag.appendChild(createGameDiv(i));
  		}
  		game.appendChild(docFrag);
  	}
  	function createGameDiv(index) {
  		var div = document.createElement("div");
  		div.className = "gameDiv";
  		div.setAttribute("onclick","clck("+index+")");

  		div.style.width=pieceW+"%";
  		div.style.height=pieceW+"%";
  		div.style.backgroundSize=100*slidingpuzzle.sides+"% 300%";

  		div.style.top=  pieceW*Math.floor(index/slidingpuzzle.sides)+"%";
  		div.style.left= pieceW*(index%slidingpuzzle.sides)+"%";

  		// div.style.backgroundPosition= 
  		// 	pieceBGpostInterval*(index%slidingpuzzle.sides)+"% "+
  		// 	(pieceBGpostInterval*Math.floor(index/slidingpuzzle.sides))+"%";
  		console.log(pieceW*Math.floor(index/slidingpuzzle.sides)+"%");
  		console.log(pieceW*(index%slidingpuzzle.sides)+"%");

  		if(index===slidingpuzzle.blankpos)div.id="gameDivMissing";
  		return div;
  	}
  },
  pointCounter: function() {
  
  },
  getNumber: function() {
  
  },
  check4Win: function () {
  
  },
  checkSwap: function () {
  
  },
  
  swap: function (index) {

  },
  clck: function() {
  
  },
  blankpos :-1,//dummy
  pos : [//x,y
	[0,0],
	[0,1],
	[0,2],
	[1,0],
	[1,1],
	[1,2],
	[2,0],
	[2,1],
	[2,2]
  ],
  pieces : [
	// {"top": scope.pos[0][0]*100/3 +"%", "left": scope.pos[0][1]*100/3 +"%", "background-position": scope.pos[0][1]*50+"%"+" "+scope.pos[0][0]*50+"%"},
	// {"top": scope.pos[1][0]*100/3 +"%", "left": scope.pos[1][1]*100/3 +"%", "background-position": scope.pos[1][1]*50+"%"+" "+scope.pos[1][0]*50+"%"},
	// {"top": scope.pos[2][0]*100/3 +"%", "left": scope.pos[2][1]*100/3 +"%", "background-position": scope.pos[2][1]*50+"%"+" "+scope.pos[2][0]*50+"%"},
	// {"top": scope.pos[3][0]*100/3 +"%", "left": scope.pos[3][1]*100/3 +"%", "background-position": scope.pos[3][1]*50+"%"+" "+scope.pos[3][0]*50+"%"},
	// {"top": scope.pos[4][0]*100/3 +"%", "left": scope.pos[4][1]*100/3 +"%", "background-position": scope.pos[4][1]*50+"%"+" "+scope.pos[4][0]*50+"%"},
	// {"top": scope.pos[5][0]*100/3 +"%", "left": scope.pos[5][1]*100/3 +"%", "background-position": scope.pos[5][1]*50+"%"+" "+scope.pos[5][0]*50+"%"},
	// {"top": scope.pos[6][0]*100/3 +"%", "left": scope.pos[6][1]*100/3 +"%", "background-position": scope.pos[6][1]*50+"%"+" "+scope.pos[6][0]*50+"%"},
	// {"top": scope.pos[7][0]*100/3 +"%", "left": scope.pos[7][1]*100/3 +"%", "background-position": scope.pos[7][1]*50+"%"+" "+scope.pos[7][0]*50+"%"},
	// {"top": scope.pos[8][0]*100/3 +"%", "left": scope.pos[8][1]*100/3 +"%", "background-position": scope.pos[8][1]*50+"%"+" "+scope.pos[8][0]*50+"%"}
  ],
  piecesPosUpdate : function () {
	// console.log('pos_updated');
	// //#hardCoded
	// scope.pieces[0].top = scope.pos[0][0]*100/3+"%"; scope.pieces[0].left = scope.pos[0][1]*100/3+"%";
	// scope.pieces[1].top = scope.pos[1][0]*100/3+"%"; scope.pieces[1].left = scope.pos[1][1]*100/3+"%";
	// scope.pieces[2].top = scope.pos[2][0]*100/3+"%"; scope.pieces[2].left = scope.pos[2][1]*100/3+"%";
	// scope.pieces[3].top = scope.pos[3][0]*100/3+"%"; scope.pieces[3].left = scope.pos[3][1]*100/3+"%";
	// scope.pieces[4].top = scope.pos[4][0]*100/3+"%"; scope.pieces[4].left = scope.pos[4][1]*100/3+"%";
	// scope.pieces[5].top = scope.pos[5][0]*100/3+"%"; scope.pieces[5].left = scope.pos[5][1]*100/3+"%";
	// scope.pieces[6].top = scope.pos[6][0]*100/3+"%"; scope.pieces[6].left = scope.pos[6][1]*100/3+"%";
	// scope.pieces[7].top = scope.pos[7][0]*100/3+"%"; scope.pieces[7].left = scope.pos[7][1]*100/3+"%";
	// scope.pieces[8].top = scope.pos[8][0]*100/3+"%"; scope.pieces[8].left = scope.pos[8][1]*100/3+"%";
  }
}