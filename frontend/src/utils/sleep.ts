const sleep = (ms: number) => {
  return new Promise((resolver) => {
    setTimeout(resolver, ms);
  });
};
export default sleep;
