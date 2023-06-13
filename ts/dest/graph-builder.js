"use strict";
const submit = document.querySelector("#graph-build");
submit.onclick = function () {
    const v = document.querySelector("#v1");
    const e = document.querySelector("#e1");
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    var canv = document.getElementById("graph-canvas");
    var ctx = canv.getContext("2d");
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canv.width, canv.height);
    var vertixNum = parseInt(v.value);
    var edgeNum = parseInt(e.value);
    var distanceArray = [];
    var circlesArray = [];
    console.log(v.value);
    console.log(vertixNum);
    if (vertixNum >= 1 && vertixNum <= 100) {
        for (let i = 0; i < vertixNum; i++) {
            var l = 0;
            do {
                var bool1 = true;
                var randX = clampNumber(Math.random() * 100 * 8, 20, 780);
                var randY = clampNumber(Math.random() * 100 * 8, 20, 780);
                for (let j = 0; j < circlesArray.length; j++) {
                    var x = circlesArray[j][0];
                    var y = circlesArray[j][1];
                    var pythagoras = Math.sqrt(Math.pow(randX - x, 2) + Math.pow(randY - y, 2));
                    if (pythagoras <= 40) {
                        bool1 = false;
                        break;
                    }
                }
                if (bool1) {
                    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
                    ctx === null || ctx === void 0 ? void 0 : ctx.arc(randX, randY, 10, 0, 2 * Math.PI);
                    ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
                    circlesArray.push([randX, randY]);
                    break;
                }
                l++;
            } while (l <= 500);
        }
        for (let i = 0; i < edgeNum; i++) {
            do {
                var bool1 = true;
                var randOne = Math.floor(Math.random() * (vertixNum));
                var randTwo = Math.floor(Math.random() * (vertixNum));
                if (randOne == randTwo) {
                    var randAngle = Math.floor(Math.random() * 360);
                    var angle = randAngle + 80;
                    var x = circlesArray[randOne][0];
                    var y = circlesArray[randOne][1];
                    var distance = 60;
                    const angleInRadians = randAngle * (Math.PI / 180);
                    const angleInRadians2 = angle * (Math.PI / 180);
                    const newX = x + distance * Math.cos(angleInRadians);
                    const newY = y + distance * Math.sin(angleInRadians);
                    const newX2 = x + distance * Math.cos(angleInRadians2);
                    const newY2 = y + distance * Math.sin(angleInRadians2);
                    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
                    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(x, y);
                    ctx === null || ctx === void 0 ? void 0 : ctx.bezierCurveTo(newX, newY, newX2, newY2, x, y);
                    ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
                    break;
                }
                for (let j = 0; j < distanceArray.length; j++) {
                    if (distanceArray[j][0] == randOne && distanceArray[j][1] == randTwo || distanceArray[j][0] == randTwo && distanceArray[j][1] == randOne) {
                        var x1 = circlesArray[randOne][0];
                        var y1 = circlesArray[randOne][1];
                        var x2 = circlesArray[randTwo][0];
                        var y2 = circlesArray[randTwo][1];
                        var x3 = (x1 + x2) / 2;
                        var y3 = (y1 + y2) / 2;
                        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                        var angle = 90 * plusOrMinus;
                        var distance = Math.floor(Math.random() * 50) + 100;
                        const angleInRadians = angle * (Math.PI / 180);
                        const newX = x3 + distance * Math.cos(angleInRadians);
                        const newY = y3 + distance * Math.sin(angleInRadians);
                        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
                        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(x1, y1);
                        ctx === null || ctx === void 0 ? void 0 : ctx.quadraticCurveTo(newX, newY, x2, y2);
                        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
                        break;
                    }
                }
                ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
                ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(circlesArray[randOne][0], circlesArray[randOne][1]);
                ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(circlesArray[randTwo][0], circlesArray[randTwo][1]);
                ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
                distanceArray.push([randOne, randTwo]);
                break;
            } while (true);
        }
    }
};
