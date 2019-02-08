export default (tagName, { attrs = {}, listeners = {}, style = {}, children = [] } = {}) => {
    return {
        tagName,
        attrs,
        listeners,
        style,
        children
    };
};