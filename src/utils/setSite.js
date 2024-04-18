export function getCurrentSite(flag) {
  let curSite = null;
  if (flag) {
    curSite = sessionStorage.getItem("currentSite");
    curSite = curSite ? JSON.parse(curSite) : { id: "1668491818310950912" };
  } else {
    curSite = curSite =
      sessionStorage.getItem("krAppSite") ||
      sessionStorage.getItem("currentSite");
    curSite = curSite ? JSON.parse(curSite) : { id: "167037857943322624" };
  }
  return curSite?.id ?? curSite.value;
}
export function initSiteInDev() {
  if (window.location.hostname == "localhost") {
    let site = {
      tangfeng: {
        id: "1730147564210098176",
        name: "唐凤",
        icon: "/navigation/logo/site/stationPoint.png",
      },
      tangyang: {
        id: "167037857943322624",
        name: "唐阳",
        icon: "/navigation/logo/site/stationPoint.png",
      },
    };
    sessionStorage.setItem("krAppSite", JSON.stringify(site["tangfeng"]));
  }
}
