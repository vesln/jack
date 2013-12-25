# Run the tests on SauceLabs only when
# the current node version is the following:

SAUCE_NODE_VERSION = v0.10.

#
# Variables
#

MIN = jack.min.js
KARMA = node_modules/.bin/karma
UGLIFY = node_modules/uglify-js/bin/uglifyjs
BROWSER = jack.js
COV_EXEC = node_modules/.bin/_hydro
TEST_EXEC = node_modules/.bin/hydro
ISTANBUL = node_modules/.bin/istanbul
COVERALLS = node_modules/coveralls/bin/coveralls.js
COMPONENT_BUILD = node_modules/.bin/component-build
COMPONENT_INSTALL = node_modules/.bin/component-install

#
# All
#

all: install test

#
# Install
#

install: node_modules components build browser

#
# Browser build
#

browser: node_modules components
	@$(COMPONENT_BUILD) -s jack -o .
	@mv build.js $(BROWSER)
	@$(UGLIFY) $(BROWSER) --output $(MIN)

#
# Make a new development build
#

build: node_modules components
	@$(COMPONENT_BUILD) --dev

#
# Run all tests
#

test: test-node test-browser

# Run the Node.js tests

test-node: node_modules
	@$(TEST_EXEC)

#
# Run the browser tests
#

test-browser: node_modules components build
	@$(KARMA) start

#
# Test coverage
#

test-cov: node_modules
	@$(ISTANBUL) cover $(COV_EXEC) -- --formatter hydro-silent

#
# Run the tests on SauceLabs
#

test-sauce: node_modules components build
	@TEST_ENV=sauce KARMA_RUN_ON=$(SAUCE_NODE_VERSION) $(KARMA) start

#
# Clean all
#

clean: clean-node clean-browser clean-components clean-cov

#
# Clean node_modules
#

clean-node:
	@rm -rf node_modules

#
# Clean the browser build
#

clean-browser:
	@rm -f $(BROWSER)
	@rm -f $(MIN)

#
# Clean components & build
#

clean-components:
	@rm -rf build
	@rm -rf components

#
# Clean the test coverage
#

clean-cov:
	@rm -rf coverage

#
# CI
#

ci: test-node test-sauce coveralls

#
# Send coverage to coveralls
#

coveralls: node_modules
	@$(ISTANBUL) cover $(COV_EXEC) --report lcovonly && cat ./coverage/lcov.info | $(COVERALLS)

#
# Install all components (+ dev)
#

components: node_modules component.json
	@$(COMPONENT_INSTALL) --dev

#
# Install Node.js modules
#

node_modules:
	@npm install

#
# Instructions
#

.PHONY: all test coverage browser build components
