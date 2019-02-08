import render from '../render';
import { diffAttrs } from './diffAttrs';
import { diffListeners } from './diffListeners';
import { diffStyle } from './diffStyle';
import { diffChildren } from './diffChildren';

export const diff = (vOldNode, vNewNode) => {
  if (vNewNode === undefined) {
    $node.remove();
    return undefined;
  }

  if (typeof vOldNode === 'string' || typeof vNewNode === 'string') {
    if (vOldNode !== vNewNode) {
      return $node => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return $node => undefined;
    }
  }

  if (vOldNode.tagName != vNewNode.tagName) {
    return $node => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchListeners = diffListeners(vOldNode.listeners, vNewNode.listeners);
  const patchStyle = diffStyle(vOldNode.style, vNewNode.style);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return $node => {
    patchAttrs($node);
    patchListeners($node);
    patchStyle($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
