const emailHelper = {
  checkTopeboxEmail: (email) => {
    if (email) {
      return email.split('@')[1] === 'topebox.com';
    } else {
      return false;
    }
  },
};

export default emailHelper;
