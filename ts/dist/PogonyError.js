"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PogonyError = void 0;
class PogonyError extends Error {
    isPogonyError = true;
    sdk = 'Pogony';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PogonyError = PogonyError;
//# sourceMappingURL=PogonyError.js.map