/**
 *
 * test 1
 */
var gui = VD.getComponent('gui');

var temp;

console.time('start');
for (var i = 0; i < 1000; i++){
    temp = gui.createObject(VD.CGuiObject, {width:5,height:5});
}
console.timeEnd('start');