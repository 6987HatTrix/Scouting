/*

This file handles submitting the forms for Scouting data, including saving in localStorage if needed.


@Author Eric Miller<eric@legoaces.org>
*/
"use strict"
function toCodedString (form){
	event.preventDefault();
	var elements = form.elements
	var obj = new Object()
	for (var i = 0; i < elements.length; i++){
		var e = elements[i]
		if (!e.id) continue;
		obj[e.name] = e.value
		//console.log("id: %s, value: %s", e.id, e.value)

	}
	return JSON.stringify(obj)
}

if (!localStorage.savedRounds){
	localStorage.savedRounds = JSON.stringify([])
}
var rounds = JSON.parse(localStorage.savedRounds)

function saveForm(){
	var form = event.target;
	var str = toCodedString(form)
	console.log(str) 
	rounds.push(str)
	localStorage.savedRounds = JSON.stringify(rounds);
}

function submitOnline(string){
	var x = new XMLHttpRequest();

	x.onerror = function(){console.log('transmission failed.')}
	x.onload = function(){
		console.log('transmission succeeded: '+this.responseText)
		if (this.responseText == string){
			console.log('removing round from storage')
			rounds.pop(rounds.indexOf(string))
			localStorage.savedRounds = JSON.stringify(rounds)
		}
	}

	x.open("POST", "submit"+"?data="+string)
	x.send()
}

window.setInterval(function(){
	if(window.navigator.onLine){
		$('.submitButton').text('Submit!');
	}else{
		$('.submitButton').text("Save Offline");
	}
	$('.submitButton').button('refresh')

}, 200)