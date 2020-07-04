const MODEL_URL = './models'
const referenceImage = document.getElementById('reference')
const testImage = document.getElementById('test')

async function app() {

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)

    const img = referenceImage
    const queryImage1 = testImage

    const results = await faceapi
        .detectAllFaces(referenceImage)
        .withFaceLandmarks()
        .withFaceDescriptors()

    if (!results.length) {
        return
    }

    // create FaceMatcher with automatically assigned labels
    // from the detection results for the reference image
    const faceMatcher = new faceapi.FaceMatcher(results)
    console.log(faceMatcher)

    const singleResult = await faceapi
        .detectSingleFace(queryImage1)
        .withFaceLandmarks()
        .withFaceDescriptor()

    if (singleResult) {
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
        console.log(bestMatch.toString())
    }

}

app();