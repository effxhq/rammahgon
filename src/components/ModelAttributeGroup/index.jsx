import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./styles.module.css";

function ModelAttribute(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    name, type, content, children,
  } = props;

  return (
    <div className={clsx(styles.card)}>
      <div className={styles.header}>
        <div>
          <span className={styles.h3}>{name}</span>
          <span>
            {" - "}
            {type}
          </span>
        </div>
        { children.length > 0 && (
          <IconButton
            className={clsx(styles.expand, {
              [styles.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
            color="inherit"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </div>
      <div>
        {content}
      </div>
      { children.length > 0
      && (
        <Collapse in={expanded} className={styles.nested} timeout="auto" unmountOnExit>
          <h4 style={{ opacity: ".75" }}>CHILD ATTRIBUTES</h4>
          <ModelAttributeGroup attributes={children} />
        </Collapse>
      )}
    </div>
  );
}

ModelAttribute.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  children: PropTypes.array,
};

ModelAttribute.defaultProps = {
  children: [],
};

function ModelAttributeGroup(props) {
  const { attributes } = props;
  const attributeComponents = attributes.map(
    (attribute) => <ModelAttribute {...attribute} key={attribute.name} />,
  );
  return (
    <div>
      {attributeComponents}
    </div>
  );
}

ModelAttributeGroup.propTypes = {
  attributes: PropTypes.array.isRequired,
};

export default ModelAttributeGroup;
