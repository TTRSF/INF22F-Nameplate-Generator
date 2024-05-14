// import DataExtractor from "./DataExtractor.js";

class DataExtractor {

    langPreferences = ["de", "en"]

    constructor(nameplate) {
        this.nameplate = nameplate;
    }

    extractAllDataV1(baseUrl, nameplate = this.nameplate, path = "", currentCollection = null) {
        let returnObject = {}
        //console.log("loading data for submodelElementCollection")
        //console.log(nameplate)
        for (const nameplateElement of nameplate) {
            switch (nameplateElement.modelType.name) {
                case "MultiLanguageProperty":
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                    break;
                case "SubmodelElementCollection":
                    if (nameplateElement.idShort.match(/(?!Markings)[Mm]arking[\-\w]*/ug)) {
                        let markings
                        if (currentCollection === "Markings") {
                            markings = returnObject;
                        } else if (!returnObject.Markings) {
                            markings = returnObject["Markings"] = {};
                        } else {
                            markings = returnObject.Markings
                        }
                        markings[nameplateElement.idShort] = this.extractAllDataV1(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort, nameplateElement.idShort)
                        if (!("MarkingName" in markings[nameplateElement.idShort])) markings[nameplateElement.idShort]["MarkingName"] = nameplateElement.idShort
                    } else {
                        returnObject[nameplateElement.idShort] = this.extractAllDataV1(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort, nameplateElement.idShort)
                    }
                    break;
                case "Property":
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
                case "File":
                    //returnObject["FilePath"] = baseUrl + "/" + path + "." + nameplateElement.idShort + "/attachment"
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
            }
        }
        //console.log("-----")
        return returnObject
    }

    extractAllDataV3(baseUrl, nameplate = this.nameplate, path = "", currentCollection = null) {
        let returnObject = {}
        //console.log("loading data for submodelElementCollection")
        //console.log(nameplate)
        for (const nameplateElement of nameplate) {
            switch (nameplateElement.modelType) {
                case "MultiLanguageProperty":
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                    break;
                case "SubmodelElementCollection":
                    if (nameplateElement.idShort.match(/(?!Markings)[Mm]arking[\-\w]*/ug)) {
                        let markings
                        if (currentCollection === "Markings") {
                            markings = returnObject;
                        } else if (!returnObject.Markings) {
                            markings = returnObject["Markings"] = {};
                        } else {
                            markings = returnObject.Markings
                        }
                        markings[nameplateElement.idShort] = this.extractAllDataV3(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort, nameplateElement.idShort)
                        if (!("MarkingName" in markings[nameplateElement.idShort])) markings[nameplateElement.idShort]["MarkingName"] = nameplateElement.idShort
                    } else {
                        returnObject[nameplateElement.idShort] = this.extractAllDataV3(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort, nameplateElement.idShort)
                    }
                    break;
                case "Property":
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
                case "File":
                    returnObject["FilePath"] = baseUrl + "/" + path + "." + nameplateElement.idShort + "/attachment"
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
            }
        }
        //console.log("-----")
        return returnObject
    }

    getLangStringValue(json) {
        let langStrings
        if ("langStrings" in json) {
            langStrings = json.langStrings
        } else if ("langString" in json) { //Not to spec but seen in some assets
            langStrings = json.langString
        } else {
            langStrings = json
        }
        for (let langPref of this.langPreferences) {
            for (let langString of langStrings) {
                if (langString.language === langPref) {
                    return langString.text
                }
            }
        }
        if (langStrings.length > 0) {
            return langStrings[0].text
        }
    }
}

const myRequest = new Request("https://v3.admin-shell-io.com/shells/d3d3LmNvbXBhbnkuY29tL2lkcy9hYXMvOTQ2MF84MDQyXzAxOTFfNDQwNw");
const serverAddress = "https://v3.admin-shell-io.com/"
a()
function a() {
    getDataFromServer(myRequest)
        .then(response => {
            if (!response || (Object.hasOwn(response, 'success/') && !response.success)) {
                throw new Error('fault')
            }
            console.log(response)

            console.log("1")
            let assetId = response["identification"] ? response["identification"]["id"] : response["id"]
            let submodels = []
            if (response["submodels"]) {
                submodels = response["submodels"].map((submodelReference) => {
                    return new Promise(async (resolve, reject) => {
                        if (submodelReference["keys"].length === 0) {
                            return reject("No Reference");
                        }
                        let submodelReferenceId = submodelReference["keys"][0]["value"]

                        // let apiVersion = this.analyzeApiVersion(submodelReference) 22
                        let apiVersion = 3

                        let submodelPaths
                        if (apiVersion === 3) {
                            submodelPaths = submodelPathsV3(assetId, submodelReferenceId)
                        } else {
                            submodelPaths = submodelPathsV1(assetId, submodelReferenceId)
                        }
                        let submodelData = {}
                        let tryCount = 1
                        for (const submodelPath of submodelPaths) {
                            submodelData = await getDataFromServer(serverAddress + submodelPath.submodel, true)
                                .then((result) => {
                                    let submodelDataArray
                                    if (!result) return undefined
                                    if (Array.isArray(result)) {
                                        submodelDataArray = result
                                    } else {
                                        submodelDataArray = [result]
                                    }
                                    let returnData = {}
                                    for (const submodelDataElement of submodelDataArray) {
                                        let submodelName = submodelDataElement.idShort
                                        let submodelID = apiVersion === 3 ? submodelReferenceId : submodelDataElement.identification.id
                                        let extractedSubmodelData
                                        let de = new DataExtractor(submodelDataElement["submodelElements"])
                                        if (apiVersion === 3) {
                                            extractedSubmodelData = de.extractAllDataV3(serverAddress + submodelPath.submodelElements)
                                        } else {
                                            extractedSubmodelData = de.extractAllDataV1(serverAddress + submodelPath.submodelElements)
                                        }

                                        returnData = {
                                            ...returnData,
                                            [submodelName]: {
                                                idShort: submodelName,
                                                id: submodelID,
                                                semanticId: loadSemanticID(submodelDataElement),
                                                ...extractedSubmodelData
                                            }
                                        }
                                    }
                                    console.log(returnData)
                                    return returnData
                                })
                            if (submodelData) {
                                break;
                            }
                            console.warn("Using fallback for asset ", assetId, "in try", tryCount)
                            tryCount++
                        }
                        resolve(submodelData)
                    })
                })
            }
            let assetObject = {
                "idShort": response["idShort"],
                "id": assetId,
                "num": 10,
                "productImages": []
            }
            console.log("3")
            let assetRef = loadAssetRef(response)
            if (assetRef) {
                assetObject.AssetRef = assetRef
            }

            
            submodels.map((submodel) => {
                if (!submodel) return
                submodel.then((res) => Object.keys(res).map((key) => {
                    if (!(key in assetObject)) assetObject[key] = res[key]
                    if (key === "TechnicalData") assetObject["productImages"] = searchForKey(res[key], /[pP]roductImage\d*/)
                    window.dispatchEvent(new Event("forceUpdate"))
                })).catch(() => {

                })
            });
            console.log("finish")
            console.log(assetObject)
            console.log("5")
            return assetObject

        })


    submodels.map((submodel) => {
        if (!submodel) return
        submodel.then((res) => Object.keys(res).map((key) => {
            if (!(key in assetObject)) assetObject[key] = res[key]
            if (key === "TechnicalData") assetObject["productImages"] = searchForKey(res[key], /[pP]roductImage\d*/)
            window.dispatchEvent(new Event("forceUpdate"))
        })).catch(() => {

        })
    });

    return assetObject


}
function getDataFromServer(address, silent = false) {
    // console.log("Making request to " + address);
    // this.requestCount[address] ? this.requestCount[address]++ : this.requestCount[address] = 1  kommentare
    return fetch(address)
        .then(response => {
            if (!response.ok) {
                if (!silent) {
                    console.error("Fetch not successful")
                }
                return undefined
            }

            return response.json().then(jsonResponse => {
                return jsonResponse;
            }).catch(err => {
                console.warn(response, err)
            })
        })
        .catch(err => {
            // if (!silent) {
            //     console.log({ success: false, text: err })
            //     this.apiVersion = -1
            //     window.dispatchEvent(new CustomEvent("apiVersionSet", { detail: { apiVersion: this.apiVersion } }))
            // }
            return undefined
        });
}
function base64UrlEncode(str) {
    // Encode the string to Base64
    let base64 = window.btoa(str);

    // Replace characters incompatible with URL encoding
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

    return base64;
}

function submodelPathsV3(aasIdentifier, submodelIdentifier) {
    return [
        {
            submodel: `shells/${base64UrlEncode(aasIdentifier)}/submodels/${base64UrlEncode(submodelIdentifier)}/submodel`,
            submodelElements: `shells/${base64UrlEncode(aasIdentifier)}/submodels/${base64UrlEncode(submodelIdentifier)}/submodel/submodelelements`
        },
        {
            submodel: `submodels/${base64UrlEncode(submodelIdentifier)}`,
            submodelElements: `submodels/${base64UrlEncode(submodelIdentifier)}/submodelelements`
        }
    ]
}

function loadSemanticID(submodel) {
    return submodel && submodel.semanticId && submodel.semanticId.keys && submodel.semanticId.keys[0] && submodel.semanticId.keys[0].value
}

function loadAssetRef(asset) {
    if (asset && asset["assetRef"] && asset["assetRef"]["keys"] && asset["assetRef"]["keys"][0]) {
        return asset["assetRef"]["keys"][0]["value"]
    }
    // Get A rev for V3 Servers (Not really AssetRef)
    /*else if(asset&&asset["assetInformation"]&&asset["assetInformation"]["globalAssetId"]&&asset["assetInformation"]["globalAssetId"]["keys"]&&asset["assetInformation"]["globalAssetId"]["keys"][0]){
        return asset["assetInformation"]["globalAssetId"]["keys"][0]["value"]
    }*/
    return undefined
}

function searchForKey(json, regex) {
    let returnList = []
    if (typeof json === "object") {
        for (let key in json) {
            if (regex.test(key) && json["FilePath"]) {
                returnList.push(json["FilePath"]);
            }
            returnList = returnList.concat(this.searchForKey(json[key], regex));
        }
    }
    return returnList;
}

