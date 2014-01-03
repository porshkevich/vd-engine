/**
 * @class VD.CGui
 * @extends VD.CComponent
 * @property {Element} container DOM container of gui
 * @property {String|Number} height
 * @property {string} id
 */

VD.CGui = (function () {

    /**
     * @param {VD} core
     * @param {Object} options
     * @constructor
     */
    function CGui(core, options) {

        CGui.superclass.constructor.call(this, core, options);

        /**
         * @readonly
         */
        Object.defineProperty(this, 'container', {
            enumerable: true,
            writable: false,
            value: document.createElement('div')
        });

        document.body.appendChild(this.container);

        Object.defineProperty(this, 'id', {
            enumerable: true,
            writable: false,
            value: this.container.id = 'gui'
        });

//        Object.defineProperty(this.container, 'id', {
//            enumerable: true,
//            writable: false,
//            value: 'gui'
//        });

        this.sheet = (function () {
            // Create the <style> tag
            var style = document.createElement("style");

            // Add a media (and/or media query) here if you'd like!
            // style.setAttribute("media", "screen")
            // style.setAttribute("media", "@media only screen and (max-width : 1024px)")

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        })();

        this.sheet.insertRule('\#gui {\n\
	    	position: absolute;\n\
	        overflow: hidden;\
	    }', 0);
        this.sheet.insertRule('\
        html, body, * {\n\
            padding: 0;\n\
            margin: 0;\n\
        }', 0);
        this.sheet.insertRule('\
        #gui * {\n\
            -moz-box-sizing: border-box;\n\
            box-sizing: border-box;\n\
            margin: 0;\n\
            position: absolute;\
        }', this.sheet.length);

        this.height = this.options.height;
        this.width = this.options.width;

        this.objects = {};
        this.objectsCount = 0;


    }

    VD.inherit(CGui, VD.CComponent);

    /**
     *
     * @type {object}
     */
    CGui.prototype.defaults = {
        height: '100%',
        width: '100%'
    };

    Object.defineProperty(CGui.prototype, 'height', {
        enumerable: true,
        get: function () {
            return this.container.offsetHeight;
        },
        set: function (newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.height = newValue;
        }
    });

    Object.defineProperty(CGui.prototype, 'width', {
        enumerable: true,
        get: function () {
            return this.container.offsetWidth;
        },
        set: function (newValue) {
            if (VD.isNumeric(newValue))
                newValue += 'px';
            this.container.style.width = newValue;
        }
    });

    /**
     *
     * @param {VD.CGuiObject} object
     * @returns {VD.CGuiObject}
     */
    CGui.prototype.addObject = function CGui_addObject(object) {
        return (object instanceof  VD.CGuiObject) ? (this.objects[object] = object) : undefined;
    };

    /**
     *
     * @param {string} objectId
     * @returns {undefined}
     */
    CGui.prototype.getObject = function CGui_getObject(objectId) {
        return this.objects[objectId];
    };

    /**
     *
     * @param {CGuiObject|string} object
     * @returns {undefined}
     */
    CGui.prototype.delObject = function CGui_delObject(object) {
        delete this.objects[object];
    }

    /**
     *
     * @param {Function|string}constructor
     * @param {object} [options]
     * @return {CGuiObject|undefined}
     */
    CGui.prototype.createObject = function CGui_createObject(constructor, options) {
        var object;
        try {
            object = typeof constructor === 'function' ? new constructor(this, options) : new VD[constructor](this, options);
            this.addObject(object);
        } catch (e) {
            return undefined;
        }
        return object;
    }

    return CGui;
})();