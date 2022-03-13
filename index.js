/*! timidity. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! Lumière Élevé <https://ltgc.cc/project/?view=timidity-sf2> */

"use strict";

// Initialization
const Debug = require('debug');
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const LibTimidity = require('./libtimidity');
const debug = Debug('timidity');
const debugVerbose = Debug('timidity:verbose');

// The processor we'll be dealing with
let processor;

// Legit values for the buffer
const legitBuffer = [
	4096, // 92.88ms
	8192, // 185.76ms
	16384 // 371.52ms
];

// Simple generation for using SF2 SoundFont files.
const useSf2Cfg = function (name) {
	return `soundfont ${name}`;
};

// Initial audio parameters
const audioParams = {
	sample: 44100, // CD standard
	format: 32784, // s16, CD standard
	channel: 2, // Stereo
	segmentByte: 4, // 2x2 (16 bits = 2 bytes, with stereo)
	buffer: 16384 // Keeping the good old default
};

const audioProcessor = function (event) {
	// Placeholder.
};
const setBufferSize = function (size) {
	if (legitBuffer.includes(size)) {} else {
		throw(new Error(`Illegal buffer size ${size}`));
	};
};
const getNode = function () {
	return processor;
};
const startNode = function (options = {}) {
	if (!processor) {
		if (options.context) {
			processor = options.context.createScriptProcessor();
			processor.addEventListener("audioprocess", audioProcessor);
		} else {
			throw(new Error("No attached context"));
		};
	};
	return processor;
};

// No initialization yet.
