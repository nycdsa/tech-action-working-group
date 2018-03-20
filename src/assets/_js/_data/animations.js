module.exports = {
	tileAnimation: function(elem) {
		let boxes = [].slice.call(elem.querySelectorAll('.box'));
		let i = boxes.length;
		while (i--) {
			TweenLite.set(boxes[i], {
				opacity: 0,
				y: 200,
				scaleX: 0.6,
				scaleY: 0.6
			})
			TweenLite.to(boxes[i], 1, {
				ease: Power3.easeOut,
				opacity: 1,
				y: 0,
				scaleX: 1,
				scaleY: 1,
				delay: parseFloat(boxes[i].getAttribute('data-delay') || 0)
			})
		}
		console.log('we got tiles', boxes);
	}
}