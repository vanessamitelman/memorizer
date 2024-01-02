"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
// created for each request
const createContext = ({ req, res }) => ({ req, res }); // no context
exports.createContext = createContext;
