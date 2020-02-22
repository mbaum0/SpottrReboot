import spottrSiteRepo from "./spottrSiteRepo";
import parkingLotRepo from "./parkingLotRepo";
import masterNodeRepo from "./masterNodeRepo";
import slaveNodeRepo from "./slaveNodeRepo";
import parkingSpotRepo from "./parkingSpotRepo";
import dbLogRepo from "./dbLogRepo";

const repositories = {
    spottrSite: spottrSiteRepo,
    parkingLot: parkingLotRepo,
    masterNode: masterNodeRepo,
    slaveNode: slaveNodeRepo,
    parkingSpot: parkingSpotRepo,
    dbLog: dbLogRepo
};

export const repositoryFactory = {
    get: name => repositories[name]
}