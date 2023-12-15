"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(3301, () => {
    console.log('listening on 3301');
});
app.get('/', (req, res) => {
    res.send({
        message: 'hey ma'
    });
});
