/**
 * Base class for all GUI objects
 * @class VD.CGuiObject
 * @property {Element} container DOM container of gui
 * @implements EventListener
 *
 */

VD.CGuiObject = (function() {

    var PREFIX = 'go';

    /**
     *
     * @param {VD.CGui} parent
     * @param {object} [options]
     * @constructor
     */
	function CGuiObject(parent ,options) {

        this.parent = parent;
        this.options = options || {};

        /**
         * @readonly
         */
        Object.defineProperty(this, 'container', {
            enumerable: true,
            writable:false,
            value: document.createElement('div')
        });
        parent.container.appendChild(this.container);

        this.height = this.options.height;
        this.width = this.options.width;

        /**
         * @type {String}
         */
        Object.defineProperty(this, 'id', {
            enumerable: true,
            writable:false,
            value: this.options.id ? this.options.id : this.parent.id + '-' + PREFIX + this.parent.objectsCount++
        });

        this.registerEvents();
	}

	Object.defineProperty(CGuiObject.prototype, 'height', {
		enumerable: true,
		get: function() {
			return this.container.offsetHeight;
		},
		set: function(newValue) {
			if (VD.isNumeric(newValue))
				newValue += 'px';
			this.container.style.height = newValue;
		}
	});

	Object.defineProperty(CGuiObject.prototype, 'width', {
		enumerable: true,
		get: function() {
			return this.container.offsetWidth;
		},
		set: function(newValue) {
			if (VD.isNumeric(newValue))
				newValue += 'px';
			this.container.style.width = newValue;
		}
	});

    Object.defineProperty(CGuiObject.prototype, 'top', {
        enumerable: true,
        get: function() {
            return this.container.offsetTop;
        },
        set: function(newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.bottom = '';
            this.container.style.top = newValue;
        }
    });

    Object.defineProperty(CGuiObject.prototype, 'left', {
        enumerable: true,
        get: function() {
            return this.container.offsetLeft;
        },
        set: function(newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.right = '';
            this.container.style.left = newValue;
        }
    });

    Object.defineProperty(CGuiObject.prototype, 'right', {
        enumerable: true,
        get: function() {
            return this.container.offsetLeft-this.container.offsetWidth;;
        },
        set: function(newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.left = '';
            this.container.style.right = newValue;
        }
    });

    Object.defineProperty(CGuiObject.prototype, 'bottom', {
        enumerable: true,
        get: function() {
            return this.container.offsetTop-this.container.offsetHeight;
        },
        set: function(newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.top = '';
            this.container.style.bottom = newValue;
        }
    });

    /**
     *
     * @param {Event} event
     */
    CGuiObject.prototype.handleEvent = function CGuiObject_handleEvent(event) {
        var callback = 'on' + event.type.charAt(0).toUpperCase() + event.type.slice(1);
        if (callback in this)
            this[callback](event);
    };

    /**
     * @example
     * function (){
     *      this.container.addEventListener('click',this);
     * };
     *
     *
     */
    CGuiObject.prototype.registerEvents = function CGuiObject_registerEvents(){
//        this.container.addEventListener('click',this);
//        this.container.addEventListener('dblclick',this);
//        this.container.addEventListener('mouseover',this);
//        this.container.addEventListener('mouseout',this);
//        this.container.addEventListener('mousedown',this);
//        this.container.addEventListener('mouseup',this);
    };

    CGuiObject.prototype.render = function CGuiObject_render(){

    };

    CGuiObject.prototype.toString = function (){
        return this.id;
    };

	return CGuiObject;
})()