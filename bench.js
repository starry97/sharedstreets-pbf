"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var benchmark_1 = __importDefault(require("benchmark"));
var sharedstreestsPbf = __importStar(require("./index"));
var geometryBuffer = fs_1.default.readFileSync(path_1.default.join("test", "in", "11-602-769.geometry.pbf"));
var intersectionBuffer = fs_1.default.readFileSync(path_1.default.join("test", "in", "11-602-769.intersection.pbf"));
var metadataBuffer = fs_1.default.readFileSync(path_1.default.join("test", "in", "11-602-769.metadata.pbf"));
var referenceBuffer = fs_1.default.readFileSync(path_1.default.join("test", "in", "11-602-769.reference.pbf"));
/**
 * Benchmark Results
 *
 * geometry x 1,336 ops/sec ±2.14% (85 runs sampled)
 * intersection x 1,160 ops/sec ±2.98% (83 runs sampled)
 * metadata x 229 ops/sec ±2.10% (82 runs sampled)
 * reference x 974 ops/sec ±1.84% (88 runs sampled)
 */
var suite = new benchmark_1.default.Suite("sharedstreets-pbf");
suite
    .add("geometry", function () { return sharedstreestsPbf.geometry(geometryBuffer); })
    .add("intersection", function () { return sharedstreestsPbf.intersection(intersectionBuffer); })
    .add("metadata", function () { return sharedstreestsPbf.metadata(metadataBuffer); })
    .add("reference", function () { return sharedstreestsPbf.reference(referenceBuffer); })
    .on("cycle", function (e) { return process.stdout.write(String(e.target) + "\n"); })
    .run();
