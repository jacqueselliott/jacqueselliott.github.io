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
  var increment = 0.1;
  if (magnitude >= 5 * increment) {
    reconciliation = increment;
  } else if (magnitude >= 0.5 * increment) {
    reconciliation = 0.5 * increment;
  } else {
    reconciliation = magnitude;
  }
  var vecDifference = Vector.times(relativeChar, -reconciliation);

  cameraX -= vecDifference.x;
  cameraY -= vecDifference.y;
  relativeChar.add(vecDifference);
}