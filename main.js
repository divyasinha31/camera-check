/**
 * Check if the software camera coverage is sufficient.
 * 
 * @param {Array<number>} desiredDistanceRange - [minDistance, maxDistance]
 * @param {Array<number>} desiredLightRange - [minLight, maxLight]
 * @param {Array<Array<Array<number>>>} hardwareCameras - Each camera is [[minDist, maxDist], [minLight, maxLight]]
 * @returns {boolean} - Returns if all the hardware cameras cover the full desired area
 */
function isSoftwareCameraCovered(desiredDistanceRange, desiredLightRange, hardwareCameras) {
    const [minDist, maxDist] = desiredDistanceRange;
    const [minLight, maxLight] = desiredLightRange;

    // Looping through every point in desired range
    for (let dist = minDist; dist <= maxDist; dist++) {
        for (let light = minLight; light <= maxLight; light++) {
            let covered = false;

            // Checking if the current (distance, light) is covered by any hardware camera
            for (const [[camMinDist, camMaxDist], [camMinLight, camMaxLight]] of hardwareCameras) {
                if (((camMinDist <= dist) && (dist <= camMaxDist)) && ((camMinLight <= light) && (light <= camMaxLight))) {
                    covered = true;
                    break;
                }
            }

            if (!covered) {
                return false; // If found a gap
            }
        }
    }

    return true; // If all points covered
}


// ----------- Example usage for success and failure cases -----------

// Desired software camera ranges
// Hardware cameras: [ [distanceRange], [lightRange] ]
let desiredDistanceRange = [1, 5];
let desiredLightRange = [10, 15];
let hardwareCameras = [
    [[1, 3], [10, 15]],
    [[4, 5], [10, 15]]
];

let result = isSoftwareCameraCovered(desiredDistanceRange, desiredLightRange, hardwareCameras);
console.log(`Coverage is ${result ? '' : 'not '}sufficient.`); // Output will be true

desiredDistanceRange = [1, 3];
desiredLightRange = [10, 15];

hardwareCameras = [
    [[1, 3], [10, 12]],
    [[1, 3], [14, 15]]
];

result = isSoftwareCameraCovered(desiredDistanceRange, desiredLightRange, hardwareCameras);
console.log(`Coverage is ${result ? '' : 'not'} sufficient.`); // Output will be false since there is a gap in light range as 13 is not covered.