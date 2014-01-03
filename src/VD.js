/**
 * @author Vladimir Porshkevich http://neosonic.ru/ @NeoSonic
 * Released under the MIT license
 *
 * @namespace VD
 * @module VD
 *
 */

VD = (function() {

// Save a reference to some core methods
	var core_push = Array.prototype.push,
		core_slice = Array.prototype.slice,
		core_indexOf = Array.prototype.indexOf,
		core_toString = Object.prototype.toString,
		core_hasOwn = Object.prototype.hasOwnProperty,
		core_trim = String.prototype.trim;

	var VD = {
		/**
		 *
		 */
		classes: {},
		components: {},
		options: {},
		defaults: {
			components: {
				videoEngine: {class: 'CBaseEngine'},
				camera: {class: 'CCamera'},
				gui: {class: 'CGui'}
			}
		},
		init: function (options) {
			this.options = options || {};
		},
		/**
		 *
		 * @param {string} id
		 * @return {VDCComponent|undefined}
		 */
		getComponent: function(id) {
			if (VD.components[id])
				return VD.components[id];
			if (!VD.options.components[id])
				return undefined;
			var c_options = VD.extend(VD.options.components[id]);
			var c_class;
			if (!(c_class = VD[c_options.class]))
				return undefined;
			delete(c_options.class);
			return VD.components[id] = new c_class(this, c_options);
		}

	};
	var _components = {}, _options = {};
	Object.defineProperty(VD, "components", {
		enumerable: true,
		get: function() {
			return _components;
		},
		set: function(newValue) {
			if (VD.isPlainObject(newValue))
				_components = newValue;
		}
	});

	Object.defineProperty(VD, "options", {
		enumerable: true,
		get: function() {
			return _options;
		},
		set: function(newValue) {
			_options = VD.extend(VD.defaults, _options, newValue);
		}
	});
	/**
	 *
	 * @param {mixed} obj
	 * @returns {String}
	 */
	VD.type = function(obj) {
		return obj == null ?
				String(obj) :
				class2type[ core_toString.call(obj) ] || "object";
	};
	var class2type = {};
	"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(name, i) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	VD.isFunction = function(obj) {
		return this.type(obj) === "function";
	};
	VD.isArray = Array.isArray || function(obj) {
		return this.type(obj) === "array";
	};
	VD.isWindow = function(obj) {
		return obj != null && obj == obj.window;
	};
	VD.isNumeric = function(obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	};
	VD.isPlainObject = function(obj) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if (!obj || VD.type(obj) !== "object" || obj.nodeType || VD.isWindow(obj)) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if (obj.constructor &&
					!core_hasOwn.call(obj, "constructor") &&
					!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for (key in obj) {
		}

		return key === undefined || core_hasOwn.call(obj, key);
	};
	VD.isEmptyObject = function(obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	};
	/**
	 *
	 * @return {object}
	 */
	VD.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;
		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !this.isFunction(target)) {
			target = {};
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[ i ]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[ name ];
					copy = options[ name ];
					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && this.isArray(src) ? src : [];
						} else {
							clone = src && this.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = this.extend(deep, clone, copy);
						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};
	VD.inherit = function(target, source) {
		var F = function() {
		};
		F.prototype = source.prototype;
		target.prototype = new F();
		target.prototype.constructor = target;
		target.superclass = source.prototype;
	};
	return VD;
}())

if (!console)
	window.console = {};
/**
 * check console.assert exists
 */
if (!console.assert)
	/**
	 * If the specified expression is false, the message is written to the console along with a stack trace.
	 *
	 * @param {boolean} expression
	 * @param {string} message
	 * @throws {Error}
	 * @returns {}
	 */
	console.assert = function(expression, message) {
		if (!expression)
			throw new Error(message || "Assertion failed")
	};
