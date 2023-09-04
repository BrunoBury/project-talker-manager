const tokenGenerator = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) {
      result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

module.exports = tokenGenerator;