const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const menuHelper = {
  getItem,
};

export default menuHelper;
