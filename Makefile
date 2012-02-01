TESTS = $(wildcard test/*.test.js) $(wildcard test/expectations/*.test.js)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter dot \
		$(TESTS)

.PHONY: test