default: build

all: test

test:
	cargo test

build:
	cargo build --target wasm32-unknown-unknown --release

build-optimized:
	cargo build --target wasm32-unknown-unknown --release
	soroban contract optimize --wasm target/wasm32-unknown-unknown/release/contributor_recognition.wasm

clean:
	cargo clean

fmt:
	cargo fmt --all
