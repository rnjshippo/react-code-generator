"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var commander_1 = require("commander");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var program = new commander_1.Command();
var version = '0.0.1';
program
    .name('codegen')
    .version(version, '-v, --version')
    .option('-p, --path <path>', 'copy path', '.')
    .parse();
function checkDirectoryIsAvailable(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.readdir(dir)];
                case 1:
                    files = _a.sent();
                    if (files.length > 0) {
                        throw new Error('Directory must be empty!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function copyTemplate(srcDir, destDir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.copy(srcDir, destDir)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function makeDirectory(dir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.ensureDir(dir)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function printSuccessMessage() {
    console.log();
    console.log('Success');
}
function printErrorMessage(err) {
    console.log();
    console.error('Installation failed:', err.message);
    console.log();
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var options, srcDir, destDir, isExist, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = program.opts();
                    srcDir = path_1.default.resolve(__dirname, '../template');
                    destDir = path_1.default.resolve(process.cwd(), options.path);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(destDir)];
                case 1:
                    isExist = _a.sent();
                    if (!isExist) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, checkDirectoryIsAvailable(destDir)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, copyTemplate(srcDir, destDir)];
                case 4:
                    _a.sent();
                    printSuccessMessage();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    printErrorMessage(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
                case 7: return [4 /*yield*/, makeDirectory(destDir)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, copyTemplate(srcDir, destDir)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
