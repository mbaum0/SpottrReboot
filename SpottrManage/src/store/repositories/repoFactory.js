import spottrSiteRepo from "./spottrSiteRepo";
import parkingLotRepo from "./parkingLotRepo";
import masterNodeRepo from "./masterNodeRepo";
import slaveNodeRepo from "./slaveNodeRepo";
import parkingSpotRepo from "./parkingSpotRepo";

const repositories = {
    spottrSite: spottrSiteRepo,
    parkingLot: parkingLotRepo,
    masterNode: masterNodeRepo,
    slaveNode: slaveNodeRepo,
    parkingSpot: parkingSpotRepo
};

export const repositoryFactory = {
    get: name => repositories[name]
}