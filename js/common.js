function range(length) {
	var array = new Array(length);
	for (var i = 0; i < length; ++i) 
		array[i]=i;

	return array;
}
function randomNext(top) {
	return Math.floor(Math.random() * top)
}

Array.prototype.shuffle = function() {
	for (var i = 0; i < this.length; ++i) {
		this.swap(i,randomNext(this.length));
	}
};
Array.prototype.swap = function(index1, index2) {
	var tmp = this[index1];
	this[index1] = this[index2];
	this[index2] = tmp;
};
