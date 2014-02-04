/*
+-----------------------------------------------------------------------------+

	@grahamzibar presents:

		 _______  _______  _______  _______           _______           _______ 
		(       )(  ___  )(  ____ )(  ____ )|\     /|(  ____ \|\     /|(  ____ \
		| () () || (   ) || (    )|| (    )|| )   ( || (    \/| )   ( || (    \/
		| || || || |   | || (____)|| (____)|| (___) || (__    | |   | || (_____ 
		| |(_)| || |   | ||     __)|  _____)|  ___  ||  __)   | |   | |(_____  )
		| |   | || |   | || (\ (   | (      | (   ) || (      | |   | |      ) |
		| )   ( || (___) || ) \ \__| )      | )   ( || (____/\| (___) |/\____) |
		|/     \|(_______)|/   \__/|/       |/     \|(_______/(_______)\_______)


	* version 0.1.0 - ALPHA
	* https://www.github.com/grahamzibar/Morpheus


	* What if I told you... this is not an animation library?

+-----------------------------------------------------------------------------+
*/
(function MorpheusModule(_win) {

	if (!_win.morpheus)
		_win.morpheus = new Object();
	var Morpheus = _win.morpheus;

	/*

		CONSTANTS

	*/
	Morpheus.LINEAR = 'linear';
	Morpheus.EASE = 'ease';
	Morpheus.EASE_IN = 'ease-in';
	Morpheus.EASE_OUT = 'ease-out';
	Morpheus.EASE_IN_OUT = 'ease-in-out';
	Morpheus.EASE_OUT_IN = 'ease-out-in';

	Morpheus.LEFT = 'left';
	Morpheus.RIGHT = 'right';
	Morpheus.CENTER = 'center';

	Morpheus.THREE_D = 'preserve-3d';
	Morpheus.FLAT = 'flat';

	Morpheus.PIXELS = 'px';
	Morpheus.PERCENT = '%';
	Morpheus.RADIANS = 'rad';
	Morpheus.DEGREES = 'deg';

	Morpheus.TRANSFORM = '-webkit-transform';

	/*

		CLASSES

	*/
	var Vector = function Vector(x, y, z) {
		this.x = x != null ? x : 0.0;
		this.y = y != null ? y : 0.0;
		this.z = z != null ? z : 0.0;
	};
	Vector.prototype.set = function(x, y, z) {
		this.x = x;
		if (y != null) {
			this.y = y;
			if (z != null)
				this.z = z;
		}
	};

	var Collection = function Collection() {
		var _collection = new Array();
		var _cache = {};

		this.collection = _collection;

		this.add = function(key, value) {
			var index = _cache[key];
			if (typeof index === 'number')
				_collection[index] = value;
			else {
				index = _cache[key] = _collection.length;
				_collection[index] = value;
			}
		};

		this.get = function(key) {
			var index = _cache[key];
			if (!index && index !== 0)
				return null;
			return _collection[index];
		};

		this.remove = function(key) {
			if (_cache[key])
				_collection.splice(_cache[key], 1);
		};
	};

	var Style = function Style(_name, _value, _unit) {
		this.name = _name;
		this.value = _value;
		this.unit = _unit != null ? _unit : '';
	};

	var StyleCollection = function StyleCollection() {
		this.inheritFrom = Collection;
		this.inheritFrom();
		delete this.inheritFrom;

		var add = this.add;
		this.add = function(style) {
			add(style.name, style);
		};
	};

	var Transition = function Transition(_property) {
		this.property = _property;
		this.duration = 500;
		this.delay = 0;
		this.timing = Morpheus.LINEAR;
	};

	var TransitionCollection = function TransitionCollection() {
		this.inheritFrom = Collection;
		this.inheritFrom();
		delete this.inheritFrom;

		var add = this.add;
		this.add = function(transition) {
			add(transition.property, transition);
		};
	};

	var Transform = function Transform() {
		this.translate = new Vector();
		this.translateUnit = 'px';
		this.scale = new Vector(1, 1, 1);
		this.rotate = new Vector();
		this.rotateUnit = 'rad';
		//this.skew?
		this.origin = new Vector(Morpheus.CENTER, Morpheus.CENTER, Morpheus.CENTER);
		this.style = Morpheus.THREE_D;
	};

	// How should the renderer work?
	Morpheus.Renderer = function Renderer(_el) {
		var _render = false;

		var onEnterFrame = function(e) {
			if (_render) {
				_render = false;

				var output = '';
				var styles = _el.styles;
				var transitions = _el.transitions;
				var transform = _el.transform;

				if (styles) {
					for (var i = 0, len = styles.collection.length; i < len; i++)
						output += renderStyle(styles.collection[i]);
				}
				if (transitions)
					output += renderTransitionCollection(transitions);
				if (transform)
					output += renderTransform(transform);
				_el.css = output;
			}

			window.requestAnimationFrame(onEnterFrame);
		};

		var renderStyle = function(style) {
			var output = style.name;
			output += ':';
			output += style.value;
			output += style.unit;
			output += ';';
			return output;
		};

		var renderTransitionCollection = function(tc) {
			var output = 'transition:';
			for (var i = 0, ts = tc.collection, len = ts.length; i < len; i++) {
				if (i)
					output += ', ';
				output += renderTransition(ts[i]);
			}
			output += ';';
			return output;
		};

		var renderTransition = function(transition) {
			var space = ' ';

			var t = transition.property;
			t += space;
			t += transition.duration;
			t += 'ms';
			t += space;
			t += transition.timing;
			t += space;
			t += transition.delay;
			t += 'ms';

			return t;
		};

		var renderTransform = function(transform) {
			var space = ' ';
			var t = '-webkit-transform:translate3d';
			t += renderVector(transform.translate, transform.translateUnit);

			t += space;

			t += 'rotateX(';
			t += transform.rotate.x;
			t += transform.rotateUnit;
			t += ')';
			t += 'rotateY(';
			t += transform.rotate.y;
			t += transform.rotateUnit;
			t += ')';
			t += 'rotateZ(';
			t += transform.rotate.z;
			t += transform.rotateUnit;
			t += ')';

			t += space;

			t += 'scale3d';
			t += renderVector(transform.scale);
			t += ';';

			t += '-webkit-transform-origin:';
			t += transform.origin.x;
			t += space;
			t += transform.origin.y;
			t += space;
			t += transform.origin.z;
			t += ';';

			t += '-webkit-transform-style:';
			t += transform.style;
			t += ';';

			return t;
		};

		var renderVector = function(vector, unit) {
			unit = unit != null ? unit : '';
			var coord = '(';
			coord += vector.x;
			if (vector.x)
				coord += unit;
			coord += ', ';
			coord += vector.y;
			if (vector.y)
				coord += unit;
			coord += ', ';
			coord += vector.z;
			if (vector.z)
				coord += unit;
			coord += ')';

			return coord;
		};

		this.step = function() {
			_render = true;
		};

		window.requestAnimationFrame(onEnterFrame);
	};

	/*

		FUNCTIONS

	*/
	var getStyle = function(property) {
		if (document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(this, false).getPropertyValue(property);
		if (this.currentStyle) {
			return this.currentStyle[property.replace(/\-(\w)/g, function (strMatch, p1) {
				return p1.toUpperCase();
			})];
		}
		return null;
	};

	var getStyleNumber = function(property, unit) {
		var value = this.getStyle(property);
		if (unit)
			value = value.split(unit)[0];
		return Number(value);
	};

	var setStyle = function(property, value, unit) {
		if (!this.styles)
			this.styles = new StyleCollection();

		this.styles.add(new Style(property, value, unit));

		if (!this.renderer)
			this.renderer = new Morpheus.Renderer(this);
		this.renderer.step();
	};

	var setCSS = function(css) {
		if (typeof this.style.cssText != 'undefined')
			this.style.cssText = css;
		else
			this.setAttribute('style', css);
	};

	var translation = function(x, y, z, unit) {
		if (!this.transform)
			this.transform = new Transform();

		this.transform.translate.x = x;
		this.transform.translate.y = y;
		if (z != null) {
			if (arguments.length === 3 && typeof z !== 'number')
				this.transform.translateUnit = z;
			else
				this.transform.z = z;
		}
		if (unit)
			this.transform.translateUnit = unit;

		if (!this.renderer)
			this.renderer = new Morpheus.Renderer(this);
		this.renderer.step();
	};

	var scale = function(x, y, z) {
		if (!this.transform)
			this.transform = new Transform();

		this.transform.scale.x = x;
		this.transform.scale.y = y;
		if (z != null)
			this.transform.scale.z = z;

		if (!this.renderer)
			this.renderer = new Morpheus.Renderer(this);
		this.renderer.step();
	};

	var rotate = function(x, y, z, unit) {
		if (!this.transform)
			this.transform = new Transform();

		this.transform.rotate.x = x;
		this.transform.rotate.y = y;
		this.transform.rotate.z = z;
		if (unit)
			this.transform.rotateUnit = unit;

		if (!this.renderer)
			this.renderer = new Morpheus.Renderer(this);
		this.renderer.step();
	};

	var setOrigin = function(x, y, z) {
		if (!this.transform)
			this.transform = new Transform();

		this.transform.origin.x = x;
		if (y != null) {
			this.transform.origin.y = y;
			if (z != null)
				this.transform.origin.z = z;
		}

		if (!this.renderer)
			this.renderer = new Morpheus.Renderer(this);
		this.renderer.step();
	};

	var addTransition = function(property, duration, timing, delay) {
		if (!this.transitions)
			this.transitions = new TransitionCollection();

		var transition = this.transitions.get(property);
		if (!transition)
			transition = new Transition(property);

		if (duration)
			transition.duration = duration;
		if (timing)
			transition.timing = timing;
		if (delay)
			transition.delay = delay;

		this.transitions.add(transition);
	};

	var removeTransition = function(property) {
		if (this.transitions)
			this.transitions.remove(property);
	};

	/*

		EXTENSION

	*/
	var HTMLElement = _win.HTMLElement;

	HTMLElement.prototype.styles = null;
	HTMLElement.prototype.transitions = null;
	HTMLElement.prototype.transform = null;

	HTMLElement.prototype.__defineSetter__('css', setCSS);
	HTMLElement.prototype.getStyle = getStyle;
	HTMLElement.prototype.getStyleNumber = getStyleNumber;
	HTMLElement.prototype.setStyle = setStyle;

	HTMLElement.prototype.translation = translation;
	HTMLElement.prototype.scale = scale;
	HTMLElement.prototype.rotate = rotate;
	HTMLElement.prototype.setOrigin = setOrigin;

	HTMLElement.prototype.addTransition = addTransition;
	HTMLElement.prototype.removeTransition = removeTransition;

	if (!HTMLElement.prototype.dispatchEvent) {
		// implement
	}

	// THIS NEEDS TO CHANGE, YO -- should be in the renderer class.
	(function(window) {
		var time, vendor, vendors, _i, _len;

		time = 0;
		vendors = ['ms', 'moz', 'webkit', 'o'];
		for (_i = 0, _len = vendors.length; _i < _len; _i++) {
			vendor = vendors[_i];
			if (!(!window.requestAnimationFrame))
				continue;
			window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'];
		}
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback) {
				var delta, now, old;

				now = new Date().getTime();
				delta = Math.max(0, 16 - (now - old));
				setTimeout(function() {
					return callback(time + delta);
				}, delta);
				return old = now + delta;
			};
		}
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				return clearTimeout(id);
			};
		}
	})(_win);

})(window);
/*
+-----------------------------------------------------------------------------+

	written & directed by:
				 _                 _ _           
	 ___ ___ ___| |_ ___ _____ ___|_| |_ ___ ___
	| . |  _| .'|   | .'|     |- _| | . | .'|  _|
	|_  |_| |__,|_|_|__,|_|_|_|___|_|___|__,|_|
	|___|

+-----------------------------------------------------------------------------+
*/