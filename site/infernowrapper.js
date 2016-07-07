import InfernoComponent from 'inferno-src/src/component/es2015';
import {render} from 'inferno-src/src/DOM/rendering';
import {createBlueprint} from 'inferno-src/src/core/shapes';

window.Inferno = {createBlueprint};

// This is because of the similarity, follows the documentation.
// See: https://github.com/trueadm/inferno
export const InfernoDOM = {
    render
};

export const Component = InfernoComponent;
