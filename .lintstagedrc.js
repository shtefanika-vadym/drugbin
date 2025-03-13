module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'npm run lint:fix'],
  '*.{css,md,json}': ['prettier --write'],
}
