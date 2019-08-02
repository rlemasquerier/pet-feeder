/* Compute radius of the circle that will be used for the rounded header

roundnessRatio : the side height of the header over the middle height of the header
                 (i.e. 1 means flat header) 
*/

export const computeHeaderRadius = (
  roundnessRatio: number,
  headerHeight: number,
  screenWidth: number
): number =>
  (((screenWidth * screenWidth) / 4 +
    (1 - roundnessRatio) * (1 - roundnessRatio) * headerHeight * headerHeight) *
    screenWidth) /
  (2 * screenWidth * headerHeight * (1 - roundnessRatio));
