"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var load_json_file_1 = __importDefault(require("load-json-file"));
var path = __importStar(require("path"));
var sharedstreets_api_1 = require("sharedstreets-api");
var tape_1 = __importDefault(require("tape"));
var write_json_file_1 = __importDefault(require("write-json-file"));
var sharedstreetsPbf = __importStar(require("./"));
var layers = ["geometry", "intersection", "metadata", "reference"];
var tile = [1186, 1466, 12];
var x = tile[0], y = tile[1], z = tile[2];
var domain = "tiles.sharedstreets.io/planet-180312";
// Download Tile
// Set Environment Variable `export DOWNLOAD=true` to regenerate
if (process.env.DOWNLOAD) {
    layers.forEach(function (layer) {
        sharedstreets_api_1.downloadTile(tile, layer, { domain: domain }).then(function (data) {
            var filepath = path.join(__dirname, "test", "in", z + "-" + x + "-" + y + "." + layer + ".pbf");
            fs.writeFileSync(filepath, data);
        });
    });
}
var pbf = sharedstreetsPbf;
layers.forEach(function (layer) {
    tape_1.default("sharedstreets-pbf -- " + layer, function (t) {
        var filepath = path.join(__dirname, "test", "in", z + "-" + x + "-" + y + "." + layer + ".pbf");
        var outfile = path.join(__dirname, "test", "out", z + "-" + x + "-" + y + "." + layer + ".json");
        var _a = path.parse(filepath), name = _a.name, base = _a.base;
        var buffer = fs.readFileSync(filepath);
        var result = pbf[layer](buffer);
        // Save Result
        // Set Environment Variable `export REGEN=true` to regenerate
        if (process.env.REGEN) {
            write_json_file_1.default.sync(outfile, result);
        }
        t.deepEqual(result, load_json_file_1.default.sync(outfile), name);
        t.end();
    });
});
