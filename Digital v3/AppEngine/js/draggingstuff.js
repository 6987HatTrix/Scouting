/*

This file handles GUI for the completely redesigned scouting system


@Author Eric Miller<eric@legoaces.org>
*/
'use strict'
var firstMove;

window.addEventListener('touchstart', function (e) {
    firstMove = true;
});

window.addEventListener('touchmove', function (e) {
    if (firstMove) {
        e.preventDefault();

        firstMove = false;
    }
});

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "body",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

	
	onstart: function(event){
		var x = event.target;
		if (x.hasBeenDragged) return;
		x.hasBeenDragged = true;
		$(x).clone().appendTo($(x).parent());
		window.x = x;
	},
	
    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      $(event.target).addClass("toolDragged")
		.find(".startHidden").removeClass("startHidden")
		$(".interact").off()
		
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener;
  
  
  // enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  //accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
	$(event.relatedTarget).removeAttr('data-team')
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  },
  ondrop: function (event) {
	  if (event.target.id=="tools"){  
		console.log("deleting object")
		event.relatedTarget.remove()
	  }
	  $(event.relatedTarget).attr('data-team', $(event.target).attr('data-team'))
	  handleComplexDrop(event);
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

function handleComplexDrop(event){
	if ($(event.relatedTarget).hasClass('complex')){
		var type = $(event.relatedTarget).attr('data-class')
		console.log("dropped ", type, event.relatedTarget)
		$(event.target).find('.'+type).show();
		event.relatedTarget.remove();
	}
}