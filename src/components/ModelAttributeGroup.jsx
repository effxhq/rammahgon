import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { gray, white } from "ansi-colors";

const useStyles = makeStyles((theme) => createStyles({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  card: {
    boxShadow: "none",
    borderRadius: "0px",
  },
  h3: {
    fontSize: "var(--ifm-h3-font-size);",
    fontWeight: "var(--ifm-heading-font-weight);",
  },
  nested: {
    marginLeft: "24px",
    padding: "20px",
    marginBottom: "8px",
    borderColor: "#e5e5e5",
    border: "solid",
    borderRadius: "8px",
    borderWidth: ".5px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
}));

function ModelAttribute(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    name, type, content, children,
  } = props;

  return (
    <div className={clsx(classes.card)}>
      <div className={classes.header}>
        <div>
          <span className={classes.h3}>{name}</span>
          <span>
            {" - "}
            {type}
          </span>
        </div>
        { children.length > 0 && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
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
        <Collapse in={expanded} className={classes.nested} timeout="auto" unmountOnExit>
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
