#!/bin/bash
cd build/
npm ci --omit="dev"
node bin/server.js