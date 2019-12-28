function cameraNeedsReconciling() {
  if (relativeCharX != 0 || relativeCharY != 0) {
      return true;
  }
  return false;
}

function reconcileCamera() {
  var recX = reconcileDirection(relativeCharX, dx);
  var recY = reconcileDirection(relativeCharY, dy);
  cameraX += recX;
  cameraY += recY;
  relativeCharX -= recX;
  relativeCharY -= recY;
}

function reconcileDirection(relativeDistance, increment) {
  if (relativeDistance != 0) {
    var reconciliation;
    if (Math.abs(relativeDistance) >= 5 * increment) {
      reconciliation = increment;
    } else if (Math.abs(relativeDistance) >= 0.5 * increment) {
      reconciliation = 0.5 * increment;
    } else {
      reconciliation = Math.abs(relativeDistance);
    }
    console.log(relativeDistance, reconciliation);
    if (relativeDistance > 0) {
      return reconciliation;
    } else {
      return -reconciliation;
    }
  }
  return 0;
}