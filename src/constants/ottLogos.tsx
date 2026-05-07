import netflixLogo from "/assets/ott/netflix.webp";
import primeLogo from "/assets/ott/prime.webp";
import hotstarLogo from "/assets/ott/hotstar.webp";
import zee5Logo from "/assets/ott/zee5.webp";
import sonylivLogo from "/assets/ott/sonyliv.webp";
import lionsgateplayLogo from "/assets/ott/lionsgateplay.webp";
import otherLogo from "/assets/ott/other.webp";

const ottLogos: Record<string, string | null> = {
    netflix: netflixLogo,
    prime: primeLogo,
    hotstar: hotstarLogo,
    zee5: zee5Logo,
    sonyliv: sonylivLogo,
    lionsgateplay: lionsgateplayLogo,
    other: otherLogo,
    none: null
};

export default ottLogos;