.controller('gameCtrl',function($scope, $timeout) {
	$scope.point = 100;
	var width = document.getElementById("game").offsetWidth;
	$scope.won = false;
	$scope.initPuzzle = function () {
		$scope.point = 100;
		$scope.won = false;
		for (var i = 0; i < 5; i++) {
			var index = Math.floor(Math.random()*$scope.side*$scope.side);
			if($scope.checkSwap(index))swap(index);
			else i--;
		}
		$scope.piecesPosUpdate();	
		$timeout($scope.pointCounter,1000);
	};

	$scope.pointCounter = function () {
		$scope.point--;
		if($scope.point<=0 ){
			
		}
		else if($scope.won){

		}
		else{
			$timeout($scope.pointCounter,1000);
		}
	};

	$scope.grow = {"height": width + "px"};
	$scope.side = 3;
	$scope.getNumber = function(num) {
        return new Array(num);   
    };
    var check4Win = function () {
		var counter = 0;
		console.log('check4Win');
		for (var i = 0; i < $scope.side; i++) {
			for (var j = 0; j < $scope.side; j++) {				
				// console.log("c "+counter+"; p1 "+ $scope.pos[counter][0]+"; p2 "+$scope.pos[counter][1]+"; i "+i+"; j "+j+"---> ");
				if( $scope.pos[counter][0] !== i
				 || $scope.pos[counter][1] !== j) return false;
				counter++;			
			}			
		}
		return true;
	};
	$scope.checkSwap = function (index) {
		// if(index === blankpos)return false;//hit blank
		var v1 = Math.abs($scope.pos[index][0] - $scope.pos[blankpos][0]);
		var v2 = Math.abs($scope.pos[index][1] - $scope.pos[blankpos][1]);
		if(v1 > 1 || v2 > 1) return false;
		if(v1 !== v2)
		{
			console.log(($scope.pos[index][0] === $scope.pos[blankpos][0])+"\t: i "+$scope.pos[index][0]+" b "+$scope.pos[blankpos][0]);
			console.log(($scope.pos[index][1] === $scope.pos[blankpos][1])+"\t: i "+$scope.pos[index][1]+" b "+$scope.pos[blankpos][1]);
			return true;
		}
	}
	var swap = function (index) {
		var tmp1 = $scope.pos[index][0],
			tmp2 = $scope.pos[index][1];
		$scope.pos[index][0] = $scope.pos[blankpos][0];
		$scope.pos[index][1] = $scope.pos[blankpos][1];
		$scope.pos[blankpos][0] = tmp1;
		$scope.pos[blankpos][1] = tmp2;
	}
	$scope.clck = function (index) {
		if(!$scope.won&&$scope.checkSwap(index)){
			swap(index);	
			console.log('click');			
			$scope.piecesPosUpdate();
			if(check4Win()){
				document.getElementById('gameDivMissing').removeAttribute("id");
				$scope.won = true;
			}
		}
    };
	var blankpos = 8;//x,y,index
    $scope.pos = [//x,y
    	[0,0],
		[0,1],
		[0,2],
		[1,0],
		[1,1],
		[1,2],
		[2,0],
		[2,1],
		[2,2]
    ];
    $scope.pieces = [
	    	{"top": $scope.pos[0][0]*100/3 +"%", "left": $scope.pos[0][1]*100/3 +"%", "background-position": $scope.pos[0][1]*50+"%"+" "+$scope.pos[0][0]*50+"%"},
	    	{"top": $scope.pos[1][0]*100/3 +"%", "left": $scope.pos[1][1]*100/3 +"%", "background-position": $scope.pos[1][1]*50+"%"+" "+$scope.pos[1][0]*50+"%"},
	    	{"top": $scope.pos[2][0]*100/3 +"%", "left": $scope.pos[2][1]*100/3 +"%", "background-position": $scope.pos[2][1]*50+"%"+" "+$scope.pos[2][0]*50+"%"},
	    	{"top": $scope.pos[3][0]*100/3 +"%", "left": $scope.pos[3][1]*100/3 +"%", "background-position": $scope.pos[3][1]*50+"%"+" "+$scope.pos[3][0]*50+"%"},
	    	{"top": $scope.pos[4][0]*100/3 +"%", "left": $scope.pos[4][1]*100/3 +"%", "background-position": $scope.pos[4][1]*50+"%"+" "+$scope.pos[4][0]*50+"%"},
	    	{"top": $scope.pos[5][0]*100/3 +"%", "left": $scope.pos[5][1]*100/3 +"%", "background-position": $scope.pos[5][1]*50+"%"+" "+$scope.pos[5][0]*50+"%"},
	    	{"top": $scope.pos[6][0]*100/3 +"%", "left": $scope.pos[6][1]*100/3 +"%", "background-position": $scope.pos[6][1]*50+"%"+" "+$scope.pos[6][0]*50+"%"},
	    	{"top": $scope.pos[7][0]*100/3 +"%", "left": $scope.pos[7][1]*100/3 +"%", "background-position": $scope.pos[7][1]*50+"%"+" "+$scope.pos[7][0]*50+"%"},
	    	{"top": $scope.pos[8][0]*100/3 +"%", "left": $scope.pos[8][1]*100/3 +"%", "background-position": $scope.pos[8][1]*50+"%"+" "+$scope.pos[8][0]*50+"%"}
	    ];
    $scope.piecesPosUpdate = function () {
    	console.log('pos_updated');
    	//#hardCoded
    	$scope.pieces[0].top = $scope.pos[0][0]*100/3+"%"; $scope.pieces[0].left = $scope.pos[0][1]*100/3+"%";
    	$scope.pieces[1].top = $scope.pos[1][0]*100/3+"%"; $scope.pieces[1].left = $scope.pos[1][1]*100/3+"%";
    	$scope.pieces[2].top = $scope.pos[2][0]*100/3+"%"; $scope.pieces[2].left = $scope.pos[2][1]*100/3+"%";
    	$scope.pieces[3].top = $scope.pos[3][0]*100/3+"%"; $scope.pieces[3].left = $scope.pos[3][1]*100/3+"%";
    	$scope.pieces[4].top = $scope.pos[4][0]*100/3+"%"; $scope.pieces[4].left = $scope.pos[4][1]*100/3+"%";
    	$scope.pieces[5].top = $scope.pos[5][0]*100/3+"%"; $scope.pieces[5].left = $scope.pos[5][1]*100/3+"%";
    	$scope.pieces[6].top = $scope.pos[6][0]*100/3+"%"; $scope.pieces[6].left = $scope.pos[6][1]*100/3+"%";
    	$scope.pieces[7].top = $scope.pos[7][0]*100/3+"%"; $scope.pieces[7].left = $scope.pos[7][1]*100/3+"%";
    	$scope.pieces[8].top = $scope.pos[8][0]*100/3+"%"; $scope.pieces[8].left = $scope.pos[8][1]*100/3+"%";
    }    
});