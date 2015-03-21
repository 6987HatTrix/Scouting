/*

This file handles submitting the forms for Scouting data, including saving in localStorage if needed.


@Author Eric Miller<eric@legoaces.org>
*/
"use strict"
function toCodedString (form){
	event.preventDefault();
	var elements = form.elements
	var str = []
	for (var i = 0; i < elements.length; i++){
		var e = elements[i]
		if (!e.id) continue;
		str.push(e.id + ":" + e.value)
		//console.log("id: %s, value: %s", e.id, e.value)

	}
	return str.join(',')
}

function saveForm(){
	var form = event.target;
	var str = toCodedString(form)
	console.log(str)

}

window.setInterval(function(){
	if(window.navigator.onLine){
		$('.submitButton').text('Submit!');
	}else{
		$('.submitButton').text("Save Offline");
	}
	$('.submitButton').button('refresh')

}, 200)