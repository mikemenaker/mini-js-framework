import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff/diff';
import { addReactivity, watcher } from './reactivity/reactivity';

export default (data, createVApp) => {
  let vApp = createVApp();
  const $app = render(vApp);

  let $rootEl = mount($app, document.getElementById('app'));

  addReactivity(data);

  watcher(() => {
    const vNewApp = createVApp();
    const patch = diff(vApp, vNewApp);
    $rootEl = patch($rootEl);
    vApp = vNewApp;
  });
};
