/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	//import React from 'react';
	//import { render } from 'react-dom';
	//import { Modal, ModalHead, ModalBody, ModalFooter } from '../../build';


	window.onload = function () {
	    try {
	        handleToke(showAddressModal);
	        loadMapsApi();

	        // TESTER
	        $('.option-toggle-wrapper').click(function () {
	            var wrapper = $(this),
	                wrapperWidth = wrapper.Width();
	            console.log(wrapperWidth);
	        });
	    } catch (e) {
	        console.log(e);
	    }
	};

	function showAddressModal(hasAddress) {
	    // CHECK IF WE HAVE USER ADDRESS
	    if (!hasAddress) {
	        // PROMPT FOR ADDRESS
	        $('.settings-container').addClass('open');
	    }
	    // add btn LISTENER
	    $('.btn-save-addres').click(function () {
	        var markLocation = getModalAddress();
	    });
	}

/***/ }
/******/ ]);