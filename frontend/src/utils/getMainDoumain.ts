function getMainDomain() {
  const url = new URL(window.location.href);
  const host = url.host;

  const domainParts = host.split('.');
  const mainDomainParts = domainParts.slice(-1);
  return { link: `${url.protocol}//${mainDomainParts}/`, url };
}

export default getMainDomain;
