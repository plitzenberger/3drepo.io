/**
 *  Copyright (C) 2014 3D Repo Ltd
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var config = require('app-config').config;

var log = require('./js/core/login.js');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');

var app = express();

app.locals.pretty = true;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(compress({
    threshold: 512
}));
app.use(methodOverride());

var routes = require('./routes.js')();

app.use('/', routes.router);

// Attach the encoders to the router
var x3dom_encoder = require('./js/core/encoders/x3dom_encoder.js').route(routes);
var json_encoder = require('./js/core/encoders/json_encoder.js').route(routes);
var html_encoder = require('./js/core/encoders/html_encoder.js').route(routes);
var src_encoder = require('./js/core/encoders/src_encoder.js').route(routes);
var jpg_encoder = require('./js/core/encoders/jpeg_encoder.js').route(routes);
var bin_encoder = require('./js/core/encoders/bin_encoder.js').route(routes);

exports.app = app