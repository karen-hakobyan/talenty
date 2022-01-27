import {
    BehanceIconSVG,
    DribbbleIconSVG,
    FacebookIconSVG,
    GithabIconSVG,
    InstagramIconSVG,
    LinkedinIconSVG,
    OtherIconSVG,
    TwitterIconSVG,
    YoutubeIconSVG,
} from "../../../../assets/icons/createTemplate";

const SOCIAL_LINK_ICONS = {
    Facebook: FacebookIconSVG,
    Linkedin: LinkedinIconSVG,
    Twitter: TwitterIconSVG,
    Instagram: InstagramIconSVG,
    Youtube: YoutubeIconSVG,
    Behance: BehanceIconSVG,
    Dribbble: DribbbleIconSVG,
    Github: GithabIconSVG,
    // eslint-disable-next-line
    ["Custom link"]: OtherIconSVG,
};

export default SOCIAL_LINK_ICONS;