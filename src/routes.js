import React from 'react';

const Search = React.lazy(() => import('./views/Search'));
const SidebarFilters = React.lazy(() => import('./views/SidebarFilters'));

const routes = [
    {path: '/', exact: true, name: 'Search', component: Search, sidebar: SidebarFilters},
];

export default routes;