import spottrSiteRepo from "./spottrSiteRepo";
import parkingLotRepo from "./parkingLotRepo";
import masterNodeRepo from "./masterNodeRepo";
import slaveNodeRepo from "./slaveNodeRepo";
import parkingSpotRepo from "./parkingSpotRepo";
import dbLogRepo from "./dbLogRepo";
import preferenceRepo from "./preferenceRepo";
import spottrSyncRepo from "./spottrSyncRepo";

const repositories = {
    spottrSite: spottrSiteRepo,
    parkingLot: parkingLotRepo,
    masterNode: masterNodeRepo,
    slaveNode: slaveNodeRepo,
    parkingSpot: parkingSpotRepo,
    dbLog: dbLogRepo,
    preference: preferenceRepo,
    spottrSync: spottrSyncRepo,
};

export const repositoryFactory = {
    get: name => repositories[name]
}