var slidingpuzzle = {
  maxPoint:100,
  point:0,
  pieces:null,
  pos :  null,
  blankpos :-1,
  gamesplayed:0,
  timesWon:0,
  sides:3,
  playAfterTimeup:false,  
  over:true,
  previewTimeout:0,
  initPuzzle:function() {
    slidingpuzzle.game=document.getElementById("game");
    slidingpuzzle.game.setAttribute("onmousedown","slidingpuzzle.puzzleReference.show()");
    slidingpuzzle.game.setAttribute("onmouseup",  "slidingpuzzle.puzzleReference.hide()");   
  },
  startPuzzle: function() {
    slidingpuzzle.game.style.height=game.offsetWidth+"px";
  	slidingpuzzle.point=slidingpuzzle.maxPoint;    
    document.getElementById('slpoint').innerHTML=slidingpuzzle.maxPoint;
  	var squares= slidingpuzzle.sides*slidingpuzzle.sides;
  	var pieceW = 100/slidingpuzzle.sides;
  	var pieceBGpostInterval = 100/(slidingpuzzle.sides-1); //not the geatest name, I know.

  	if(slidingpuzzle.over) slidingpuzzle.showGameStartBtns();

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

    slidingpuzzle.puzzleReference.show();
    slidingpuzzle.previewTimeout = setTimeout(function() {
      slidingpuzzle.puzzleReference.hide();
      slidingpuzzle.pointCounter(++slidingpuzzle.gamesplayed);
    }, 3500);  	

  	function addGameNodes() {
      game.innerHTML="<div id=\"gamePuzzleReference\"></div>";
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
  		div.setAttribute("onmousedown","event.stopPropagation();");
  		div.setAttribute("onmouseup",  "event.stopPropagation();");

  		div.style.width=pieceW+"%";
  		div.style.height=pieceW+"%";
  		div.style.backgroundSize=100*slidingpuzzle.sides+"%";  		

  		div.style.backgroundPosition= 
  			pieceBGpostInterval*(index%slidingpuzzle.sides)+"% "+
  			(pieceBGpostInterval*Math.floor(index/slidingpuzzle.sides))+"%";

  		if(index===slidingpuzzle.blankpos)div.id="gameDivMissing";
  		return div;
  	}
  	function PosSolvable() {
  		//logic from: 
  		//https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
  		var inversions=0;
  		var even = slidingpuzzle.sides%2==0;

  		for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  			for (var j = i+1; j < slidingpuzzle.pos.length; ++j) {
  				if(slidingpuzzle.pos[i]===slidingpuzzle.blankpos){ 
  					if(even) var blankposindex = i;
  					++i;//inversions of the blank pos shouldn't be counted
  				}else if(slidingpuzzle.pos[i]>slidingpuzzle.pos[j]){
  					++inversions;
  				}
  			}
  		}
  		if(!even){
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
// loop //  
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

  			slidingpuzzle.showGameStartBtns();
  			if(!slidingpuzzle.playAfterTimeup)slidingpuzzle.over=true;
  		}
  	}, 1001);

  },
  clck: function(index) {

  	if(!slidingpuzzle.over){
	  	var posIndex   = slidingpuzzle.pos.indexOf(index);
	  	var blankIndex = slidingpuzzle.pos.indexOf(slidingpuzzle.blankpos);

	  	if(checkSwap()){swap();
	    	if(check4Win()){
	    		slidingpuzzle.over=true;
	        if(slidingpuzzle.point!==0)++slidingpuzzle.timesWon;
	        slidingpuzzle.showGameOverBtns();
	    		document.getElementById('gameDivMissing').style.visibility="visible";

	  	}
  	}

  	function swap() {
  		slidingpuzzle.pos.swap(posIndex, blankIndex);
  		slidingpuzzle.piecesCSS(slidingpuzzle.pieces[index],blankIndex);
  	}
  	function checkSwap() {
  		var p1 = Math.abs(Math.floor(posIndex/slidingpuzzle.sides) - Math.floor(blankIndex/slidingpuzzle.sides));
  		var p2 = Math.abs(posIndex%slidingpuzzle.sides - blankIndex%slidingpuzzle.sides);
  		if(p1 > 1 || p2 > 1) return false;
  		return (p1 !== p2);
  	}
  	function check4Win() {
  		for (var i = 0; i < slidingpuzzle.pos.length; ++i) {
  			if(i!==slidingpuzzle.pos[i]) return false;
  		}
  		return true;
  	}
  	}
  },
  showGameStartBtns: function () {
  	var btnsP=document.getElementsByClassName('slGamePlayingbtn');
    var btnsO=document.getElementsByClassName('slGameOverbtn');
	  for (var i=0; i<btnsP.length; ++i) {
		  btnsP[i].style.display="";
	  }
    for (var i=0; i<btnsO.length; ++i) {
      btnsO[i].style.display="none";
    }
  },
  showGameOverBtns: function () {
    var btnsP=document.getElementsByClassName('slGamePlayingbtn');
    var btnsO=document.getElementsByClassName('slGameOverbtn');
    for (var i=0; i<btnsP.length; ++i) {
      btnsP[i].style.display="none";
    }
    for (var i=0; i<btnsO.length; ++i) {
      btnsO[i].style.display="";
    }
  },
  fillFooterStats:function(){
      document.getElementById('slidingpuzzleWon').innerHTML  =slidingpuzzle.timesWon;
      document.getElementById('slidingpuzzleGames').innerHTML=slidingpuzzle.gamesplayed;
      document.getElementById('slidingpuzzleWinPercent').innerHTML= Math.floor(slidingpuzzle.timesWon/slidingpuzzle.gamesplayed*10000)/100;
  },
  puzzleReference:{        
    show:function(){document.getElementById('gamePuzzleReference').style.visibility='visible';},
    hide:function(){document.getElementById('gamePuzzleReference').style.visibility='hidden';
      if(slidingpuzzle.over){//splashscreen    
        clearTimeout(slidingpuzzle.previewTimeout);
        slidingpuzzle.pointCounter(++slidingpuzzle.gamesplayed);
        slidingpuzzle.over=false;
      }
    }
  },
  ChangeOptionsForm:function(){
    var sides = document.getElementById('slSidesOptions').value,
        time = document.getElementById('slTimeOptions').value;
    if(sides) slidingpuzzle.sides = parseInt(sides);
    if(time) slidingpuzzle.maxPoint = parseInt(time);
    
    slidingpuzzle.playAfterTimeup = !document.getElementById('slSATOptions').checked;
  },
  FillOptionsForm: function(){
    document.getElementById('slSidesOptions').value = slidingpuzzle.sides;
    document.getElementById('slTimeOptions').value = slidingpuzzle.maxPoint;
    document.getElementById('slSATOptions').checked = !slidingpuzzle.playAfterTimeup;
  },
  Buttons:{
    Play:function () {
      slidingpuzzle.Screens.Game();
      slidingpuzzle.startPuzzle();
    },Options:function () {
      slidingpuzzle.Screens.Settings();
      slidingpuzzle.FillOptionsForm();
    },Quit:function () {
      slidingpuzzle.Screens.Main();
      slidingpuzzle.point=0;
      slidingpuzzle.fillFooterStats();
    },Restart:function () {
      slidingpuzzle.startPuzzle();
    },Done:function() {
      slidingpuzzle.Screens.Main();
      slidingpuzzle.fillFooterStats();
    }
    ,ChangeOptions:function () {
      slidingpuzzle.ChangeOptionsForm();
      slidingpuzzle.Screens.Main();
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