export function getHand(handedNess) {
  var cleaned = handedNess.filter(function (hand) {
    return hand.label != "undefined";
  });

  return cleaned.map(function (hand) {
    //horizontal transform on the camera feed was adding unnecessary latency, this is faster
    if (hand.label == "Left") return "Right";
    if (hand.label == "Right") return "Left";
  });
}

export function handInHotZone(hotZones, hand) {}

export function coordsInSameSpace(oldCoords, newCoords, range) {
  return (
    pointIsWithinRangeOfOtherPoint(oldCoords.x, newCoords.x, range) &&
    pointIsWithinRangeOfOtherPoint(oldCoords.y, newCoords.y, range) &&
    pointIsWithinRangeOfOtherPoint(oldCoords.z, newCoords.z, range)
  );
}

export function pointIsWithinRangeOfOtherPoint(
  targetPoint,
  candidatePoint,
  range
) {
  const tempUpper = targetPoint + targetPoint / range;
  const tempLower = targetPoint - targetPoint / range;
  return candidatePoint <= tempUpper && candidatePoint >= tempLower;
}

export function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
