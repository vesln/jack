TESTS = test/*.test.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter dot \
		$(TESTS)

.PHONY: test