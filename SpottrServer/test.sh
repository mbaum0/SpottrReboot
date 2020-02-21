#!/bin/bash

# colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NOCOLOR='\033[0m'

HOSTNAME="localhost"
PORT=8000

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

post_tests=(
    ["spottrsites"]="{'sitename':'testsite', 'address':'1 testsite drive'}"
)

# test the error case
resp=$(curl -s -X "GET" http://${HOSTNAME}:${PORT}/api/error)
    if [[ $resp != *"error"* ]]; then
        printf "${RED}[FAILED]${NOCOLOR}"
    else
        printf "${GREEN}[PASSED]${NOCOLOR}"
    fi

    printf " Test [GET] error case\n"

# test the GET cases. these should all pass
for i in "${get_tests[@]}"; do
    resp=$(curl -s -X "GET" http://${HOSTNAME}:${PORT}/api/$i)

    if [[ $resp == *"error"* ]]; then
        printf "${RED}[FAILED]${NOCOLOR}"
    else
        printf "${GREEN}[PASSED]${NOCOLOR}"
    fi

    printf " Test [GET] ${i}\n"
done

# this test is borked, pls fix
for i in "${!post_tests[@]}"; do
    resp=$(curl -s --header "Content-Type: application/json" --request POST --data ${post_tests[$i]} http://${HOSTNAME}:${PORT}/api/$i)

    if [[ $resp == *"error"* ]]; then
        printf "${RED}[FAILED]${NOCOLOR}"
    else
        printf "${GREEN}[PASSED]${NOCOLOR}"
    fi

    printf " Test [POST] ${i}\n"
done