const {
    chain: { getApi },
} = require("@osn/scan-common");
const {
    toDecimal
} = require("./unitConversion");



async function getIdentityStorage(accountId) {
    const api = await getApi();
    const identityInfo = await api.query.identity.identityOf(accountId);
    let identity = {};
    if (identityInfo.isSome) {
        const { info, judgements, deposit } = identityInfo.unwrap();
        identity.info = {
            display: info.display.asRaw.toUtf8(),
            legal: info.legal.asRaw.toHuman(),
            web: info.web.asRaw.toHuman(),
            riot: info.riot.asRaw.toHuman(),
            email: info.email.asRaw.toHuman(),
            image: info.image.asRaw.toHuman(),
            twitter: info.twitter.asRaw.toHuman(),
            pgpFingerprint: info.pgpFingerprint.isSome ? info.pgpFingerprint.unwrap().toHex() : null,
        };
        identity.deposit = await toDecimal(deposit.toNumber());
        if (judgements.length > 0) {
            let judgementsList = [];
            judgements.forEach(([registrarIndex, judgement]) => {
                let judgementInfo = {
                    registrarIndex: registrarIndex.toNumber(),
                    judgement: judgement.toString()
                };
                judgementsList.push(judgementInfo);
            });
            identity.judgements = judgementsList;
        }
    }
    identity.accountId = accountId;
    return identity;
}

module.exports = {
    getIdentityStorage
}
