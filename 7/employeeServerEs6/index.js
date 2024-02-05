import * as http from 'http';
import * as path from 'path';

import fetch from 'node-fetch';

// define "require"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
const app = express();

const { port, host } = require('./config.json');

import { fileURLToPath } from 'url';
const __dirname = fileURLToPath('.', import.meta.url);