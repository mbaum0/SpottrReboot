#!/bin/bash

# This script tries every endpoint of the API and reports whether the operation succeeded or failed.
# Currently failure status is reported by the API returning a failure message. This should probably
# be expanded upon.

test_spottr_api() (
    # Program Arguments (With default values)
    HOSTNAME=${1:-localhost}
    PORT=${2:-8000}

    # Colors
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    NOCOLOR='\033[0m'

    PASS="${GREEN}[PASSED]${NOCOLOR}"
    FAIL="${RED}[FAILED]${NOCOLOR}"
    API_URL="http://${HOSTNAME}:${PORT}/api"
    ERRVAL=0

    # GET TESTS
    get_tests=(
        spottrsites
        spottrsites/1
        spottrsites/1/parkinglots
        parkinglots
        parkinglots/1
        parkinglots/1/spottrnodes
        parkinglots/1/masternodes
        parkinglots/1/slavenodes
        parkinglots/1/parkingspots
        spottrnodes
        spottrnodes/1
        slavenodes
        slavenodes/1
        masternodes
        masternodes/1
        masternodes/1/slavenodes
        parkingspots
    )

    # These are failing due to some error where the entire value isnt being sent
    # This gives a json formatting error
    post_tests=(
        ["spottrsites"]="{\"sitename\":\"testsite\",\"address\":\"1 testsite drive\"}"
        ["parkinglots"]='{"lotname":"testlot", "spottrsite":"0", "perimeter":"[]"}'
        ["masternodes"]='["nodename": "testmasternode", "parkinglot": "0", "location":"testlocation", "numsensors": "3", "hostname": "testhost"}'
        ["slavenodes"]='["nodename": "testmasternode", "parkinglot": "0", "location":"testlocation", "numsensors": "3", "masternode": "0"}'
        ["parkingspots"]='["spotname": "testspot", "spottrnode": 0, "sensornum": 3, "occupied": 0, "longitude": 76.6, "latitude": 50.1]'
    )

    #-----------
    #-- USAGE --
    #-----------
    usage() {
        printf "
Spottr API tester V2.0
usage: $0 [hostname] [port]

"
    }

    #----------
    #-- MAIN --
    #----------
    # Test the error case
    resp=$(curl -s -X "GET" ${API_URL}/error 2>/dev/null)
    [[ $resp != *"error"* ]] && printf "${FAIL}" || printf "${PASS}"
    printf " Test [GET] error case\n"

    # Test the GET cases. these should all pass
    for test in "${get_tests[@]}"; do
        resp=$(curl -s --request GET ${API_URL}/$test 2>/dev/null)
        [[ $resp == *"error"* ]] && printf "${FAIL}" || printf "${PASS}"
        printf " Test [GET] $test\n"
    done

    # Test the POST cases. these should all pass
    for i in "${!post_tests[@]}"; do
        resp=$(curl -s --header "Content-Type: application/json" --request POST --data ${post_tests[$i]} ${API_URL}/$i 2>/dev/null)
        [[ $resp == *"Error"* ]] && printf "${FAIL}" || printf "${PASS}"
        printf " Test [POST] ${i}\n"
    done

    return $ERRVAL
)

test_spottr_api $@
