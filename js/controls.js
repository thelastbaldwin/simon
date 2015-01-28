var _toggleControls = function(e){
	if(!!e){
		e.preventDefault();
	}
	var controls = this.parentNode.parentNode;
	if(controls.classList.contains('show')){
		controls.classList.remove('show');
		controls.style.top = '';
		this.innerHTML = "Hide";
	}else{
		controls.classList.add('show');
		controls.style.top = -(controls.offsetHeight - this.offsetHeight) + 'px';
		this.innerHTML = "Show";
	}
};

var toggleControls = _toggleControls.bind(document.querySelector('#controls a'));

document.querySelector('#controls a').onclick = function(){
	toggleControls(event);
};



