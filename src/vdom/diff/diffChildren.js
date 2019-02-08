import render from '../render';
import { diff } from './diff';
const zip = (xs, ys) => {
    const zipped = [];
    for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};
export const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];
    oldVChildren.forEach((oldVChild, i) => {
        childPatches.push(diff(oldVChild, newVChildren[i]));
    });
    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild));
            return $node;
        });
    }
    return $parent => {
        for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
            patch(child);
        }
        for (const patch of additionalPatches) {
            patch($parent);
        }
        return $parent;
    };
};