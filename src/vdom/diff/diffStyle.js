export const diffStyle = (oldStyle, newStyle) => {
    const patches = [];
    for (const [k, v] of Object.entries(newStyle)) {
        patches.push($node => {
            $node.style[k] = v;
            return $node;
        });
    }
    for (const k in oldStyle) {
        if (!(k in newStyle)) {
            patches.push($node => {
                delete $node.style[k];
            });
        }
    }
    return $node => {
        for (const patch of patches) {
            patch($node);
        }
    };
};