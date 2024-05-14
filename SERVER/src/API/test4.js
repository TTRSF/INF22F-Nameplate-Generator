// Festo_3S7PM0CP4BD




const myRequest = new Request("https://v3.admin-shell-io.com");

// fetch(myRequest)
//     .then((response) => {
//         console.log("response.url =", response.url); // response.url = https://mdn.github.io/dom-examples/fetch/fetch-response/flowers.jpg
//         console.log("hier")
//         console.log(response.body)

//     })


fetch(myRequest)
    .then(response => {
        if (!response.ok) {
            if (!silent) {
                console.error("Fetch not successful")
            }
            return undefined
        }

        return response.json().then(jsonResponse => {
            console.log(jsonResponse)


            let assetId = jsonResponse["identification"] ? jsonResponse["identification"]["id"] : jsonResponse["id"]
            let submodels = []
            if (jsonResponse["submodels"]) {
                submodels = jsonResponse["submodels"].map((submodelReference) => {
                    return new Promise(async (resolve, reject) => {
                        if (submodelReference["keys"].length === 0) {
                            return reject("No Reference");
                        }
                        let submodelReferenceId = submodelReference["keys"][0]["value"]

                        let apiVersion = this.analyzeApiVersion(submodelReference)

                        let submodelPaths
                        if (apiVersion === 3) {
                            submodelPaths = submodelPathsV3(assetId, submodelReferenceId)
                        } else {
                            submodelPaths = submodelPathsV1(assetId, submodelReferenceId)
                        }
                        let submodelData = {}
                        let tryCount = 1
                        for (const submodelPath of submodelPaths) {
                            submodelData = await this.#getDataFromServer(this.serverAddress + submodelPath.submodel, true)
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
                                            extractedSubmodelData = de.extractAllDataV3(this.serverAddress + submodelPath.submodelElements)
                                        } else {
                                            extractedSubmodelData = de.extractAllDataV1(this.serverAddress + submodelPath.submodelElements)
                                        }

                                        returnData = {
                                            ...returnData,
                                            [submodelName]: {
                                                idShort: submodelName,
                                                id: submodelID,
                                                semanticId: this.loadSemanticID(submodelDataElement),
                                                ...extractedSubmodelData
                                            }
                                        }
                                    }
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
                "idShort": jsonResponse["idShort"],
                "id": assetId,
                "num": index,
                "productImages": []
            }
            let assetRef = this.loadAssetRef(jsonResponse)
            if (assetRef) {
                assetObject.AssetRef = assetRef
            }


            submodels.map((submodel) => {
                if (!submodel) return
                submodel.then((res) => Object.keys(res).map((key) => {
                    if (!(key in assetObject)) assetObject[key] = res[key]
                    if (key === "TechnicalData") assetObject["productImages"] = this.searchForKey(res[key], /[pP]roductImage\d*/)
                    window.dispatchEvent(new Event("forceUpdate"))
                })).catch(() => {

                })
            });

            return assetObject
        })

        return jsonResponse;
    }).catch(err => {
        console.warn(response, err)
    })

    .catch(err => {
        if (!silent) {
            console.log({ success: false, text: err })
            this.apiVersion = -1
            window.dispatchEvent(new CustomEvent("apiVersionSet", { detail: { apiVersion: this.apiVersion } }))
        }
        return undefined
    });




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


