function cameraNeedsReconciling() {
  if (relativeChar.isZero()) {
    return false;
  }
  return true;
}

function reconcileCamera() {
  var magnitude = relativeChar.magnitude();
  if (magnitude == 0) {
    return;
  }
  var reconciliation;
  var increment = dxy;
  if (magnitude >= 4 * increment) {
    reconciliation = increment;
  } else if (magnitude >= 1 * increment) {
    reconciliation = 0.6 * increment;
  } else {
    reconciliation = magnitude;
  }
  var vecDifference = Vector.times(relativeChar.direction(), -reconciliation);

  cameraX -= vecDifference.x;
  cameraY -= vecDifference.y;
  relativeChar.add(vecDifference);
}