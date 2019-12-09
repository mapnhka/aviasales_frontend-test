import React from 'react';

const Search = React.lazy(() => import('./views/Search'));

const routes = [
    {path: '/', exact: true, name: 'Search', component: Search},
];

export default routes;