function Container() {
    this.value = 0;
    this.add = function() {
        this.value += 1;
    };
    this.subtract = function() {
        this.value -= 1;
    };
    return this;
}
Container.prototype.addFive = function() {
    //this.value += 5
    return 5
};
var cont = new Container();
for (var i = 0; i < 10; i += 1) {
    console.log(cont.value);
    cont.add();
}
Container.returnStuff = function() {
    return 1000;
}
/**
for (var i = 0; i < 10; i += 1) {
    console.log(cont.value);
    cont.addFive();
}
*/

console.log(Container.returnStuff());
