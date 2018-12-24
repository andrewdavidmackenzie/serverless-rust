build:	| www
	wasm-pack build

clean: 
	rm -rf www

www:
	npm init wasm-app www
	cd www && npm install
	cd pkg && npm link
	cd www && npm link serverless-rust

run: build
	cp ./index.js www/
	cd www && npm run build && npm run start
