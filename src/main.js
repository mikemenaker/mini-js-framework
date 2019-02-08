import createElement from './vdom/createElement';
import render from './vdom/render';
import mount from './vdom/mount';
import diff from './vdom/diff/diff';
import { addReactivity, watcher }  from './reactivity/reactivity'

let data = { title: "my amazing page" }

const createVApp = () => createElement('div', {
    attrs: {
        id: 'app'
    },
    children: [
        createElement("h1", {
            children: [
                data.title
            ]
        }),
        createElement('table', {
            style: {
                border: "1px solid black",
                'border-collapse': 'collapse'
            },
            children: [
                createElement('tr', {
                    children: [
                        createElement('td', {
                            style: {
                                border: "1px solid black"
                            },
                            children: [
                                "Sounders"
                            ]
                        }),
                        createElement('td', {
                            style: {
                                border: "1px solid black"
                            },
                            children: [
                                "Sounders"
                            ]
                        })
                    ]
                }),
                createElement('tr', {
                    children: [
                        createElement('td', {
                            style: {
                                border: "1px solid black"
                            },
                            listeners: {
                                click: () => data.title = "Sounders"
                            },
                            children: [
                                createElement('img', {
                                    attrs: {
                                        src: 'https://upload.wikimedia.org/wikipedia/en/2/27/Seattle_Sounders_FC.svg',
                                    },
                                })
                            ]
                        }),
                        createElement('td', {
                            style: {
                                border: "1px solid black"
                            },
                            listeners: {
                                click: () => data.title = "Seahawks"
                            },
                            children: [
                                createElement('img', {
                                    attrs: {
                                        src: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Seattle_Seahawks_logo.svg',
                                    },
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});

let vApp = createVApp();
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById('app'));


addReactivity(data);

watcher(() => {
    const vNewApp = createVApp(Math.floor(Math.random() * 10));
    const patch = diff(vApp, vNewApp);
    $rootEl = patch($rootEl);
    vApp = vNewApp;
})