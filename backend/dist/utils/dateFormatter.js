"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
exports.formatDate = formatDate;
