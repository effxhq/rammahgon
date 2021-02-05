import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Layout from "@theme/Layout";
import useThemeContext from "@theme/hooks/useThemeContext";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const features = [
  {
    title: "Getting Started",
    imageUrl: "img/getting-started.png",
    imageUrlDark: "img/getting-started-dark.png",
    description: (
      <>
        Learn how to add all your services and teams efficiently. Getting your
        information right is the first step to success.
      </>
    ),
    clickToRoute: "/docs",
  },
  {
    title: "Call our API",
    imageUrl: "img/deliver.png",
    imageUrlDark: "img/deliver-dark.png",
    description: (
      <>
        Build your own workflow by calling our API. Perfect if you document services already with
        your own format.
      </>
    ),
    clickToRoute: "/docs/services-api",
  },
  {
    title: "Automations",
    imageUrl: "img/operate.png",
    imageUrlDark: "img/operate-dark.png",
    description: (
      <>
        Accelerate your workflow with Continuous Integration Automations. Upload your
        services with GitOps.
      </>
    ),
    clickToRoute: "/docs/github",
  },
  {
    title: "Integrations",
    imageUrl: "img/conways-law.svg",
    imageUrlDark: "img/conways-law.svg",
    description: (
      <>
        Import all of your data from the tools you already use.
      </>
    ),
    clickToRoute: "/docs/integrations",
  },
];

function Feature(props) {
  const {
    imageUrl, imageUrlDark, title, description, clickToRoute,
  } = props;
  const { isDarkTheme } = useThemeContext();
  const imgUrl = useBaseUrl(!isDarkTheme ? imageUrl : imageUrlDark);
  const history = useHistory();
  const route = useBaseUrl(clickToRoute);

  function handleClick() {
    history.push(route);
  }

  return (
    <div
      className={clsx("col col--4 card", styles.feature)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={handleClick}
    >
      <div className="text--center">
        <img className={styles.featureImage} src={imgUrl} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

Feature.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageUrlDark: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  clickToRoute: PropTypes.string.isRequired,
};

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const description = "See how the world’s best engineering teams use effx’s modern microservice "
    + "catalog to track service ownership, ship code faster, and more reliably. Get started free today!";
  return (
    <Layout
      title=""
      description={description}
    >
      <header className={clsx("hero", "hero--primary", styles.heroBanner)} style={{ backgroundImage: `url(${useBaseUrl("img/banner.png")})` }}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted,
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className={clsx("row", styles.featureRow)}>
                <Feature {...features[0]} />
                <Feature {...features[1]} />
              </div>
              <div className={clsx("row", styles.featureRow)}>
                <Feature {...features[2]} />
                <Feature {...features[3]} />
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
