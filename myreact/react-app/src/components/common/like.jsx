import React from 'react';
import PropTypes from 'prop-types';

// Input: liked: boolean
// Output: onClick

const Like = ({ liked, onClick }) => {
  let classes = 'clickable fa fa-heart';
  if (!liked) classes += '-o';
  return (
    <i
      onClick={onClick}
      className={classes}
      aria-hidden="true"
    >
    </i>
  );
}

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Like;