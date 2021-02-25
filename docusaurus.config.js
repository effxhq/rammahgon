module.exports = {
  title: "effx | wiki",
  tagline: "The simplest way to navigate and operate your microservices",
  url: "https://effx.com",
  baseUrl: "/help/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "effxhq", // Usually your GitHub org/user name.
  projectName: "rammahgon", // Usually your repo name.
  themeConfig: {
    hideableSidebar: true,
    googleAnalytics: {
      trackingID: "UA-105847863-4",
    },
    prism: {
      theme: require("prism-react-renderer/themes/dracula"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    navbar: {
      title: "",
      logo: {
        alt: "effx",
        src: "img/effx-logo-light.svg",
        srcDark: "img/effx-logo-dark.svg",
        href: "https://effx.com",
        target: "_self",
      },
      items: [
        {
          to: "/",
          label: "wiki Home",
          position: "left",
          activeBaseRegex: "^/help/$",
        },
        {
          to: "docs/",
          label: "Docs",
          position: "left",
        },
        { to: "releases", label: "Releases", position: "left" },
        {
          href: "https://app.effx.com",
          label: "Log In",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://join.slack.com/t/m11s/shared_invite/zt-j71p8afk-07MmPgrXlUd7qF_s6qXovg",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/effxHQ",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Releases",
              to: "releases",
            },
            {
              label: "GitHub",
              href: "https://github.com/effxhq/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} effx.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/effxhq/rammahgon/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "releases",
        routeBasePath: "releases",
        path: "./product-releases",
        showReadingTime: true,
        blogSidebarTitle: "Recent",
        editUrl: "https://github.com/effxhq/rammahgon/edit/main/",
      },
    ],
    "docusaurus-plugin-sass",
  ],
};
