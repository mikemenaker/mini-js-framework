export const diffListeners = (oldListeners, newListeners) => {
    const patches = [];
    for (const [k, v] of Object.entries(newListeners)) {
        patches.push($node => {
            $node.addEventListener(k, v);
            return $node;
        });
    }
    for (const [k, v] of Object.entries(oldListeners)) {
        if (!(k in newListeners)) {
            patches.push($node => {
                $node.removeEventListener(k, v);
            });
        }
    }
    return $node => {
        for (const patch of patches) {
            patch($node);
        }
    };
};