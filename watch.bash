#!/bin/bash -x

clear

# start stylus
stylus -w stylus -o css &

# start browserify
watchify client.js -o client.compiled.js &