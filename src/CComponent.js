/**
 * @class VD.CComponent
 * @property {object} options
 */

VD.CComponent = (function () {

    /**
     *
     * @param {VD} core Engine
     * @param {object} options
     * @constructor
     */
    function CComponent(core, options) {
        var options;

        /**
         *
         * @type {VD}
         */
        this.core = core;

        Object.defineProperty(this, 'options', {
            enumerable: true,
            get: function () {
                return options;
            },
            set: function (newValue) {
                options = VD.extend(this.defaults, newValue);
            }
        });

        this.options = options;
    }

    CComponent.prototype.defaults = {};

    CComponent.prototype.test = function () {
        alert('test');
    };

    return CComponent;
})();