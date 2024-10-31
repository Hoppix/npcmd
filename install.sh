#!/usr/bin/env bash


cd "$(dirname "$0")"

main() {
    git clone https://github.com/Hoppix/npcmd/
    pushd npcmd
    npm install
    npm link
    popd
    npcmd
}

main "$@"
