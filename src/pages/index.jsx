import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Layout from "@theme/Layout";
import useThemeContext from "@theme/hooks/useThemeContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const features = [
  {
    title: "Get Started",
    imageUrl: "img/getting-started.svg",
    imageUrlDark: "img/getting-started.svg",
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
    imageUrl: "img/api.svg",
    imageUrlDark: "img/api.svg",
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
    imageUrl: "img/automations.svg",
    imageUrlDark: "img/automations.svg",
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
    imageUrl: "img/integrations.svg",
    imageUrlDark: "img/integrations.svg",
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
      className={clsx("col col--5", styles.feature, isDarkTheme && styles.featureDark)}
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

function Main() {
  return (
    <main className={styles.main}>
      <div className={clsx("container", styles.welcome)}>
        <h1 style={{ fontFamily: "Poppins", fontWeight: "800" }}>Welcome to your effx wiki</h1>
        <h3>
          Explore guides, tutorials and tips on how to get the best out of your service catalog!
        </h3>
      </div>
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
      <div className={styles.reachOut}>
        Can't find what you're looking for? Reach out at
        {" "}
        <a href="mailto:support@effx.com">support@effx.com</a>
        .
      </div>
    </main>
  );
}

function Home() {
  const description = "See how the world’s best engineering teams use effx’s modern microservice "
    + "catalog to track service ownership, ship code faster, and more reliably. Get started free today!";
  return (
    <Layout
      title=""
      description={description}
    >
      <Main />
    </Layout>
  );
}

export default Home;
