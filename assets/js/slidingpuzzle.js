var slidingpuzzle = {
  maxPoint:100,
  point:0,
  pieces:null,
  pos :  null,
  blankpos :-1,
  gamesplayed:0,
  timesWon:0,
  sides:3,
  over:false,
  initPuzzle: function() {
  	slidingpuzzle.point=slidingpuzzle.maxPoint;    
    document.getElementById('slpoint').innerHTML=slidingpuzzle.maxPoint;
  	var squares= slidingpuzzle.sides*slidingpuzzle.sides;
  	var pieceW = 100/slidingpuzzle.sides;
  	var pieceBGpostInterval = 100/(slidingpuzzle.sides-1); //not the geatest name, I know.
  	var game=document.getElementById("game");
  	game.style.height=game.offsetWidth+"px";

  	if(slidingpuzzle.over) slidingpuzzle.invertBtns();
  	slidingpuzzle.over=false;

  	slidingpuzzle.blankpos = squares-1;

  	slidingpuzzle.pos = range(squares);

  	do{
  		slidingpuzzle.pos.shuffle()
  	}while(!PosSolvable());
	//6,1,10,2,7,11,4,14,5,16,9,15,8,12,13,3//solvable
	//1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16//not solvable

  	addGameNodes();

  	slidingpuzzle.pieces = document.getElementsByClassName("gameDiv");
  		
  	for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  		if(slidingpuzzle.pos[i]===slidingpuzzle.blankpos)slidingpuzzle.piecesCSS(slidingpuzzle.pieces[slidingpuzzle.blankpos],slidingpuzzle.blankpos);
  		else slidingpuzzle.piecesCSS(slidingpuzzle.pieces[slidingpuzzle.pos[i]],i);
  	}  	

  	slidingpuzzle.pointCounter(++slidingpuzzle.gamesplayed);

  	function addGameNodes() {
      game.innerHTML="";
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
  pointCounter: function(gamesplayed) {
  	setTimeout(function(){
  		if(!slidingpuzzle.over)
      if(gamesplayed === slidingpuzzle.gamesplayed)
  		if(slidingpuzzle.point!==0)
  		{
  			document.getElementById('slpoint').innerHTML = --slidingpuzzle.point;
  			document.getElementById('counterBar').style.width = slidingpuzzle.point/slidingpuzzle.maxPoint*100+"%";
  			slidingpuzzle.pointCounter(gamesplayed);
  		}else{
  			slidingpuzzle.invertBtns();
  			slidingpuzzle.over=true;
  		}
  	}, 1001);

  },
  clck: function(index) {
  	if(!slidingpuzzle.over){
  	var posIndex   = slidingpuzzle.pos.indexOf(index);
  	var blankIndex = slidingpuzzle.pos.indexOf(slidingpuzzle.blankpos);

  	if(checkSwap())swap();
  	if(check4Win()){
  		slidingpuzzle.over=true;
    ++slidingpuzzle.timesWon;
      slidingpuzzle.invertBtns();
  		document.getElementById('gameDivMissing').style.visibility="visible";

  	}

  	function swap() {
  		slidingpuzzle.pos.swap(posIndex, blankIndex);
  		slidingpuzzle.piecesCSS(slidingpuzzle.pieces[index],blankIndex);
  	}
  	function checkSwap() {
  		var p1 = Math.abs(Math.floor(posIndex/slidingpuzzle.sides) - Math.floor(blankIndex/slidingpuzzle.sides));
		var p2 = Math.abs(posIndex%slidingpuzzle.sides - blankIndex%slidingpuzzle.sides);
		if(p1 > 1 || p2 > 1) return false;
		if(p1 !== p2)
		{			
			return true;
		}
		return false;
  	}
  	function check4Win() {
  		for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  			if(i!==slidingpuzzle.pos[i]) return false;
  		}
  		return true;
  	}
  	}
  },
  invertBtns: function () {
  	var btns=document.getElementsByClassName('slInvrtBtn');
	  for (var i=0; i<btns.length; ++i) {
		  if(btns[i].style.display=="") btns[i].style.display="none";
		  else btns[i].style.display="";
	  }
  },
  fillFooterStats:function(){
      document.getElementById('slidingpuzzleWon').innerHTML  =slidingpuzzle.timesWon;
      document.getElementById('slidingpuzzleGames').innerHTML=slidingpuzzle.gamesplayed;
  },
  Buttons:{
    Play:function () {
      slidingpuzzle.Screens.Game();
      slidingpuzzle.initPuzzle();
    },Options:function () {
      slidingpuzzle.Screens.Options();
    },Quit:function () {
      slidingpuzzle.Screens.Main();
      slidingpuzzle.point=0;
      slidingpuzzle.fillFooterStats();
    },Restart:function () {
      slidingpuzzle.initPuzzle();
    },Done:function () {
      slidingpuzzle.Screens.Main();
      slidingpuzzle.fillFooterStats();
    }
    ,Main:function () {
      slidingpuzzle.Screens.Main();
    }
  },
  Screens:{
    Main:function () {
      slidingpuzzle.hideOtherScreens(0);
    },
    Settings:function () {
      slidingpuzzle.hideOtherScreens(1);
    },
    Game:function () {
      slidingpuzzle.hideOtherScreens(2);
    }
  },
  hideOtherScreens:function (nr) {
    document.getElementById('mainScreen').style.display    =nr===0?"":"none"; 
    document.getElementById('settingScreen').style.display =nr===1?"":"none"; 
    document.getElementById('gameScreen').style.display    =nr===2?"":"none";
  }
}