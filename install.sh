#!/usr/bin/env bash


cd "$(dirname "$0")"

main() {
    git clone git@github.com:Hoppix/npcmd.git
    pushd npcmd
    npm install
    tsc
    npm link
    popd
    npcmd
}

main "$@"
