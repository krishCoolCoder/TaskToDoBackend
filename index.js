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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
// const functions = require('firebase-functions');
// import * as logger from "firebase-functions/logger";
var express = require('express');
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var uri = "mongodb+srv://tasktodouser:tasktodouser@tasktodo.ir517qa.mongodb.net/?retryWrites=true&w=majority";
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 3, 5]);
                    // Connect the client to the server	(optional starting in v4.7)
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect the client to the server	(optional starting in v4.7)
                    _a.sent();
                    // Send a ping to confirm a successful connection
                    return [4 /*yield*/, client.db("admin").command({ ping: 1 })];
                case 2:
                    // Send a ping to confirm a successful connection
                    _a.sent();
                    // logger.info("Pinged your deployment. You successfully connected to MongoDB!", {structuredData: true});
                    console.log("Pinged your deployment. You successfully connected to MongoDB!");
                    return [3 /*break*/, 5];
                case 3: 
                // Ensures that the client will close when you finish/error
                return [4 /*yield*/, client.close()];
                case 4:
                    // Ensures that the client will close when you finish/error
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//   run().catch(console.dir);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
var client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
var app = express();
app.get('/', function (req, res) {
    var date = new Date();
    run().catch(console.dir);
    var hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
    res.send("\n      <!doctype html>\n      <head>\n        <title>Time</title>\n        <link rel=\"stylesheet\" href=\"/style.css\">\n        <script src=\"/script.js\"></script>\n      </head>\n      <body>\n        <p>In London, the clock strikes:\n          <span id=\"bongs\">".concat('BONG '.repeat(hours), "</span></p>\n        <button onClick=\"refresh(this)\">Refresh</button>\n      </body>\n    </html>"));
});
app.get('/api', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var date, hours;
    return __generator(this, function (_a) {
        date = new Date();
        hours = (date.getHours() % 12) + 1;
        res.json({ bongs: 'BONG '.repeat(hours) });
        return [2 /*return*/];
    });
}); });
app.get('/test', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                // res.json({message: 'Hello world. ',task: "Its time to go ahead with your task."});
                _b = (_a = res).json;
                _c = {};
                return [4 /*yield*/, client.db("admin").command({ ping: 1 })];
            case 1:
                // res.json({message: 'Hello world. ',task: "Its time to go ahead with your task."});
                _b.apply(_a, [(_c.test = _d.sent(), _c)]);
                return [2 /*return*/];
        }
    });
}); });
app.get('/love', function (req, res) {
    res.json({ message: 'I love you. ', task: "I know you are excited to do your tasks now. Go for it. Do the work my love." });
});
app.get('/hello', function (req, res) {
    res.json({ message: 'Hello world.', task: "Hi there, now it is time to work on a miracle." });
});
app.listen(3000, function () {
    console.log("Example app listening on port ".concat(3000));
});
// exports.app = functions.https.onRequest(app);
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
