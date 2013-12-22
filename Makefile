# Run the tests on SauceLabs only when
# the current node version is the following:

NODE_VERSION = v0.10.

all: browser

# Install node modules and components

install: node_modules components

# Standalone

browser: node_modules components
	@./node_modules/.bin/component-build -s jack -o .
	@mv build.js jack.js

# Development

build: components
	@./node_modules/.bin/component-build --dev

test-node:
	@./node_modules/.bin/hydro

test-browser:
	@./node_modules/.bin/karma start

test-sauce:
	@TEST_ENV=sauce RUN_ON=$(NODE_VERSION) ./node_modules/.bin/karma start

# CI

ci: components build test-node test-sauce

# Clean

clean: clean-node clean-browser clean-components

clean-node:
	@rm -rf node_modules

clean-browser:
	@rm -f jack.js

clean-components:
	@rm -rf build
	@rm -rf components

# Support

components: node_modules component.json
	@./node_modules/.bin/component-install --dev

node_modules: package.json
	@npm install

.PHONY: all browser node_modules
