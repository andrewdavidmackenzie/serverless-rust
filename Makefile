run: build
	cp ./index.js www/
	cd www && npm run build && npm run start

build:	setup www package

setup: | .setup

.setup:
	rustup override set nightly
	touch .setup

clean: 
	rm -f .setup
	rm -rf pkg
	rm -rf www

package:
	wasm-pack build
	cd pkg && npm link

www:
	npm init wasm-app www
	cd www && npm install
	cd www && npm link serverless-rust
