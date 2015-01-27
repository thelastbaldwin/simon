var playerPattern = [],
	computerPattern = [],
	buttons = {
		yellow: {
			node: document.querySelector('#simon .yellow'),
			sound: document.querySelector('#yellowSound')
		},
		blue: {
			node: document.querySelector('#simon .blue'),
			sound: document.querySelector('#blueSound')
		},
		red: {
			node: document.querySelector('#simon .red'),
			sound: document.querySelector('#redSound')
		},
		green: {
			node: document.querySelector('#simon .green'),
			sound: document.querySelector('#greenSound')
		}
	};

// attach handlers
for(var button in buttons){
	if(buttons.hasOwnProperty(button)){
		buttons[button].node.onclick = clickButton.bind(buttons[button], button);
	}
}

function resetButtons(){
	for(var button in buttons){
		if(buttons.hasOwnProperty(button)){
			buttons[button].node.classList.remove('active');
		}
	}
}

function setActiveButton(button){
	setTimeout(function(){
		button.node.classList.add('active');
		button.sound.currentTime = 0;
		button.sound.play();
	}, 100);
}

function clickButton(color){
	resetButtons();
	setActiveButton(this);
}