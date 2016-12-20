var slidingpuzzle = {
  point:100,
  width=null,
  won:false,
  initPuzzle: function() {
  	this.width=document.getElementById("game").offsetWidth;
  },
  pointCounter: function() {
  
  },
  grow:0,
  side:3,
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
  blankpos :8,
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