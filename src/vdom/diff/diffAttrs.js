export const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node;
    });
  }
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttributes(k);
      });
    }
  }
  return $node => {
    for (const patch of patches) {
      patch($node);
    }
  };
};
