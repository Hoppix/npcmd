#!/usr/bin/env bash

set -eo pipefail
set -x 

cd "$(dirname "$0")"

main() {
    git clone git@github.com:Hoppix/npcmd.git
    pushd npcmd
    sudo npm install
    tsc
    sudo npm link
    popd
    npcmd
}

main "$@"
