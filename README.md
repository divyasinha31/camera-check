### Camera coverage check
---

**Problem Statement**: Suppose we want to construct a versatile software camera by combining many inflexible hardware cameras. Each hardware camera works well for a particular range of subject distances and for a particular range of light levels. The software camera will measure the light level and subject distance of each shot and choose an appropriate hardware camera to capture it. There are many hardware cameras on the market, and we are considering various proposals for which ones to include in our design. Write a function that takes the desired characteristics of the software camera (range of subject distances and range of light levels that it should support) and a list of hardware cameras with their respective characteristics, and tests whether that set of hardware cameras will suffice.

**Solution Approach**
- Extract the desired range boundaries.
- Loop through the 2D space using a nested loop.
	- The outer loop goes from `minDistance` to `maxDistance`.
	- The inner loop goes from `minLight` to `maxLight`.
- For each (distance, light) point
	- We initialize the flag, `covered = false`.
	- We unpack each hardware camera's distance and light range.
	- We check if the current point falls inside both ranges, distance and light.
- If no camera covers the entire range and there's a gap, we immediately `return false` and break from loop or at the end of the function, we `return true`.