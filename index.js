"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var minimal_1 = require("protobufjs/minimal");
var proto_1 = require("./proto");
__export(require("./proto/index"));
/**
 * Geometry Pbf
 *
 * Parser for SharedStreets Geometry Pbf Buffers
 *
 * @param {Buffer} buffer Pbf Buffer
 * @returns {Array<SharedStreetsGeometry>} An Array of SharedStreet Geometry
 * @example
 * const buffer = fs.readFileSync('z-x-y.geometry.pbf')
 *
 * const geoms = sharedstreetsPbf.geometry(buffer)
 * geoms[0].id // => '81f666c5e1e4de0f7df4fbd793d909b2'
 */
function geometry(buffer) {
    return readBuffer(buffer, proto_1.SharedStreetsProto.SharedStreetsGeometry);
}
exports.geometry = geometry;
/**
 * Intersection Pbf
 *
 * Parser for SharedStreets Intersection Pbf Buffers
 *
 * @param {Buffer} buffer Pbf Buffer
 * @returns {Array<SharedStreetsIntersection>} An Array of SharedStreet Intersections
 * @example
 * const buffer = fs.readFileSync('z-x-y.intersection.pbf')
 *
 * const intersections = sharedstreetsPbf.intersection(buffer)
 * intersections[0].id // => '8037a9444353cd7dd3f58d9a436f2537'
 */
function intersection(buffer) {
    return readBuffer(buffer, proto_1.SharedStreetsProto.SharedStreetsIntersection);
}
exports.intersection = intersection;
/**
 * Reference Pbf
 *
 * Parser for SharedStreets Reference Pbf Buffers
 *
 * @param {Buffer} buffer Pbf Buffer
 * @returns {Array<SharedStreetsReferencePbf>} An Array of SharedStreet References
 * @example
 * const buffer = fs.readFileSync('z-x-y.reference.pbf')
 *
 * const references = sharedstreetsPbf.reference(buffer)
 * references[0].id // => '41d73e28819470745fa1f93dc46d82a9'
 */
function reference(buffer) {
    return readBuffer(buffer, proto_1.SharedStreetsProto.SharedStreetsReference);
}
exports.reference = reference;
/**
 * Metadata Pbf
 *
 * Parser for SharedStreets Metadata Pbf Buffers
 *
 * @param {Buffer} buffer Pbf Buffer
 * @returns {Array<SharedStreetsMetadata>} An Array of SharedStreet Metadatas
 * @example
 * const buffer = fs.readFileSync('z-x-y.metadata.pbf')
 *
 * const metadatas = sharedstreetsPbf.metadata(buffer)
 * metadatas[0].geometryID // => '81f666c5e1e4de0f7df4fbd793d909b2'
 */
function metadata(buffer) {
    return readBuffer(buffer, proto_1.SharedStreetsProto.SharedStreetsMetadata);
}
exports.metadata = metadata;
/**
 * Decode Delimited buffers using protobufjs
 *
 * @param {Buffer|Uint8Array} buffer Pbf Buffer
 * @param {any} parser Protobufjs Parser
 * @returns {Object[]} An Array of based on given Protobufjs Parser
 * @example
 * const parser = sharedstreetsPbf.SharedStreetsProto.GISMetadata;
 * const results = sharedstreetsPbf.readBuffer(buffer, parser);
 */
function readBuffer(buffer, parser) {
    var results = [];
    var reader = new minimal_1.Reader(buffer);
    while (reader.pos < reader.len) {
        var message = parser.decodeDelimited(reader);
        var options = minimal_1.util.toJSONOptions;
        options.defaults = true;
        var json = parser.toObject(message, options);
        results.push(json);
    }
    return results;
}
exports.readBuffer = readBuffer;
