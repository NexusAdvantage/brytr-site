export type Post = {
  slug: string; title: string; h1: string; keyword: string; category: string;
  dek: string; read: string; links: { label: string; href: string };
  body: { h?: string; p?: string; list?: string[]; callout?: string }[];
};

const B = (s: Post) => s;

/* Oct 2026: posts rewritten as general guides. First person claims about Brytr's own
 * practices, invented figures (break even years, LED life, brightness percentages) and
 * claims about what customers do were removed. */
export const posts: Post[] = [
  B({ slug: "are-permanent-christmas-lights-worth-it", title: "Are Permanent Christmas Lights Worth It?",
    h1: "Are permanent Christmas lights worth it?", keyword: "are permanent christmas lights worth it",
    category: "Before you buy", read: "3 min",
    dek: "It depends on how long you are staying, whether anyone wants to go up a ladder, and whether you will use the lights outside December.",
    links: { label: "Permanent Christmas lights", href: "/services/permanent-christmas-lights" },
    body: [
      { p: "Permanent lights cost more up front than hanging lights for one season. What you get is lighting that stays up, with no ladder each year, and that you can use the rest of the year too." },
      { h: "Questions to ask yourself" },
      { list: ["How long are you staying in the house?", "Who goes up the ladder each year?", "Will you use it outside December, for everyday lighting, holidays or gameday?"] },
      { h: "How the cost compares" },
      { p: "Hanging lights, or paying someone to hang them, is a cost that comes back every year. A permanent system is installed once. Getting exact pricing for your own house is the best way to compare the two." },
      { callout: "You can set permanent lights to warm white for everyday, so they are not only for Christmas." },
      { h: "When it may not be worth it" },
      { list: ["You are selling the house soon.", "You enjoy putting lights up yourself.", "You only want lights for one event."] },
    ] }),
  B({ slug: "how-to-choose-a-permanent-lighting-installer", title: "How to Choose a Permanent Lighting Installer",
    h1: "How to choose a permanent lighting installer.", keyword: "permanent christmas light installers near me",
    category: "Before you buy", read: "3 min",
    dek: "Permanent lighting is fastened to your house and stays there. Here are some questions worth asking before you sign anything.",
    links: { label: "Book a free design consultation", href: "/free-design-consultation" },
    body: [
      { p: "Permanent lighting is something you will live with for a long time, so it is worth asking a few questions before you pick an installer." },
      { h: "Questions to ask" },
      { list: [
        "Which brands do you install, and why that one for my house?",
        "How is it mounted on my roofline?",
        "Can I see photos of finished installs, at night and during the day?",
        "Who do I call if something stops working?",
        "Which app will I use, and will you show me how it works?",
        "Do I get exact pricing before the install?",
      ] },
      { callout: "Ask to see photos of finished installs, both at night and during the day." },
      { h: "Good signs" },
      { p: "Clear answers, exact pricing, and an installer who is happy to explain how the lighting is mounted and how the app works." },
    ] }),
  B({ slug: "permanent-lights-vs-hanging-christmas-lights", title: "Permanent Lights vs Hanging Christmas Lights",
    h1: "Permanent lights versus hanging them every December.", keyword: "permanent lights vs christmas lights",
    category: "Before you buy", read: "2 min",
    dek: "One goes up once. The other goes up and comes down every year. Here is how they compare.",
    links: { label: "Permanent Christmas lights", href: "/services/permanent-christmas-lights" },
    body: [
      { p: "Hanging lights cost less in the first year. Permanent lights are installed once and stay up, so there is no ladder, takedown or storage each year." },
      { h: "Over the years" },
      { list: ["Permanent: installed once, no takedown, no storage.", "Hung each year: put up, taken down and stored every season.", "Permanent lights can also be used the rest of the year."] },
      { h: "The ladder" },
      { p: "Going up a ladder in December is part of hanging lights every year. Permanent lights take that off the list." },
    ] }),
  B({ slug: "diy-vs-professional-permanent-light-install", title: "DIY vs Professional Permanent Light Install",
    h1: "DIY kits versus a professional permanent install.", keyword: "diy permanent christmas lights",
    category: "Before you buy", read: "3 min",
    dek: "A DIY kit costs less than a professional install. Here is how to think about which one fits you.",
    links: { label: "How an install works", href: "/how-it-works" },
    body: [
      { p: "If you have a single story home with easy roof access and you enjoy this kind of project, a DIY kit can be a reasonable choice." },
      { h: "When DIY can work" },
      { list: ["Single story, easy roof access", "You enjoy the project", "You want to try the idea first", "Budget is the main concern"] },
      { h: "When a professional install makes sense" },
      { list: ["Two stories, or a roof you would not want to walk", "Lots of corners, gables or dormers", "You want the install handled for you", "You want someone to call for service afterwards"] },
      { callout: "Whichever way you go, think about how it will look during the day as well as at night." },
    ] }),
  B({ slug: "do-permanent-lights-damage-your-soffit", title: "Do Permanent Lights Damage Your Soffit?",
    h1: "Do permanent lights damage your soffit?", keyword: "do permanent lights damage soffit",
    category: "Install", read: "2 min",
    dek: "Permanent lighting is fastened to your house, so it is a fair question. Here is how we mount it.",
    links: { label: "Permanent roofline lighting", href: "/services/permanent-roofline-lighting" },
    body: [
      { p: "Brytr mounts permanent roofline lighting to your soffit, up under the roof edge." },
      { h: "What to ask any installer" },
      { list: ["Where it mounts on your house", "Which brands they install and why", "What the warranty covers and who you call"] },
      { h: "Our answer" },
      { p: "We mount to your soffit, and every system we install is backed by our lifetime product warranty. Full warranty details come with your quote." },
    ] }),
  /* THE WARRANTY ARTICLE WAS HERE and is gone, 28 Aug 2026. It is in git:
   * `git show f7956e9:content/blog.ts`. Do not restore it without warranty terms from Brytr. */
  /* "permanent-lights-on-stucco-brick-cedar" removed 29 Oct 2026: Zac does not want install
   * details by wall material on the site. Redirects to /blog. */
  B({ slug: "husker-gameday-lighting-ideas", title: "Husker Gameday Lighting Ideas",
    h1: "Husker gameday lighting ideas for your roofline.", keyword: "husker gameday lighting",
    category: "Local", read: "2 min",
    dek: "A few ideas for setting up Husker colors on your roofline.",
    links: { label: "Gameday lighting", href: "/services/gameday-lighting" },
    body: [
      { p: "Gameday scenes are easy to set up on a permanent system. Here are a few ideas for scarlet and cream." },
      { h: "Ideas to try" },
      { list: ["Scarlet turned down a bit from full brightness", "Scarlet alternating with warm white", "Color on the front of the house, with the sides left on warm white", "Scheduled to come on before kickoff"] },
      { h: "What to think about" },
      { p: "Solid red at full brightness everywhere, or fast flashing patterns, can be a lot for the neighbors. Try a few settings and see what you like." },
    ] }),
  B({ slug: "how-long-do-permanent-led-lights-last", title: "How Long Do Permanent LED Lights Actually Last?",
    h1: "How long do permanent LED lights actually last?", keyword: "how long do permanent led lights last",
    category: "Product", read: "2 min",
    dek: "LEDs are long lasting, but they are only one part of a system. Here is what to think about.",
    links: { label: "The systems we install", href: "/lighting-systems" },
    body: [
      { p: "LED life ratings come from the manufacturer. The LEDs are one part of a system that also includes power supplies, a controller and connections." },
      { h: "The parts of a system" },
      { list: ["The LEDs", "Power supplies", "The controller", "Connections and the ends of the track"] },
      { callout: "Ask your installer what happens if a part stops working, and who to call." },
      { h: "What to expect" },
      { p: "Like any outdoor electronics, parts can need service over time. Call us for service on anything we installed." },
    ] }),
  B({ slug: "installing-permanent-lights-in-nebraska-winter", title: "Can Permanent Lights Go On in Winter?",
    h1: "Can permanent lights be installed in a Nebraska winter?", keyword: "winter permanent light installation",
    category: "Install", read: "2 min",
    dek: "Often, yes. It depends on the weather on the day.",
    links: { label: "How an install works", href: "/how-it-works" },
    body: [
      { p: "Winter installs depend on the weather. Plenty of days work fine, and some do not." },
      { h: "Scheduling" },
      { p: "If the weather is not right on the day, an install may need to move. We will talk through timing with you when we schedule." },
    ] }),
  B({ slug: "roofline-lighting-design-ideas", title: "Roofline Lighting Design Ideas for Omaha Homes",
    h1: "Roofline lighting design ideas for Omaha homes.", keyword: "roofline lighting ideas",
    category: "Before you buy", read: "3 min",
    dek: "A few ideas for lighting common roof shapes.",
    links: { label: "Permanent roofline lighting", href: "/services/permanent-roofline-lighting" },
    body: [
      { p: "You do not have to light every edge of the roof. Lighting the shape of the house, and leaving some parts dark, can look better than lighting everything." },
      { h: "Ideas for common rooflines" },
      { list: ["Two story with a front gable: light the main eave and the gable", "Ranch: light the front, and think about landscape lighting too", "Multiple dormers: try the main eave or the dormers on their own", "Turret or bay: give it its own zone"] },
      { h: "Adding landscape lighting" },
      { p: "Roofline lighting outlines the house. Uplighting a tree or two adds depth. Together they can make the whole property look lit." },
      { callout: "Have the design done at your house. A free design consultation is an easy way to see what works for your home." },
    ] }),
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const categories = Array.from(new Set(posts.map((p) => p.category)));
