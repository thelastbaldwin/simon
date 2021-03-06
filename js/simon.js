var humanChoiceInterval,
	computerPattern = [],
	colorIndex = 0,
	score = 0,
	buttons = [
		{
			color: 'yellow',
			value: 0,
			node: document.querySelector('#simon .yellow'),
			sound: "yellowSound"
		},
		{
			color: 'blue',
			value: 1,
			node: document.querySelector('#simon .blue'),
			sound: "blueSound"
		},
		{
			color: 'red',
			value: 2,
			node: document.querySelector('#simon .red'),
			sound: "redSound"
		},
		{
			color: 'green',
			value: 3,
			node: document.querySelector('#simon .green'),
			sound: "greenSound"
		}
	],
	hasLost = false,
	scoreElement = document.querySelector('#controls p span'),
	startButton = document.querySelector('#controls button');

//register sounds
var audioPath = 'bin/';
var sounds = [
	{id: "yellowSound", src: "sound1.mp3"},
	{id: "blueSound", src: "sound2.mp3"},
	{id: "redSound", src: "sound3.mp3"},
	{id: "greenSound", src: "sound4.mp3"},
	{id: "explodeSound", src: "explode.mp3"}
];

createjs.Sound.registerSounds(sounds, audioPath);

// attach handlers
buttons.forEach(function(button){
	button.node.onclick = function(){
		resetButtons();
		setActiveButton(this);
		window.dispatchEvent(new CustomEvent('human color choice', {detail: button}));
	}.bind(button);
});

startButton.onclick = start;

window.addEventListener('computer turn finished', function(e){
	resetHumanChoiceInterval();
});

window.addEventListener('human turn finished', function(e){
	colorIndex = 0;
	score++;
	updateScore();
	clearInterval(humanChoiceInterval);
	computerTurn();
});

window.addEventListener('human color choice', function(e){
	if(!hasLost){
		var colorChoiceValue = e.detail.value;
		if(colorChoiceValue === computerPattern[colorIndex]){
			resetHumanChoiceInterval();
			colorIndex++;

			if(colorIndex === computerPattern.length){
				window.dispatchEvent(new Event('human turn finished'));
			}
		}else{
			lose();
		}
	}
});

function start(){
	computerPattern = [];
	clearInterval(humanChoiceInterval);
	score = 0;
	colorIndex = 0;
	hasLost = false;
	updateScore();
	computerTurn();
	toggleControls();
}

function lose(){
	clearInterval(humanChoiceInterval);
	hasLost = true;
	createjs.Sound.play('explodeSound');
}

function updateScore(){
	scoreElement.innerHTML = score;
}

function resetHumanChoiceInterval(){
	clearInterval(humanChoiceInterval);
	humanChoiceInterval = setTimeout(function(){
		lose();
	}, 3000);
}

function resetButtons(){
	//removes the active class from all buttons
	buttons.forEach(function(button){
		if(buttons.hasOwnProperty(button)){
			buttons[button].node.classList.remove('active');
		}
	});
}

function setActiveButton(button){
	var delayedActivate = setTimeout(function(){
		button.node.classList.add('active');
		button.sound.currentTime = 0;
		createjs.Sound.play(button.sound);
	}, 100);

	var delayedDeactivate = setTimeout(function(){
		button.node.classList.remove('active');
	}, 500);
}

function getRandomChoice(){
	//returns random number from 0 - 4
	return Math.floor(Math.random() * buttons.length);
}

function computerTurn(){
	//clear human timer
	clearInterval(humanChoiceInterval);

	//play computer choices
	computerPattern.push(getRandomChoice());
	var i = 0;
	var computerSequence = setInterval(function(){
		if(i < computerPattern.length){
			setActiveButton(buttons[computerPattern[i]]);
			i++;
		}else{
			clearInterval(computerSequence);
			window.dispatchEvent(new Event('computer turn finished'));
			//emit an event saying that the computer's turn is finished
		}
	}, 700);
}