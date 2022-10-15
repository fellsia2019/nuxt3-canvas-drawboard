export default function (n = 10) {
  const STATE_WORDS =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const result = [];

  for (let i = 0; i < 10; i++) {
    result.push(STATE_WORDS[Math.round(Math.random() * STATE_WORDS.length)]);
  }

  return result.join('');
}
