#!/bin/bash

expo-cli publish
git tag `date "+deployed_%Y-%m-%d_%H-%M-%S"`
git push --tags
