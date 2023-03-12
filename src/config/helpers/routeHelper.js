const renderLinkId = (pathname, id) => {
  const path = pathname.split('/');
  if (path.length > 2) {
    path[path.length - 1] = id;
  } else {
    path.push(id);
  }
  return path.join('/');
};

const routeHelper = {
  renderLinkId,
};

export default routeHelper;
