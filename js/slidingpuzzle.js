var slidingpuzzle = {
  point:100,
  //width:null,
  sides:3,
  won:false,
  initPuzzle: function() {
  	var squares= slidingpuzzle.sides*slidingpuzzle.sides;
  	var pieceW = 100/slidingpuzzle.sides;
  	var pieceBGpostInterval = 100/(slidingpuzzle.sides-1);
  	var game=document.getElementById("game");
  	game.style.height=game.offsetWidth+"px";

  	slidingpuzzle.blankpos = Math.floor(Math.random() * squares);

  	//fillpos
  	slidingpuzzle.pos = [];
  	for (var i = 0; i < slidingpuzzle.sides; i++) {
  		//slidingpuzzle.pos.push([Math.floor(i/slidingpuzzle.sides),i%slidingpuzzle.sides]);//one for loop variation
  		for (var j = 0; j < slidingpuzzle.sides; j++) {
  				slidingpuzzle.pos.push([i,j]);
  		}
  		//Can perfectly be places in the addGameNodes loop because their loop length is the same
  	}
  	//

  	addGameNodes();
  	function addGameNodes() {
  		var docFrag = document.createDocumentFragment();
  		for (var i = 0; i < slidingpuzzle.sides; i++) 
  		for (var j = 0; j < slidingpuzzle.sides; j++) {
  			docFrag.appendChild(createGameDiv(i*slidingpuzzle.sides+j));
  			// docFrag.appendChild(createGameDiv(i));//one for loop variation  			
  		}
  		game.appendChild(docFrag);
  	}
  	function createGameDiv(index) {
  		var div = document.createElement("div");
  		div.className = "gameDiv";
  		div.setAttribute("onclick","clck("+index+")");

  		div.style.width=pieceW+"%";
  		div.style.height=pieceW+"%";
  		div.style.backgroundSize=100*slidingpuzzle.sides+"%";

  		div.style.top=  pieceW*Math.floor(index/slidingpuzzle.sides)+"%";
  		div.style.left= pieceW*(index%slidingpuzzle.sides)+"%";

  		div.style.backgroundPosition= 
  			pieceBGpostInterval*(index%slidingpuzzle.sides)+"% "+
  			(pieceBGpostInterval*Math.floor(index/slidingpuzzle.sides))+"%";

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
  pos : null//[//x,y
	// [0,0],
	// [0,1],
	// [0,2],
	// [1,0],
	// [1,1],
	// [1,2],
	// [2,0],
	// [2,1],
	// [2,2]
 //  ]
}