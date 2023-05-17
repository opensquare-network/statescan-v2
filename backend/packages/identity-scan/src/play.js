require("dotenv").config();
const {
    chain: {getApi, setSpecHeights, subscribeFinalizedHeight},
} = require("@osn/scan-common");
const {handleBlock} = require("./scan/block");
const {
    identity: {initIdentityScanDb},
} = require("@statescan/mongo");
const {deleteFrom} = require("./scan/delete");
const {
    identity: {
        getIdentityTimelineCollection
    }
} = require("@statescan/mongo");
const {
    identity: {
        getIdentityDb
    },
} = require("@statescan/mongo");

async function main() {
    await initIdentityScanDb();
    await subscribeFinalizedHeight();
    // blockHeights for collection registarsTimeline, identity, subIdentity
/*    const blockHeights =
        [   17935411, 17877876, //registrarTimeline
            17914288, 17884357, //identity
            17664915,  //subIdentity
            10957429, 10957452, 17664901, 17664907, 17664910, 17664915, //identityTimeline
            17935340, 17935363 , 17935385 //identityTimeline
        ];*/

    const blockHeights = [
        10957429, 10957452, 17664901, 17664907, 17664910, 17664915, //identityTimeline
    ]
    const db = await getIdentityDb();
    const api = await getApi();
    let toScanHeight = await db.getNextScanHeight();
    await deleteFrom(toScanHeight);
    const identityTimelineCollection = await getIdentityTimelineCollection();
    identityTimelineCollection.drop();
    for (const height of blockHeights) {
        await setSpecHeights([height - 1]);

        const blockHash = await api.rpc.chain.getBlockHash(height);
        const block = await api.rpc.chain.getBlock(blockHash);
        const allEvents = await api.query.system.events.at(blockHash);

        await handleBlock({
            height, block: block.block, events: allEvents,
        });
        console.log(`${height} finished`);
    }

    console.log("finished");
    process.exit(0);
}

main().then(console.log);
