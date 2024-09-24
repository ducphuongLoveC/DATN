function getMainDomain() {
  const url = new URL(window.location.href);
  const host = url.host;
  console.log((url));

  const domainParts = host.split('.');

  const mainDomainParts = domainParts.slice(-1);
  console.log(mainDomainParts);

  return { link: `${url.protocol}//${mainDomainParts}/`, url };
}

export default getMainDomain