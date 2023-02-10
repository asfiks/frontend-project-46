install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage