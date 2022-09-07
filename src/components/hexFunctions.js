const hexOrientations = {
	"pointy-top": { "cornerAngles": [30, 90, 150, 210, 270, 330], "name": "pointy-top" },
	"flat-top": { "cornerAngles": [0, 60, 120, 180, 240, 300], "name": "flat-top" }
}
// Store all of the q,r directiom vector pairs in an array
const directionVectors = [
	{ "q": +1, "r": 0 }, { "q": +1, "r": -1 }, { "q": 0, "r": -1 }, { "q": -1, "r": 0 }, { "q": -1, "r": +1 }, { "q": 0, "r": +1 }
]


// function cube_ring(center, radius):
// 	var results = []
// # this code doesn't work for radius == 0; can you see why?
// var hex = cube_add(center,
// 	cube_scale(cube_direction(4), radius))
// for each 0 ≤ i < 6:
// for each 0 ≤ j < radius:
// results.append(hex)
// hex = cube_neighbor(hex, i)
// return results

// <> Hex Math functions
function cube_neighbor(center, direction) {
	return { "q": center.q + directionVectors[direction].q, "r": center.r + directionVectors[direction].r }
}
function cube_scale(hex, factor) { return { "q": hex.q * factor, "r": hex.r * factor } }
function cube_direction(direction) { return directionVectors[direction] }
function cube_add(hexA, hexB) { return { "q": hexA.q + hexB.q, "r": hexA.r + hexB.r } }

function cube_ring(center, radius) {
	var results = []
	var hex = cube_add(center, cube_scale(cube_direction(4), radius))
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < radius; j++) {
			results.push(hex)
			hex = cube_neighbor(hex, i)
		}
	}
	return results
}

export { hexOrientations,cube_add, cube_direction, cube_neighbor, cube_ring }