export default function (n = 10) {
  const STATE_SYMBOLS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(
      STATE_SYMBOLS[Math.round(Math.random() * STATE_SYMBOLS.length)]
    );
  }

  return result.join('');
}
