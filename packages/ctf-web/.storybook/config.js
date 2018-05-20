import { configure } from '@storybook/react';
import '../stories';

function loadStories() {
    require('../stories/input');
    require('../stories/button');
    require('../stories/form');
}

configure(loadStories, module);
